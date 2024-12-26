import { YooptaPlugin } from '@yoopta/editor';
import { GridElementMap } from '../types';
import { GridRender } from '../ui/Grid';
import { GridItemRender } from '../ui/GridItem';
import { GridItemContentRender } from '../ui/GridItemContent';
import { GridItemHeaderRender } from '../ui/GridItemHeader';
import { GridItemMediaRender } from '../ui/GridItemMedia';
import { GridItemSubtitleRender } from '../ui/GridItemSubtitle';
import { GridItemTitleRender } from '../ui/GridItemTitle';

const GridCard = new YooptaPlugin<GridElementMap>({
  type: 'GridCard',
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
      children: ['grid-item', 'grid-item', 'grid-item'],
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
          presets: [
            'transparent',
            '#000000',
            '#FFFFFF',
            '#F3F4F6',
            '#EF4444',
            '#F59E0B',
            '#10B981',
            '#3B82F6',
            '#6366F1',
            '#8B5CF6',
          ],
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
      children: ['grid-item-header', 'grid-item-content'],
      editors: {
        colspan: {
          type: 'number',
          label: 'Colspan',
        },
        rowspan: {
          type: 'number',
          label: 'Rowspan',
        },
        variant: {
          type: 'select',
          label: 'Variant',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Card', value: 'card' },
            { label: 'Simple', value: 'simple' },
          ],
        },
        aspectRatio: {
          type: 'select',
          label: 'Aspect Ratio',
          options: [
            { label: '1:1', value: '1:1' },
            { label: '16:9', value: '16:9' },
            { label: '4:3', value: '4:3' },
            { label: '3:2', value: '3:2' },
            { label: '2:1', value: '2:1' },
          ],
        },
      },
    },
    'grid-item-header': {
      render: GridItemHeaderRender,
      props: { align: 'left' },
      children: ['grid-item-image'],
    },
    'grid-item-content': {
      render: GridItemContentRender,
      props: {
        padding: 'md',
      },
      children: ['grid-item-title', 'grid-item-description'],
      editors: {
        padding: {
          type: 'select',
          label: 'Padding',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      },
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
    'grid-item-description': {
      render: GridItemSubtitleRender,
    },
    'grid-item-image': {
      render: GridItemMediaRender,
      props: {
        fit: 'fill',
        nodeType: 'void',
        src: '',
      },
      editors: {
        fit: {
          type: 'select',
          label: 'Fit',
          options: [
            { label: 'Cover', value: 'cover' },
            { label: 'Contain', value: 'contain' },
            { label: 'Fill', value: 'fill' },
          ],
        },
        src: {
          type: 'upload',
          label: 'Image URL',
        },
      },
    },
  },
  extensions: (slate, editor) => {
    const { isSelectable } = slate;

    slate.isSelectable = (element) => {
      if (element.type === 'grid-item-image') {
        return false;
      }

      return isSelectable(element);
    };

    return slate;
  },
});

export { GridCard };
