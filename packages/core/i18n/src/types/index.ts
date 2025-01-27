import { YooEditor } from '@yoopta/editor';

export type I18nYooEditor<YKeys extends string = string> = YooEditor & {
  translations: Record<YKeys, Record<string, string>>;
  language: string;
  languages: string[];
  defaultLanguage: string;
  setLanguage: (lang: string) => void;
};
