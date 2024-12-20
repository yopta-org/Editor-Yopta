import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemTitleElement, GridItemTitleElementProps } from '../types';
import cn from 'classnames';

const GridItemTitleRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemTitleElement>) => {
  const { size = 'md' } = element.props as GridItemTitleElementProps;

  return (
    <h3
      {...attributes}
      className={cn('font-semibold text-gray-900', {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      })}
    >
      {children}
    </h3>
  );
};

export { GridItemTitleRender };
