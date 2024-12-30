import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemElement } from '../types';
import { Card } from '../components/card';

const GridItemRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemElement>) => {
  return (
    <Card {...attributes} className="yoo-grid-grid yoo-grid-h-full yoo-grid-grid-rows-[auto_1fr_auto]">
      {children}
    </Card>
  );
};

export { GridItemRender };
