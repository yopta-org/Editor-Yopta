import { Grid } from './plugin';
import {
  GridElement,
  GridElementProps,
  GridItemContentElement,
  GridItemElement,
  GridItemFooterElement,
  GridItemHeaderElement,
  GridItemMediaElement,
  GridItemSubtitleElement,
  GridItemTitleElement,
} from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element:
      | GridElement
      | GridItemElement
      | GridItemHeaderElement
      | GridItemTitleElement
      | GridItemSubtitleElement
      | GridItemMediaElement
      | GridItemContentElement
      | GridItemFooterElement;
  }
}

export default Grid;
export {
  GridElement,
  GridItemElement,
  GridItemHeaderElement,
  GridItemTitleElement,
  GridItemSubtitleElement,
  GridItemMediaElement,
  GridItemContentElement,
  GridItemFooterElement,
};
