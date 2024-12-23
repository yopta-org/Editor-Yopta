import cn from 'classnames';
import { PluginElementRenderProps } from '@yoopta/editor';
import { GridElement, GridElementProps } from '../types';

const PADDING_STYLES = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

const GAP_STYLES = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
} as const;

const CONTAINER_WIDTH_STYLES = {
  full: 'w-full',
  container: 'max-w-7xl mx-auto',
  narrow: 'max-w-5xl mx-auto',
} as const;

const GridRender = ({ element, attributes, blockId, children }: PluginElementRenderProps<GridElement>) => {
  const {
    columns = 2,
    gap = 'md',
    minItemWidth = '280px',
    padding = 'md',
    containerWidth = 'container',
    background,
    border,
  } = element.props as GridElementProps;

  console.log('GridRender columns:', columns);

  const gridColumns =
    typeof columns === 'number'
      ? `grid-cols-${columns}`
      : `grid-template-columns: repeat(${columns}, minmax(${minItemWidth}, 1fr))`;

  return (
    <div
      {...attributes}
      className={cn(
        'grid mt-2 w-full',
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
      {/* <button
        type="button"
        className="flex items-center justify-center w-full h-full p-4 text-gray-400 bg-gray-100 rounded-lg"
        onClick={() => {}}
      >
        <PlusIcon size={24} />
      </button> */}
    </div>
  );
};

export { GridRender };
