import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemContentElement, GridItemContentElementProps } from '../types';
import cn from 'classnames';

const GridItemContentRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemContentElement>) => {
  const { padding = 'md' } = element.props as GridItemContentElementProps;

  return (
    <div
      {...attributes}
      className={cn('flex-1', {
        'p-0': padding === 'none',
        'p-3': padding === 'sm',
        'p-4': padding === 'md',
        'p-6': padding === 'lg',
      })}
    >
      {children}
    </div>
  );
};

export { GridItemContentRender };
