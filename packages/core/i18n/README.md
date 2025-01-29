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
  // your object of translations
  translations: Record<YKeys, Record<string, string>>;
  // current language
  language: string;
  // all available languages
  languages: string[];
  // default language
  defaultLanguage: string;
  // method to change language
  setLanguage: (lang: string) => void;
}
```

