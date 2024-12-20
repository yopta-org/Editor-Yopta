import { PluginElementRenderProps } from '@yoopta/editor';
import { GridItemSubtitleElement } from '../types';

const GridItemSubtitleRender = ({ attributes, children }: PluginElementRenderProps<GridItemSubtitleElement>) => {
  return (
    <div {...attributes} className="text-sm text-gray-500">
      {children}
    </div>
  );
};

export { GridItemSubtitleRender };
