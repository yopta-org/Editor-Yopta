import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Range, Transforms } from 'slate';
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
  onUpdateFocusedElement: (element: SlateElement) => void;
  onResetFocusedElement: () => void;
};

const FocusContext = createContext<FocusContextValue>({
  focusedElement: null,
  onFocus: () => {},
  onUpdateFocusedElement: () => {},
  onResetFocusedElement: () => {},
});

export function useForceRender() {
  const [, forceRender] = useReducer((s) => !s, false);

  return forceRender;
}

export const ElementFocusManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const focusedElementRef = useRef<FocusedElement>(null);
  const focusedElement = focusedElementRef.current;
  const editor = useYooptaEditor();
  const forceRender = useForceRender();

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

  const onFocus = (entity: FocusedElement) => {
    const domSelection = window.getSelection();
    if (domSelection?.isCollapsed === false && domSelection?.anchorOffset !== domSelection?.focusOffset) {
      focusedElementRef.current = null;
      return;
    }

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

  const onUpdateFocusedElement = (element: SlateElement) => {
    if (!focusedElement) return;

    focusedElement.element = element;

    // const slate = Blocks.getBlockSlate(editor, { id: focusedElement.blockId });
    // if (!slate) return;

    // const elementPath = ReactEditor.findPath(slate, focusedElement.element);
    // console.log('onUpdateFocusedElement elementPath', elementPath);

    // we need to save reference of element, so we need update props without lost reference of object
    // focusedElement.element.props = { ...focusedElement.element.props, ...props };

    forceRender();
  };

  const onSelectionChange = () => {
    const domSelection = window.getSelection();
    console.log('_focus_ onSelectionChange');

    if (domSelection?.isCollapsed === false && domSelection?.anchorOffset !== domSelection?.focusOffset) {
      focusedElementRef.current = null;
      return;
    }

    // focusedElementRef.current = null;
    // forceRender();
  };

  useEffect(() => {
    if (focusedElement) {
      window.document.addEventListener('selectionchange', onSelectionChange);
      return () => window.document.removeEventListener('selectionchange', onSelectionChange);
    }
  }, [focusedElement, editor.path.current]);

  const onResetFocusedElement = () => {
    focusedElementRef.current = null;
    console.log('__onResetFocusedElement__', focusedElementRef.current);
    forceRender();
  };

  contextRef.current = { focusedElement, onFocus, onUpdateFocusedElement, onResetFocusedElement };

  return <FocusContext.Provider value={contextRef.current}>{children}</FocusContext.Provider>;
};

export const useElementFocusManager = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useElementFocusManager must be used within ElementFocusManager');
  }
  return context;
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

export const useResetFocusedElement = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useResetFocusedElement must be used within ElementFocusManager');
  }
  return context.onResetFocusedElement;
};
