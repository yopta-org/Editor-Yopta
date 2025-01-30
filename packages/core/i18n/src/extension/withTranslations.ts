import { I18nYooEditor, TranslationOptions } from '../types';
import { YooEditor } from '@yoopta/editor';

function getNestedValue(obj: any, path: string[]): string | undefined {
  return path.reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);
}

export function withTranslations(editor: YooEditor, options: TranslationOptions): I18nYooEditor {
  const i18nEditor = editor as I18nYooEditor;
  const { translations, defaultLanguage, language } = options;

  const { getLabelText } = i18nEditor;
  const languages = Object.keys(translations);

  i18nEditor.getLabelText = (key) => {
    const keyParts = key.split('.');

    const currentLangValue = getNestedValue(translations[i18nEditor.language], keyParts);
    if (typeof currentLangValue === 'string') {
      return currentLangValue;
    }

    const defaultLangValue = getNestedValue(translations[i18nEditor.defaultLanguage], keyParts);

    if (typeof defaultLangValue === 'string') {
      return defaultLangValue;
    }

    return getLabelText(key);
  };

  i18nEditor.languages = languages;

  i18nEditor.setLanguage = (lang: string) => {
    if (translations[lang]) {
      i18nEditor.language = lang;
      i18nEditor.emit('language-change', lang);
    }
  };

  i18nEditor.translations = translations;
  i18nEditor.defaultLanguage = defaultLanguage;
  i18nEditor.language = language;

  return i18nEditor;
}
