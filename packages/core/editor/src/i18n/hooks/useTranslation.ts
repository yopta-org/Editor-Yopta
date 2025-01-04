import { useEffect, useState, useCallback } from 'react';
import { YooptaTranslationManager } from '../TranslationManager';
import {UseTranslationReturn, UseAddTranslationsReturn} from './types';

export const useTranslation = (): UseTranslationReturn => {
    const [language, setLanguage] = useState(YooptaTranslationManager.getCurrentLanguage());
    const [t, setT] = useState(() => (key: string) => YooptaTranslationManager.translate(key));

    // Subscribe to language changes
    useEffect(() => {
        const unsubscribe = YooptaTranslationManager.subscribe(() => {
            setLanguage(YooptaTranslationManager.getCurrentLanguage());
            setT(() => (key: string) => YooptaTranslationManager.translate(key));
        });

        return () => unsubscribe();
    }, []);

    // Function to change the language
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
