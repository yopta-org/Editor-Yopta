import { PluginElementRenderProps } from '@yoopta/editor';
import { CardDescription } from '../components/card';
import { GridItemDescriptionElement } from '../types';

const GridItemSubtitleRender = ({ attributes, children }: PluginElementRenderProps<GridItemDescriptionElement>) => {
  return (
    <CardDescription {...attributes} className="yoo-grid-text-sm yoo-grid-text-gray-500">
      {children}
    </CardDescription>
  );
};

export { GridItemSubtitleRender };
