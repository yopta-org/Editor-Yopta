import { useCallback, useEffect, useState } from 'react';
import { useYooptaEditor } from '@yoopta/editor';
import { I18nYooEditor } from '../types';

interface UseTranslationReturn {
  /**
   * Translates a key into the current language.
   * The key format is `namespace.key`, e.g., `editor.blockOptions.delete`.
   * If the translation for the key is not found, it returns the key provided.
   *
   * @param key - The key to translate, formatted as `namespace.key`.
   * @returns The translated string or a fallback message.
   */
  t: (key: string) => string;

  /**
   * The current language set in the editor.
   * This value updates reactively when the language is changed.
   */
  currentLanguage: string;

  /**
   * A list of all supported languages available in the editor.
   */
  languages: string[];

  /**
   * Changes the current language to the specified value.
   * Emits the event 'language-change'.
   *
   * @param lang - The language code to set, e.g., 'en' or 'es' or 'fr'...
   */
  setLanguage: (lang: string) => void;
}

export function useTranslation(): UseTranslationReturn {
  const editor = useYooptaEditor() as I18nYooEditor;
  const [currentLanguage, setCurrentLanguage] = useState(editor.language);

  console.log('useTranslation', { currentLanguage, setLanguage: editor.setLanguage, languages: editor.languages });

  const handleLanguageChange = useCallback(
    (lang: string) => {
      setCurrentLanguage(lang);
    },
    [setCurrentLanguage],
  );

  useEffect(() => {
    editor.on('language-change', handleLanguageChange);

    return () => {
      editor.off('language-change', handleLanguageChange);
    };
  }, []);

  return { t: editor.getLabelText, currentLanguage, setLanguage: editor.setLanguage, languages: editor.languages };
}
