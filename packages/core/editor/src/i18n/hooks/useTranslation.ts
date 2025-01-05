import { useEffect, useState, useCallback } from 'react';
import { YooptaTranslationManager } from '../TranslationManager';
import { UseTranslationReturn } from './types';

export const useTranslation = (): UseTranslationReturn => {
    const [language, setLanguage] = useState(YooptaTranslationManager.getCurrentLanguage());

    // Directly reference the translation function without using state
    const t = useCallback((key: string) => YooptaTranslationManager.translate(key), []);

    useEffect(() => {
        // Update the language state when the translation manager's language changes
        const unsubscribe = YooptaTranslationManager.subscribe(() => {
            setLanguage(YooptaTranslationManager.getCurrentLanguage());
        });

        return () => unsubscribe();
    }, []);

    const changeLanguage = useCallback((lang: string) => {
        YooptaTranslationManager.setLanguage(lang);
    }, []);

    const getAvailableKeys = useCallback(() => {
        return YooptaTranslationManager.getAvailableKeys();
    }, []);

    return {
        t,
        currentLanguage: language,
        setLanguage: changeLanguage,
        getAvailableKeys,
    };
};
