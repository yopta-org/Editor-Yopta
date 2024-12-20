import { createContext, useContext, useEffect, useState } from 'react';
import { Blocks } from '../../editor/blocks';
import { SlateElement } from '../../editor/types';
import { PropEditor } from '../../types/propsEditor';
import { useYooptaEditor } from '../YooptaContext/YooptaContext';

type FocusedElement =
  | (Pick<SlateElement, 'id' | 'type' | 'props'> & {
      blockId: string;
      editors: Record<string, PropEditor> | undefined;
    })
  | null;

type FocusContextValue = {
  focusedElement: FocusedElement;
  onFocus: (element: FocusedElement) => void;
};

const FocusContext = createContext<FocusContextValue>({
  focusedElement: null,
  onFocus: () => {},
});

export const FocusManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusedElement, setFocusedElement] = useState<FocusedElement>(null);
  const editor = useYooptaEditor();

  const onFocus = (element: FocusedElement) => {
    if (element?.id === focusedElement?.id) return;
    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block || !element) return;

    console.log('setFocusedElement block', block);

    const plugin = editor.plugins[block.type];
    console.log('setFocusedElement plugin', plugin);

    if (!plugin) return;

    const editors = plugin.elements[element.type].editors;

    console.log('setFocusedElement editors', editors);
    setFocusedElement({ ...element, blockId: block.id, editors });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocusedElement(null);
      }
    };

    const handleSelectionChange = () => {
      const block = Blocks.getBlock(editor, { at: editor.path.current });
      if (!block) return;
      const slate = Blocks.getBlockSlate(editor, { id: block.id });
      if (!slate) return;
    };

    editor.refElement?.addEventListener('keydown', handleKeyDown);
    window.document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      editor.refElement?.removeEventListener('keydown', handleKeyDown);
      window.document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [editor.refElement, editor.path.current]);

  return <FocusContext.Provider value={{ focusedElement, onFocus }}>{children}</FocusContext.Provider>;
};

export const useFocusedElement = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocusedElement must be used within FocusManager');
  }
  return context.focusedElement;
};

export const useSetFocusedElement = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useSetFocusedElement must be used within FocusManager');
  }
  return context.onFocus;
};
