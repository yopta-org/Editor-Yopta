import {UseAddTranslationsReturn} from './types';
import {useCallback} from 'react';
import {YooptaTranslationManager} from '../TranslationManager';

export const useAddTranslations = (): UseAddTranslationsReturn => {
    const addTranslations = useCallback(
        (language: string, namespace: string, translations: Record<string, string>) => {
            YooptaTranslationManager.addTranslations(language, namespace, translations);
        },
        []
    );

    return { addTranslations }
}
