import { I18nYooEditor } from '../types';

type TranslationOptions = {
  language: string;
  defaultLanguage: string;
  translations: I18nYooEditor['translations'];
};

function getNestedValue(obj: any, path: string[]): string | undefined {
  return path.reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);
}

export function withTranslations(editor: I18nYooEditor, options: TranslationOptions): I18nYooEditor {
  const { translations, defaultLanguage, language } = options;

  const { getLabelText } = editor;
  const languages = Object.keys(translations);

  editor.getLabelText = (key) => {
    const keyParts = key.split('.');

    const currentLangValue = getNestedValue(translations[editor.language], keyParts);
    if (typeof currentLangValue === 'string') {
      return currentLangValue;
    }

    const defaultLangValue = getNestedValue(translations[editor.defaultLanguage], keyParts);

    if (typeof defaultLangValue === 'string') {
      return defaultLangValue;
    }

    return getLabelText(key);
  };

  editor.languages = languages;

  editor.setLanguage = (lang: string) => {
    if (translations[lang]) {
      editor.language = lang;
      // editor.emit
    }
  };

  editor.translations = translations;
  editor.defaultLanguage = defaultLanguage;
  editor.language = language;

  return editor;
}
