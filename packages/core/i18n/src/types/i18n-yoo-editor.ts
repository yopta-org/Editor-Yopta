import { YooEditor } from '@yoopta/editor';

export interface NestedTranslations {
    [key: string]: string | NestedTranslations;
}

export type I18nYooEditor<YKeys extends string = string> = YooEditor & {
    translations: Record<YKeys, NestedTranslations>;
    language: string;
    languages: string[];
    defaultLanguage: string;
    setLanguage: (lang: string) => void;
};
