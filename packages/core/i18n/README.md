# i18n

It has the export of the following useful modules:

`import { withTranslation, useTranslation, type I18nYooEditor } from '@yoopta/i18n'`

- withTranslation - required method for extending the editor's work with i18n
- useTranslation - hook for using language switching methods and translating texts by keys
- I18nYooEditor - extended type for YooEditor

### Installation

```bash
yarn add @yoopta/i18n
```

### Usage

```tsx
import { withTranslations } from '@yoopta/i18n';

import esTranslations from '@/locales/es.json';
import ruTranslations from '@/locales/ru.json';
import czTranslations from '@/locales/cz.json';

const TRANSLATIONS = {
  es: esTranslations,
  ru: ruTranslations,
  cz: czTranslations,
};

const ExampleWithTranslations = () => {
  const editor: YooEditor = useMemo(() => {
    const baseEditor = createYooptaEditor();
    return withTranslations(baseEditor, {
      translations: TRANSLATIONS,
      defaultLanguage: 'en',
      language: 'ru',
    });
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState<string>(editor.language);

  const handleLanguageChange = useCallback(
    (lang: string) => {
      setCurrentLanguage(lang);
    },
    [setCurrentLanguage],
  );

  useEffect(() => {
    // listening to language changes
    editor.on('language-change', handleLanguageChange);

    return () => {
      editor.off('language-change', handleLanguageChange);
    };
  }, []);

  return (
    <YooptaEditor
      editor={editor}
      plugins={YOOPTA_PLUGINS}
      selectionBoxRoot={selectionRef}
      marks={MARKS}
      tools={TOOLS}
      style={EDITOR_STYLE}
      value={value}
      onChange={onChange}
      onPathChange={onPathChange}
      autoFocus={true}
      readOnly={false}
    />
  );
};
```

### I18n API

With the withTranslation extension for the editor, Yoopta will have the following additional methods and keys:

```typescript
export type I18nYooEditor<YKeys extends string = string> = YooEditor & {
  /**
   * A record of translations, where each key represents a language,
   * and its value contains nested translation strings.
   */
  translations: Record<YKeys, Record<string, string>>;

  /**
   * The currently active language of the editor.
   */
  language: string;

  /**
   * A list of all supported languages available in the editor.
   */
  languages: string[];

  /**
   * The default language of the editor (used as a fallback when translations are missing).
   */
  defaultLanguage: string;

  /**
   * Updates the editor's language.
   *
   * When `setLanguage` is called:
   * - The `language` property is updated.
   * - A `'language-change'` event is emitted, allowing users to listen for language updates.
   */
  setLanguage: (lang: string) => void;
};
```
