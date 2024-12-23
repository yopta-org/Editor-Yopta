import { createContext, useContext, useEffect, useState } from 'react';
import { Blocks } from '../../editor/blocks';
import { SlateElement } from '../../editor/types';
import { PropEditor } from '../../types/propsEditor';
import { useYooptaEditor } from '../YooptaContext/YooptaContext';

type FocusedEntity = {
  element: SlateElement;
  blockId: string;
  editors: Record<string, PropEditor> | undefined;
} | null;

type FocusContextValue = {
  focused: FocusedEntity;
  onFocus: (focusEntity: FocusedEntity) => void;
};

const FocusContext = createContext<FocusContextValue>({
  focused: null,
  onFocus: () => {},
});

export const FocusManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focused, setFocusedEntity] = useState<FocusedEntity>(null);
  const editor = useYooptaEditor();

  const onFocus = (entity: FocusedEntity) => {
    console.log('onFocus', entity);
    if (entity?.element.id === focused?.element.id) return;

    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block || !entity?.element) return;

    const plugin = editor.plugins[block.type];
    if (!plugin || !entity?.element) return;

    const editors = plugin.elements[entity.element.type].editors;
    setFocusedEntity({ element: entity.element, blockId: block.id, editors });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocusedEntity(null);
      }
    };

    editor.refElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      editor.refElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor.refElement, editor.path.current]);

  return <FocusContext.Provider value={{ focused, onFocus }}>{children}</FocusContext.Provider>;
};

export const useFocusedEntity = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocusedEntity must be used within FocusManager');
  }
  return context.focused;
};

export const useSetFocusedEntity = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useSetFocusedEntity must be used within FocusManager');
  }
  return context.onFocus;
};
