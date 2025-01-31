import { createContext, FunctionComponent, PropsWithChildren, useContext, useRef } from 'react';
import { createYooptaEditor } from '@yoopta/editor';
import { I18nYooEditor, TranslationOptions } from '../types';

export type I18nYooEditorContext = {
  editor: I18nYooEditor;
  options: TranslationOptions;
};

const DEFAULT_HANDLERS: I18nYooEditorContext = {
  editor: createYooptaEditor() as I18nYooEditor,
  options: {
    language: '',
    defaultLanguage: '',
    translations: {},
  },
};

export const I18nYooEditorContext = createContext<I18nYooEditorContext>(DEFAULT_HANDLERS);

const I18nYooEditorProvider: FunctionComponent<PropsWithChildren<I18nYooEditorContext>> = ({
  children,
  editor,
  options,
}) => {
  const contextValueRef = useRef<I18nYooEditorContext>(DEFAULT_HANDLERS);

  contextValueRef.current = {
    editor,
    options,
  };

  return <I18nYooEditorContext.Provider value={contextValueRef.current}>{children}</I18nYooEditorContext.Provider>;
};

const useI18nYooEditor = (): I18nYooEditor => {
  const context = useContext(I18nYooEditorContext);

  if (!context) {
    throw new Error('useI18nYooEditor must be used within a I18nYooEditorProvider');
  }

  return context.editor;
};

export { I18nYooEditorProvider, useI18nYooEditor };
