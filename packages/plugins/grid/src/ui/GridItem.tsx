import cn from 'classnames';
import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemElement, GridItemElementProps } from '../types';

const VARIANT_STYLES = {
  default: 'bg-white shadow-sm',
  featured: 'bg-white shadow-md ring-1 ring-gray-200',
  compact: 'bg-gray-50',
} as const;

const ASPECT_RATIO_STYLES = {
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
} as const;

const BACKGROUND_STYLES = {
  none: '',
  gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
  color: 'bg-gray-50',
} as const;

const GridItemRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemElement>) => {
  const {
    colspan = 1,
    rowspan = 1,
    variant = 'default',
    aspectRatio,
    background = 'none',
    border = false,
  } = element.props as GridItemElementProps;

  return (
    <div
      {...attributes}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-lg transition-shadow rounded-xl border bg-card text-card-foreground shadow',
        {
          [`col-span-${colspan}`]: colspan > 1,
          [`row-span-${rowspan}`]: rowspan > 1,
        },
        VARIANT_STYLES[variant],
        aspectRatio && ASPECT_RATIO_STYLES[aspectRatio],
        BACKGROUND_STYLES[background],
        {
          'ring-1 ring-gray-200': border,
        },
      )}
    >
      {/* Grid Layout для внутреннего содержимого */}
      <div className="grid h-full grid-rows-[auto_1fr_auto]">{children}</div>
    </div>
  );
};

export { GridItemRender };
