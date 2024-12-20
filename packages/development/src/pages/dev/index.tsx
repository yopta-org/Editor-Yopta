import YooptaEditor, { createYooptaEditor, YooptaOnChangeOptions, YooEditor, YooptaContentValue } from '@yoopta/editor';
import { useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';

const EDITOR_STYLE = {
  width: 750,
};

const data = {
  '5299d29a-fe6b-47ed-b5df-4c07b85fd823': {
    id: '5299d29a-fe6b-47ed-b5df-4c07b85fd823',
    type: 'Grid',
    meta: {
      depth: 0,
      order: 0,
    },
    value: [
      {
        id: 'b49e1ec5-2d7f-4ee7-a5a4-53ec8c00c99d',
        type: 'grid',
        props: {
          columns: 3,
          gap: 'md',
          minItemWidth: '200px',
          padding: 'none',
          containerWidth: 'full',
          background: 'transparent',
          border: false,
        },
        children: [
          {
            id: '4d3bff4b-e1df-43dd-b633-90f74f7d9b01',
            type: 'grid-item',
            children: [
              {
                id: '74205f48-54e3-4155-9135-92fc2bb6451e',
                type: 'grid-item-header',
                children: [
                  {
                    id: '02d0b4d7-5064-47e2-93a2-eedf1ce9ec11',
                    type: 'grid-item-title',
                    children: [
                      {
                        text: 'Notifications',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      size: 'md',
                    },
                  },
                  {
                    id: 'fd30daf0-bac0-4a23-b86e-7d9a1afdf755',
                    type: 'grid-item-subtitle',
                    children: [
                      {
                        text: 'You have 3 unread messages.',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
                },
              },
              {
                id: '91ba612b-c832-420a-9d72-b460b95a3340',
                type: 'grid-item-media',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'void',
                  position: 'top',
                  fit: 'cover',
                  src: '',
                },
              },
            ],
            props: {
              nodeType: 'block',
              colspan: 1,
              rowspan: 1,
              variant: 'default',
              aspectRatio: '1/1',
              background: 'none',
              border: false,
            },
          },
          {
            id: '3d3bff4b-e1df-43d1-b633-90f74f7d9b01',
            type: 'grid-item',
            children: [
              {
                id: '44205f48-54e3-4155-9135-92fc2bb6451e',
                type: 'grid-item-header',
                children: [
                  {
                    id: '52d0b4d7-5064-47e2-93a2-eedf1ce9ec11',
                    type: 'grid-item-title',
                    children: [
                      {
                        text: 'Notifications',
                        italic: true,
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      size: 'md',
                    },
                  },
                  {
                    id: '3d30daf0-bac0-4a23-b86e-7d9a1afdf755',
                    type: 'grid-item-subtitle',
                    children: [
                      {
                        text: 'You have 3 unread messages.',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
                },
              },
              {
                id: '41ba612b-c832-420a-9d72-b460b95a3340',
                type: 'grid-item-media',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'void',
                  position: 'top',
                  fit: 'cover',
                  src: '',
                },
              },
            ],
            props: {
              nodeType: 'block',
              colspan: 1,
              rowspan: 1,
              variant: 'default',
              aspectRatio: '1/1',
              background: 'none',
              border: false,
            },
          },
        ],
      },
    ],
  },
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>(data);

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    console.log('onChange', value, options);
    setValue(value);
  };

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} DEFAULT_DATA={data} />
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={true}
          readOnly={false}
          placeholder="Type / to open menu"
          tools={TOOLS}
          style={EDITOR_STYLE}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default BasicExample;
