import { GridCard } from './plugin';
import {
  GridElement,
  GridItemContentElement,
  GridItemElement,
  GridItemFooterElement,
  GridItemHeaderElement,
  GridItemMediaElement,
  GridItemDescriptionElement,
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
      | GridItemDescriptionElement
      | GridItemMediaElement
      | GridItemContentElement
      | GridItemFooterElement;
  }
}

export default GridCard;
export {
  GridElement,
  GridItemElement,
  GridItemHeaderElement,
  GridItemTitleElement,
  GridItemDescriptionElement,
  GridItemMediaElement,
  GridItemContentElement,
  GridItemFooterElement,
};
