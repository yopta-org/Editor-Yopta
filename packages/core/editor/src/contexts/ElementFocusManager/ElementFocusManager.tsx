import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
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
  onUpdateFocusedElement: (props: Omit<SlateElement['props'], 'nodeType'>) => void;
};

const FocusContext = createContext<FocusContextValue>({
  focusedElement: null,
  onFocus: () => {},
  onUpdateFocusedElement: () => {},
});

export function useForceRender() {
  const [, forceRender] = useReducer((s) => !s, false);

  return forceRender;
}

export const ElementFocusManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [focusedElement, setFocusedElement] = useState<FocusedElement>(null);
  const focusedElementRef = useRef<FocusedElement>(null);
  const focusedElement = focusedElementRef.current;
  const editor = useYooptaEditor();
  const forceRender = useForceRender();

  const onFocus = (entity: FocusedElement) => {
    console.log('onFocus entity', entity);
    if (entity?.element.id === focusedElement?.element.id) return;

    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block || !entity?.element) return;

    const plugin = editor.plugins[block.type];
    if (!plugin || !entity?.element) return;

    focusedElementRef.current = {
      element: entity.element,
      blockId: block.id,
    };

    forceRender();
    // setFocusedElement({ element: entity.element, blockId: block.id });
  };

  const contextRef = useRef<FocusContextValue>({} as FocusContextValue);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        focusedElementRef.current = null;
        forceRender();
      }
    };

    editor.refElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      editor.refElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor.refElement, editor.path.current]);

  const onUpdateFocusedElement = (props: Omit<SlateElement['props'], 'nodeType'>) => {
    if (!focusedElement) return;

    const slate = Blocks.getBlockSlate(editor, { id: focusedElement.blockId });
    if (!slate) return;

    const elementPath = ReactEditor.findPath(slate, focusedElement.element);
    console.log('onUpdateFocusedElement elementPath', elementPath);

    // we need to save reference of element, so we need update props without lost reference of object
    // focusedElement.element.props = { ...focusedElement.element.props, ...props };

    forceRender();
  };

  contextRef.current = { focusedElement, onFocus, onUpdateFocusedElement };

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

export const useUpdateFocusedElement = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useUpdateFocusedElementProps must be used within ElementFocusManager');
  }
  return context.onUpdateFocusedElement;
};
