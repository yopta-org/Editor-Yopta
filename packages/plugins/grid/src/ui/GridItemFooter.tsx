import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemFooterElement, GridItemFooterElementProps } from '../types';
import { CardFooter } from '../components/card';
import { cn } from '../lib/utils';

const GridItemFooterRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemFooterElement>) => {
  const { align = 'left' } = element.props as GridItemFooterElementProps;

  return (
    <CardFooter
      {...attributes}
      className={cn('yoo-grid-px-4 yoo-grid-py-3 yoo-grid-border-t', {
        'yoo-grid-text-left': align === 'left',
        'yoo-grid-text-center': align === 'center',
        'yoo-grid-text-right': align === 'right',
        'yoo-grid-flex justify-between items-center': align === 'between',
      })}
    >
      {children}
    </CardFooter>
  );
};

export { GridItemFooterRender };
