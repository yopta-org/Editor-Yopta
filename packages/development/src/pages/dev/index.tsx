import YooptaEditor, {
  YooptaOnChangeOptions,
  YooEditor,
  YooptaContentValue,
  YooptaPath,
  createYooptaEditor,
  buildBlockData,
} from '@yoopta/editor';
import { useMemo, useRef, useState } from 'react';
import { withTranslations } from '@yoopta/i18n';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';
import { YOOPTA_DEFAULT_VALUE } from '@/utils/yoopta/value';

import esTranslations from '@/locales/es.json';
import ruTranslations from '@/locales/ru.json';
import czTranslations from '@/locales/cz.json';

const EDITOR_STYLE = {
  width: 750,
};

const TRANSLATIONS = {
  es: esTranslations,
  ru: ruTranslations,
  cz: czTranslations,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => {
    const baseEditor = createYooptaEditor();
    return withTranslations(baseEditor, {
      translations: TRANSLATIONS,
      defaultLanguage: 'en',
      language: 'ru',
    });
  }, []);

  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>({
    'block-1': buildBlockData({ id: 'block-1' }),
  });

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    console.log('onChange', value, options);
    setValue(value);
  };

  const onPathChange = (path: YooptaPath) => {};

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} DEFAULT_DATA={YOOPTA_DEFAULT_VALUE} />
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
      </div>
    </>
  );
};

export default BasicExample;
