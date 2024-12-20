import { SlateElement } from '@yoopta/editor';

// Константы для типов элементов
export const GRID_ELEMENTS = {
  Grid: 'grid',
  GridItem: 'grid-item',
  GridItemHeader: 'grid-item-header',
  GridItemTitle: 'grid-item-title',
  GridItemSubtitle: 'grid-item-subtitle',
  GridItemMedia: 'grid-item-media',
  GridItemContent: 'grid-item-content',
  GridItemFooter: 'grid-item-footer',
} as const;

export type GridVariant = 'default' | 'featured' | 'compact';
export type GridAspectRatio = '1/1' | '16/9' | '4/3';
export type GridBackground = 'none' | 'gradient' | 'color';
export type GridAlign = 'left' | 'center' | 'right' | 'between';
export type GridPadding = 'none' | 'sm' | 'md' | 'lg';
export type GridColumns = number | 'auto-fit' | 'auto-fill';
export type GridMediaPosition = 'top' | 'bottom' | 'background';
export type GridMediaFit = 'cover' | 'contain';
export type GridContainerWidth = 'full' | 'container' | 'narrow';

export type GridElementProps = {
  columns: GridColumns;
  gap: GridPadding;
  minItemWidth?: string;
  padding?: GridPadding;
  containerWidth?: GridContainerWidth;
  background?: string;
  border?: boolean;
};

export type GridItemElementProps = {
  colspan: number;
  rowspan: number;
  variant: GridVariant;
  aspectRatio?: GridAspectRatio;
  background?: GridBackground;
  border?: boolean;
};

export type GridItemHeaderElementProps = {
  align?: GridAlign;
};

export type GridItemTitleElementProps = {
  size?: 'sm' | 'md' | 'lg';
};

export type GridItemMediaElementProps = {
  position?: GridMediaPosition;
  fit?: GridMediaFit;
  src?: string;
};

export type GridItemContentElementProps = {
  padding?: GridPadding;
};

export type GridItemFooterElementProps = {
  align?: GridAlign;
};

export type GridElement = SlateElement<typeof GRID_ELEMENTS.Grid, GridElementProps>;
export type GridItemElement = SlateElement<typeof GRID_ELEMENTS.GridItem, GridItemElementProps>;
export type GridItemHeaderElement = SlateElement<typeof GRID_ELEMENTS.GridItemHeader, GridItemHeaderElementProps>;
export type GridItemTitleElement = SlateElement<typeof GRID_ELEMENTS.GridItemTitle, GridItemTitleElementProps>;
export type GridItemSubtitleElement = SlateElement<typeof GRID_ELEMENTS.GridItemSubtitle>;
export type GridItemMediaElement = SlateElement<typeof GRID_ELEMENTS.GridItemMedia, GridItemMediaElementProps>;
export type GridItemContentElement = SlateElement<typeof GRID_ELEMENTS.GridItemContent, GridItemContentElementProps>;
export type GridItemFooterElement = SlateElement<typeof GRID_ELEMENTS.GridItemFooter, GridItemFooterElementProps>;

export type GridElementMap = {
  [GRID_ELEMENTS.Grid]: GridElement;
  [GRID_ELEMENTS.GridItem]: GridItemElement;
  [GRID_ELEMENTS.GridItemHeader]: GridItemHeaderElement;
  [GRID_ELEMENTS.GridItemTitle]: GridItemTitleElement;
  [GRID_ELEMENTS.GridItemSubtitle]: GridItemSubtitleElement;
  [GRID_ELEMENTS.GridItemMedia]: GridItemMediaElement;
  [GRID_ELEMENTS.GridItemContent]: GridItemContentElement;
  [GRID_ELEMENTS.GridItemFooter]: GridItemFooterElement;
};
