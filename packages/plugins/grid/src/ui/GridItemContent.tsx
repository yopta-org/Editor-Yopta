import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemContentElement, GridItemContentElementProps } from '../types';
import { CardContent } from '../components/card';
import { cn } from '../lib/utils';

const GridItemContentRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemContentElement>) => {
  const { padding = 'md' } = element.props as GridItemContentElementProps;

  return (
    <CardContent
      {...attributes}
      className={cn('yoo-grid-flex-1', {
        'yoo-grid-p-0': padding === 'none',
        'yoo-grid-p-3': padding === 'sm',
        'yoo-grid-p-4': padding === 'md',
        'yoo-grid-p-6': padding === 'lg',
      })}
    >
      {children}
    </CardContent>
  );
};

export { GridItemContentRender };
