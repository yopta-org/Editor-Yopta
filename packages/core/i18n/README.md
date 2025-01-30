# @yoopta/i18n

This package provides internationalization (i18n) support for **YooptaEditor** by extending the editor with translation capabilities.

## 📦 Installation

```bash
yarn add @yoopta/i18n
```

## 🔹 Exports

```typescript
import {
  withTranslations,
  useTranslation,
  type I18nYooEditor,
  I18nYooEditorProvider,
  useI18nYooEditor,
} from '@yoopta/i18n';
```

### **Modules**

- **`withTranslations`** - Function to extend `YooEditor` with i18n support.
- **`I18nYooEditor`** - Extended type for `YooEditor` with i18n properties.
- **`I18nYooEditorProvider`** - Context provider for managing the i18n-enabled editor instance (needed for `useTranslation` and `useI18nYooEditor`).
- - **`useTranslation`** - Hook for language-switching and retrieving translations by keys (requires provider).
- **`useI18nYooEditor`** - Hook for retrieving the `I18nYooEditor` instance from the provider (requires provider).

---

## 🛠 Usage

### **Option 1: Using Only `withTranslations` (No Provider Required)**

If you only need to extend the editor with i18n support, you can use `withTranslations()` without the provider.
However, you will need to manually track language changes.

```tsx
import { withTranslations } from '@yoopta/i18n';
import { createYooptaEditor, YooptaEditor } from '@yoopta/editor';
import { useMemo, useEffect } from 'react';

import esTranslations from '@/locales/es.json';
import ruTranslations from '@/locales/ru.json';
import czTranslations from '@/locales/cz.json';

const TRANSLATIONS = {
  es: esTranslations,
  ru: ruTranslations,
  cz: czTranslations,
};

const editor = useMemo(() => {
  const baseEditor = createYooptaEditor();
  return withTranslations(baseEditor, {
    translations: TRANSLATIONS,
    defaultLanguage: 'en',
    language: 'ru',
  });
}, []);

useEffect(() => {
  const handleLanguageChange = (lang: string) => {
    console.log('Language changed to:', lang);
  };

  editor.on('language-change', handleLanguageChange);
  return () => {
    editor.off('language-change', handleLanguageChange);
  };
}, [editor]);
```

---

### **Option 2: Using `I18nYooEditorProvider` (Recommended for `useTranslation`)**

If you want to use `useTranslation()` inside your components, wrap the editor in `I18nYooEditorProvider`.

```tsx
import { withTranslations, I18nYooEditorProvider, useTranslation } from '@yoopta/i18n';
import { createYooptaEditor, YooptaEditor } from '@yoopta/editor';
import { useMemo, useState, useRef } from 'react';

const TRANSLATION_OPTIONS = {
  translations: {
    es: esTranslations,
    ru: ruTranslations,
    cz: czTranslations,
  },
  defaultLanguage: 'en',
  language: 'en',
};

const TranslationSelector = () => {
  const { currentLanguage, setLanguage, languages } = useTranslation();

  return (
    <div className="flex flex-col px-2">
      <span>Languages</span>
      <div className="flex">
        {languages.map((lang) => {
          const isCurrent = lang === currentLanguage;

          return (
            <button
              key={lang}
              className={`text-xs cursor-pointer shadow-md border-0 p-2 ${isCurrent ? 'bg-blue-500' : ''}`}
              onClick={() => setLanguage(lang)}
            >
              {lang}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const BasicExample = () => {
  const editor = useMemo(() => {
    const baseEditor = createYooptaEditor();
    return withTranslations(baseEditor, TRANSLATION_OPTIONS);
  }, []);

  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>({
    'block-1': buildBlockData({ id: 'block-1' }),
  });

  return (
    <I18nYooEditorProvider editor={editor} options={TRANSLATION_OPTIONS}>
      <TranslationSelector />
      <YooptaEditor
        editor={editor}
        plugins={YOOPTA_PLUGINS}
        selectionBoxRoot={selectionRef}
        marks={MARKS}
        tools={TOOLS}
        style={EDITOR_STYLE}
        value={value}
        onChange={setValue}
        autoFocus={true}
        readOnly={false}
      />
    </I18nYooEditorProvider>
  );
};
```

---

## 📜 **I18n API**

When `withTranslations` is applied to the editor, it extends `YooEditor` with the following additional properties and methods:

```typescript
export type I18nYooEditor<YKeys extends string = string> = YooEditor & {
  translations: Record<YKeys, Record<string, string>>;
  language: string;
  languages: string[];
  defaultLanguage: string;
  setLanguage: (lang: string) => void;
};
```
