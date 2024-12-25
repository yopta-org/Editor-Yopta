import { PluginElementRenderProps } from '@yoopta/editor';
import { CardHeader } from '../components/card';
import { cn } from '../lib/utils';
import { GridItemHeaderElement, GridItemHeaderElementProps } from '../types';

const GridItemHeaderRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemHeaderElement>) => {
  const { align = 'left' } = element.props as GridItemHeaderElementProps;

  return (
    <CardHeader
      {...attributes}
      className={cn('yoo-grid-p-0 yoo-grid-space-y-1', {
        'yoo-grid-text-left': align === 'left',
        'yoo-grid-text-center': align === 'center',
        'yoo-grid-text-right': align === 'right',
      })}
    >
      {children}
    </CardHeader>
  );
};

export { GridItemHeaderRender };
