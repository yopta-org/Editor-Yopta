import { Descendant, Editor, Element, Path } from 'slate';
import { PluginElement, PluginElementsMap } from '../../../plugins/types';
import { getRootBlockElementType } from '../../../utils/blockElements';
import { generateId } from '../../../utils/generateId';
import { Blocks } from '../../blocks';
import { SlateElement, YooEditor, YooptaBlock } from '../../types';

export function buildBlockElement(element?: Partial<SlateElement>): SlateElement {
  return {
    id: generateId(),
    type: element?.type || 'paragraph',
    children: element?.children || [{ text: '' }],
    props: {
      nodeType: 'block',
      ...element?.props,
    },
  };
}

export function buildChildrenElements(editor: YooEditor, blockId: string, elementType: string) {
  const blockData = editor.children[blockId];
  const blockEntity = editor.blocks[blockData.type];
  const blockElement = blockEntity?.elements?.[elementType];
  const childrenElements: SlateElement[] = [];

  if (Array.isArray(blockElement.children) && blockElement.children.length > 0) {
    blockElement.children.forEach((childElementType) => {
      const childElement = blockEntity.elements[childElementType];
      childrenElements.push(buildBlockElement({ type: childElementType, props: childElement.props }));
    });
  }

  return childrenElements;
}

export function findElementSiblingPath(editor: YooEditor, blockId: string, elementType: string): Path | null {
  const slate = Blocks.getBlockSlate(editor, { id: blockId });
  if (!slate) return null;

  // Проходим по всем узлам в поисках элемента нужного типа
  const elementEntry = Editor.nodes(slate, {
    match: (node) => Element.isElement(node) && node.type === elementType,
  }).next().value;

  if (elementEntry) {
    const [_, path] = elementEntry;
    return path;
  }

  return null;
}

type ElementsMapWithTextContent = {
  [key: string]: string;
};

export function buildElementChildren(
  blockElement: PluginElement<unknown>,
  blockElements: PluginElementsMap,
  elementsMapWithTextContent?: ElementsMapWithTextContent,
): SlateElement[] | Descendant[] {
  if (!blockElement.children) return [{ text: '' }];
  if (Array.isArray(blockElement.children) && blockElement.children.length === 0) return [{ text: '' }];

  return blockElement.children?.map((elementType) => {
    const childElement = blockElements[elementType];
    // if (!childElement) {
    //   throw new Error(`Element definition for ${elementType} not found`);
    // }

    const childNode: SlateElement = buildBlockElement({
      id: generateId(),
      type: elementType,
      props: childElement.props,
      children:
        childElement.children && childElement.children.length > 0
          ? buildElementChildren(childElement, blockElements, elementsMapWithTextContent)
          : [{ text: elementsMapWithTextContent?.[elementType] || '' }],
    });

    return childNode;
  });
}

export function buildBlockElementsStructure(
  editor: YooEditor,
  blockType: string,
  elementsMapWithTextContent?: ElementsMapWithTextContent,
): SlateElement {
  const block: YooptaBlock = editor.blocks[blockType];
  const blockElements = block.elements;

  const rootBlockElementType = getRootBlockElementType(blockElements);
  if (!rootBlockElementType) {
    throw new Error(`Root element type not found for block type ${blockType}`);
  }
  const rootBlockElement = blockElements[rootBlockElementType];

  const rootElementNode: SlateElement = {
    id: generateId(),
    type: rootBlockElementType,
    props: rootBlockElement.props,
    children:
      rootBlockElement.children && rootBlockElement.children.length > 0
        ? buildElementChildren(rootBlockElement, blockElements, elementsMapWithTextContent)
        : [{ text: '' }],
  };

  return rootElementNode;
}

export type ElementOperationOptions<T extends SlateElement = SlateElement> = {
  type: T['type'];
  path?: 'next' | number[] | Path;
  props?: Omit<Partial<T['props']>, 'nodeType'>;
  focus?: boolean;
  split?: boolean;
};
