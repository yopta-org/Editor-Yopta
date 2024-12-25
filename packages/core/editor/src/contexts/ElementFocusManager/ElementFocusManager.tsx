import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Blocks } from '../../editor/blocks';
import { SlateElement } from '../../editor/types';
import { useYooptaEditor } from '../YooptaContext/YooptaContext';

type FocusedElement = {
  element: SlateElement;
  blockId: string;
} | null;

type FocusContextValue = {
  focusedElement: FocusedElement;
  onFocus: (focusEntity: FocusedElement) => void;
};

const FocusContext = createContext<FocusContextValue>({
  focusedElement: null,
  onFocus: () => {},
});

export const ElementFocusManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusedElement, setFocusedElement] = useState<FocusedElement>(null);
  const editor = useYooptaEditor();

  const onFocus = (entity: FocusedElement) => {
    if (entity?.element.id === focusedElement?.element.id) return;

    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block || !entity?.element) return;

    const plugin = editor.plugins[block.type];
    if (!plugin || !entity?.element) return;

    setFocusedElement({ element: entity.element, blockId: block.id });
  };

  const contextRef = useRef<FocusContextValue>({} as FocusContextValue);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocusedElement(null);
      }
    };

    editor.refElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      editor.refElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor.refElement, editor.path.current]);

  contextRef.current = { focusedElement, onFocus };

  return <FocusContext.Provider value={contextRef.current}>{children}</FocusContext.Provider>;
};

export const useFocusedElement = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocusedElement must be used within ElementFocusManager');
  }
  return context.focusedElement;
};

export const useSetFocusedElement = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useSetFocusedElement must be used within ElementFocusManager');
  }
  return context.onFocus;
};
