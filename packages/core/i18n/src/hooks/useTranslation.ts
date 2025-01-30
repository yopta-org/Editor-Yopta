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
   * Changes the current language to the specified value.
   * Emits the event 'language-change'.
   *
   * @param lang - The language code to set, e.g., 'en' or 'es' or 'fr'...
   */
  setLanguage: (lang: string) => void;
}

export function useTranslation(): UseTranslationReturn {
  const editor = useYooptaEditor() as I18nYooEditor;

  return { t: editor.getLabelText, currentLanguage: editor.language, setLanguage: editor.setLanguage };
}
