import { YooptaPlugin } from '@yoopta/editor';
import { GridElementMap } from '../types';
import { GridRender } from '../ui/Grid';
import { GridItemRender } from '../ui/GridItem';
import { GridItemContentRender } from '../ui/GridItemContent';
import { GridItemFooterRender } from '../ui/GridItemFooter';
import { GridItemHeaderRender } from '../ui/GridItemHeader';
import { GridItemMediaRender } from '../ui/GridItemMedia';
import { GridItemSubtitleRender } from '../ui/GridItemSubtitle';
import { GridItemTitleRender } from '../ui/GridItemTitle';

const Grid = new YooptaPlugin<GridElementMap>({
  type: 'Grid',
  elements: {
    grid: {
      render: GridRender,
      props: {
        columns: 2,
        gap: 'md',
        minItemWidth: '200px',
        padding: 'none',
        containerWidth: 'full',
        background: 'transparent',
        border: false,
      },
      asRoot: true,
      children: ['grid-item'],
      editors: {
        columns: {
          type: 'select',
          label: 'Columns',
          description: 'Number of columns or auto-fit behavior',
          options: [
            { label: 'Auto-fit', value: 'auto-fit' },
            { label: 'Auto-fill', value: 'auto-fill' },
            { label: '2 Columns', value: 2 },
            { label: '3 Columns', value: 3 },
            { label: '4 Columns', value: 4 },
          ],
        },
        gap: {
          type: 'select',
          label: 'Gap',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        minItemWidth: {
          type: 'size',
          label: 'Min Item Width',
          units: ['px', 'rem', '%'],
        },
        background: {
          type: 'color',
          label: 'Background',
          presets: ['transparent', '#ffffff', '#f3f4f6'],
        },
        border: {
          type: 'toggle',
          label: 'Show Border',
        },
      },
    },
    'grid-item': {
      render: GridItemRender,
      props: {
        colspan: 1,
        rowspan: 1,
        variant: 'default',
        aspectRatio: '1/1',
        background: 'none',
        border: false,
      },
      children: ['grid-item-header', 'grid-item-media', 'grid-item-content', 'grid-item-footer'],
    },
    'grid-item-header': {
      render: GridItemHeaderRender,
      props: {
        align: 'left',
      },
      children: ['grid-item-title', 'grid-item-subtitle'],
    },
    'grid-item-title': {
      render: GridItemTitleRender,
      props: {
        size: 'md',
      },
      editors: {
        size: {
          type: 'select',
          label: 'Size',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      },
    },
    'grid-item-subtitle': {
      render: GridItemSubtitleRender,
    },
    'grid-item-media': {
      render: GridItemMediaRender,
      props: {
        position: 'top',
        fit: 'cover',
        nodeType: 'void',
        src: '',
      },
      editors: {
        position: {
          type: 'select',
          label: 'Position',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
            { label: 'Background', value: 'background' },
          ],
        },
        fit: {
          type: 'select',
          label: 'Fit',
          options: [
            { label: 'Cover', value: 'cover' },
            { label: 'Contain', value: 'contain' },
          ],
        },
        src: {
          type: 'url',
          label: 'Image URL',
        },
      },
    },
    'grid-item-content': {
      render: GridItemContentRender,
      props: {
        padding: 'none',
      },
    },
    'grid-item-footer': {
      render: GridItemFooterRender,
      props: {
        align: 'left',
      },
    },
  },
});

export { Grid };
