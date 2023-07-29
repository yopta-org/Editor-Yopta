import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';
import YooptaEditor from '@yoopta/editor';

import Paragraph, { ParagraphElement } from '@yoopta/paragraph';
import Blockquote, { BlockquoteElement } from '@yoopta/blockquote';
import Code, { CodeElement } from '@yoopta/code';
import Embed, { EmbedElement } from '@yoopta/embed';
import Image, { ImageElement } from '@yoopta/image';
import Link, { LinkElement } from '@yoopta/link';
import Callout, { CalloutElement } from '@yoopta/callout';
import Video, { VideoElement } from '@yoopta/video';
import { NumberedList, BulletedList, TodoList} from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

import ActionMenu from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Toolbar from '@yoopta/toolbar';
import { yooptaInitData } from '@/utils/initialData';

const inter = Inter({ subsets: ['latin'] });

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  Code,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  Embed.extend({
    options: {
      maxWidth: 650,
      maxHeight: 750,
    },
  }),
  Image.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'image');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
  Video.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'video');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
];

type Value = ParagraphElement |  BlockquoteElement | 
CodeElement | 
EmbedElement | 
ImageElement | 
LinkElement | 
CalloutElement | 
VideoElement;

export default function Home() {
  const [editorValue, setEditorValue] = useState<Value>(yooptaInitData);

  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main
      style={{ padding: '6rem' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full h-full">
        <YooptaEditor
          value={editorValue}
          onChange={(val: Descendant[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline
          autoFocus
          tools={{
            Toolbar: <Toolbar type="bubble" />,
            ActionMenu: <ActionMenu />,
          }}
        />
      </div>
    </main>
  );
}
