import { createElement } from './createElement';
import { deleteElement } from './deleteElement';
import { updateElement } from './updateElement';
import { insertElement } from './insertElement';
import { insertElementText } from './insertElementText';
import { getElement } from './getElement';
import { getElementChildren } from './getElementChildren';
import { getElementEntry } from './getElementEntry';
import { getElementPath } from './getElementPath';
import { getParentElementPath } from './getParentElementPath';
import { isElementEmpty } from './isElementEmpty';

export const Elements = {
  createElement,
  insertElement,
  deleteElement,
  updateElement,
  insertElementText,
  getElement,
  getElementChildren,
  getElementEntry,
  isElementEmpty,
  getElementPath,
  getParentElementPath,
};

export type Elements = typeof Elements;
