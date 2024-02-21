import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Callout from '@yoopta/callout';
import Headings from '@yoopta/headings';
import Mention from '@yoopta/mention';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import { useMemo } from 'react';

const plugins = [
  Paragraph,
  Headings.HeadingOne,
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Mention,
  Link,
  Image,
];

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);

  const onSubmit = () => {
    const editorData = editor.getValue();
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          // editor.moveBlock('callout_4', [1]);

          console.log('from component editor', editor.selection);

          editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
        }}
      >
        Highlight text
      </button>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        className="w-[650px] pt-14 pb-20 mx-auto"
        // onChange={(val) => console.log('on change prop value', val)}
        // placeholder="Type / to open menu"
      />
    </div>
  );
};

export default BasicExample;
