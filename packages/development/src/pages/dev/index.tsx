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
  '5f7a257d-c645-40b0-b713-e8c1b6779416': {
    id: '5f7a257d-c645-40b0-b713-e8c1b6779416',
    type: 'GridCard',
    meta: {
      depth: 0,
      order: 0,
    },
    value: [
      {
        id: '9237d73c-3be7-4f77-a310-7f33747327db',
        type: 'grid',
        props: {
          columns: 'auto-fill',
          gap: 'md',
          minItemWidth: '200px',
          padding: 'none',
          containerWidth: 'full',
          background: 'transparent',
          border: false,
        },
        children: [
          {
            id: 'bbc9b152-5bf8-4c54-8011-ca688fbe9098',
            type: 'grid-item',
            children: [
              {
                id: '0db47cdf-9001-4331-9d6e-a813abf7a8c1',
                type: 'grid-item-header',
                children: [
                  {
                    id: '2191a986-62f3-47db-ad19-3c0df4e90870',
                    type: 'grid-item-image',
                    children: [
                      {
                        text: '/',
                      },
                    ],
                    props: {
                      nodeType: 'void',
                      position: 'top',
                      fit: 'cover',
                      src: 'https://res.cloudinary.com/ench-app/image/upload/v1713028758/Cheems_doge_fx8yvq.jpg',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
                },
              },
              {
                id: 'ae62f83c-2cd0-49af-8518-4b7fe96d7555',
                type: 'grid-item-content',
                children: [
                  {
                    id: '13d22afe-9059-4b8e-a76e-f0ff83384c21',
                    type: 'grid-item-title',
                    children: [
                      {
                        text: 'Explore Nature',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      size: 'md',
                    },
                  },
                  {
                    id: '39f4ed35-e839-4a91-ad4a-209d0d9c594c',
                    type: 'grid-item-description',
                    children: [
                      {
                        text: 'Discover the beauty of untouched landscapes and wildlife.',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  padding: 'md',
                },
              },
              {
                id: '0700332a-fad1-4dd4-bce3-2b6b66893eca',
                type: 'grid-item-footer',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
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
            id: 'a5ad92e2-5df4-4e1e-81b3-1f5cd3eeec40',
            type: 'grid-item',
            children: [
              {
                id: '7447ba38-ef1a-405c-81b9-dd1cda1c81f4',
                type: 'grid-item-header',
                children: [
                  {
                    id: '54f1da2b-2ac2-47d9-a5ef-1fb2e0e9592a',
                    type: 'grid-item-image',
                    children: [
                      {
                        text: '',
                      },
                    ],
                    props: {
                      nodeType: 'void',
                      position: 'top',
                      fit: 'cover',
                      src: 'https://res.cloudinary.com/ench-app/image/upload/v1713029072/ImageTransformer_hlr9eo.jpg',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
                },
              },
              {
                id: 'd69b896b-2352-44b4-af6f-f3bc4c89cc36',
                type: 'grid-item-content',
                children: [
                  {
                    id: '6b422d4b-b07f-4da9-9b19-fcb6e6e2cb84',
                    type: 'grid-item-title',
                    children: [
                      {
                        text: 'City Adventures',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      size: 'md',
                    },
                  },
                  {
                    id: '053122c0-3ae0-43cc-aa23-28e92a0d5d27',
                    type: 'grid-item-description',
                    children: [
                      {
                        text: 'Experience the vibrant culture and energy of urban life.',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  padding: 'md',
                },
              },
              {
                id: '3f08c604-9e0d-4b5a-9bcc-6858eb1871da',
                type: 'grid-item-footer',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
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
            id: '61dd9674-64f8-4005-a335-ddfdd7605ddd',
            type: 'grid-item',
            children: [
              {
                id: '507455ef-ea61-4366-bde4-08539ee06dc3',
                type: 'grid-item-header',
                children: [
                  {
                    id: '02fc0dd7-1a1a-46d4-8944-eea4e4cbf7b0',
                    type: 'grid-item-image',
                    children: [
                      {
                        text: '',
                      },
                    ],
                    props: {
                      nodeType: 'void',
                      position: 'top',
                      fit: 'cover',
                      src: 'https://yoopta.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fench-app%2Fimage%2Fupload%2Fv1720360714%2Fe608ab26-d8fd-44b6-8859-b35abc4b5558_oifyp1_dfv72b.webp&w=1920&q=75',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
                },
              },
              {
                id: '1523d6eb-a223-484a-b479-549817c4eb78',
                type: 'grid-item-content',
                children: [
                  {
                    id: '6f28afe8-c2a0-4683-9bf3-16ae377fe6df',
                    type: 'grid-item-title',
                    children: [
                      {
                        text: 'Culinary Journeys',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      size: 'md',
                    },
                  },
                  {
                    id: 'e27586b6-704f-4a32-b30d-09062793a36c',
                    type: 'grid-item-description',
                    children: [
                      {
                        text: 'Taste exquisite flavors from around the world.',
                      },
                    ],
                    props: {
                      nodeType: 'block',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                  padding: 'md',
                },
              },
              {
                id: '9b3cf971-335d-40ab-839e-fe1d68709a23',
                type: 'grid-item-footer',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'block',
                  align: 'left',
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
