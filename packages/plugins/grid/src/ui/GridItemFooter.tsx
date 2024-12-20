import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemFooterElement, GridItemFooterElementProps } from '../types';
import cn from 'classnames';

const GridItemFooterRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemFooterElement>) => {
  const { align = 'left' } = element.props as GridItemFooterElementProps;

  return (
    <footer
      {...attributes}
      className={cn('px-4 py-3 border-t', {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        'flex justify-between items-center': align === 'between',
      })}
    >
      {children}
    </footer>
  );
};

export { GridItemFooterRender };
