import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemHeaderElement, GridItemHeaderElementProps } from '../types';
import cn from 'classnames';

const GridItemHeaderRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemHeaderElement>) => {
  const { align = 'left' } = element.props as GridItemHeaderElementProps;

  return (
    <header
      {...attributes}
      className={cn('p-4 space-y-1', {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      })}
    >
      {children}
    </header>
  );
};

export { GridItemHeaderRender };
