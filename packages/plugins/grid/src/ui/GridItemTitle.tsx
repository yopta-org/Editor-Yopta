import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemTitleElement, GridItemTitleElementProps } from '../types';
import { CardTitle } from '../components/card';
import { cn } from '../lib/utils';

const GridItemTitleRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemTitleElement>) => {
  const { size = 'md' } = element.props as GridItemTitleElementProps;

  return (
    <CardTitle
      {...attributes}
      className={cn('yoo-grid-font-semibold yoo-grid-text-gray-900 yoo-grid-mb-2', {
        'yoo-grid-text-sm': size === 'sm',
        'yoo-grid-text-base': size === 'md',
        'yoo-grid-text-lg': size === 'lg',
      })}
    >
      {children}
    </CardTitle>
  );
};

export { GridItemTitleRender };
