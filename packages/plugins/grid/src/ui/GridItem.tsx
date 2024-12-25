import cn from 'classnames';
import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemElement, GridItemElementProps } from '../types';
import { Card } from '../components/card';

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
        'yoo-grid-relative yoo-grid-flex yoo-grid-flex-col yoo-grid-overflow-hidden yoo-grid-rounded-lg yoo-grid-transition-shadow yoo-grid-rounded-xl yoo-grid-border yoo-grid-bg-card yoo-grid-text-card-foreground yoo-grid-shadow hover:yoo-grid-shadow-lg',
        {
          [`yoo-grid-col-span-${colspan}`]: colspan > 1,
          [`yoo-grid-row-span-${rowspan}`]: rowspan > 1,
        },
        VARIANT_STYLES[variant],
        aspectRatio && ASPECT_RATIO_STYLES[aspectRatio],
        BACKGROUND_STYLES[background],
        {
          'yoo-grid-ring-1 yoo-grid-ring-gray-200': border,
        },
      )}
    >
      <Card className="yoo-grid-grid yoo-grid-h-full yoo-grid-grid-rows-[auto_1fr_auto]">{children}</Card>
    </div>
  );
};

export { GridItemRender };
