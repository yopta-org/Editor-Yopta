import cn from 'classnames';
import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { GridElement, GridElementProps } from '../types';
import { PlusIcon } from 'lucide-react';

const PADDING_STYLES = {
  none: 'yoo-grid-p-0',
  sm: 'yoo-grid-p-4',
  md: 'yoo-grid-p-6',
  lg: 'yoo-grid-p-8',
} as const;

const GAP_STYLES = {
  none: 'yoo-grid-gap-0',
  sm: 'yoo-grid-gap-4',
  md: 'yoo-grid-gap-6',
  lg: 'yoo-grid-gap-8',
} as const;

const CONTAINER_WIDTH_STYLES = {
  full: 'yoo-grid-w-full',
  container: 'yoo-grid-max-w-7xl yoo-grid-mx-auto',
  narrow: 'yoo-grid-max-w-5xl yoo-grid-mx-auto',
} as const;

const GridRender = ({ element, attributes, blockId, children }: PluginElementRenderProps<GridElement>) => {
  const editor = useYooptaEditor();
  const {
    columns = 2,
    gap = 'md',
    minItemWidth = '280px',
    padding = 'md',
    containerWidth = 'container',
    background,
    border,
  } = element.props as GridElementProps;

  const gridColumns =
    typeof columns === 'number'
      ? `yoo-grid-grid-cols-${columns}`
      : `yoo-grid-grid-template-columns: repeat(${columns}, minmax(${minItemWidth}, 1fr))`;

  return (
    <div
      {...attributes}
      className={cn(
        'yoo-grid-grid yoo-grid-mt-2 yoo-grid-w-full yoo-grid-overflow-hidden yoo-grid-transition-all yoo-grid-hover:yoo-grid-shadow-lg',
        GAP_STYLES[gap],
        PADDING_STYLES[padding],
        CONTAINER_WIDTH_STYLES[containerWidth],
        {
          'border rounded-lg': border,
          [gridColumns]: typeof columns === 'number',
        },
      )}
      style={{
        ...(typeof columns !== 'number' && {
          gridTemplateColumns: `repeat(${columns}, minmax(${minItemWidth}, 1fr))`,
        }),
        ...(background && { backgroundColor: background }),
      }}
    >
      {children}
      <button
        type="button"
        className="yoo-grid-flex yoo-grid-items-center yoo-grid-justify-center yoo-grid-w-full yoo-grid-h-full yoo-grid-p-2 yoo-grid-text-gray-400 yoo-grid-bg-gray-100 yoo-grid-rounded-lg yoo-grid-border yoo-grid-border-gray-300 yoo-grid-border-dashed yoo-grid-transition-all yoo-grid-hover:yoo-grid-bg-[#e5e7eb] yoo-grid-hover:yoo-grid-text-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          Elements.insertElement(editor, blockId, {
            type: 'grid-item',
            path: 'next',
          });
        }}
      >
        <PlusIcon size={24} />
      </button>
    </div>
  );
};

export { GridRender };

// grid
//   grid-item
//     grid-item-header
//       grid-item-image
//     grid-item-content
//       grid-item-title
//       grid-item-description
//     grid-item-footer
//   grid-item
//     grid-item-header
//       grid-item-image
//     grid-item-content
//       grid-item-title
//       grid-item-description
//     grid-item-footer
//     grid-item
//       grid-item-header
//       grid-item-content
//       grid-item-footer
