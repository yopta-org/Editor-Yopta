import { Editor, Element, Path, Transforms } from 'slate';
import { SlateElement, YooEditor } from '../types';
import { Blocks } from '../blocks';
import { generateId } from '../../utils/generateId';
import { buildElementChildren, ElementOperationOptions, findElementSiblingPath } from './utils';

/**
 * Inserts a new element into the block's Slate structure.
 * This can either create a new element at a specific path or split an existing one.
 */
export function insertElement(editor: YooEditor, blockId: string, options: ElementOperationOptions) {
  const slate = Blocks.getBlockSlate(editor, { id: blockId });
  if (!slate) return;

  Editor.withoutNormalizing(slate, () => {
    const blockData = editor.children[blockId];
    const blockEntity = editor.blocks[blockData.type];
    const blockElement = blockEntity.elements[options.type];
    const newElement: SlateElement = {
      id: generateId(),
      type: options.type,
      children: buildElementChildren(blockElement, blockEntity.elements),
      props: { ...blockElement.props, ...options.props },
    };

    const siblingPath = findElementSiblingPath(editor, blockId, newElement.type);
    if (!siblingPath) return;

    if (options.path === 'next') {
      if (slate.selection) {
        const parentPath = Path.parent(slate.selection.anchor.path);
        const nextPath = Path.next(parentPath);
        Transforms.insertNodes(slate, newElement, { at: Path.next(siblingPath) });

        if (options.focus) {
          const point = Editor.start(slate, nextPath);
          Transforms.select(slate, point);
        }
      }
    } else if (options.split && slate.selection) {
      const parentPath = Path.parent(slate.selection.anchor.path);
      Transforms.splitNodes(slate, {
        at: slate.selection,
        match: (n) => Element.isElement(n) && n.type === newElement.type,
      });
      Transforms.insertNodes(slate, newElement, { at: Path.next(parentPath) });

      if (options.focus) {
        const point = Editor.start(slate, Path.next(parentPath));
        Transforms.select(slate, point);
      }
    } else if (options.path) {
      // [TODO] - we need find right sibling path
      const insertPath = Array.isArray(options.path) ? options.path : [options.path];
      Transforms.insertNodes(slate, newElement, { at: insertPath });

      if (options.focus) {
        const point = Editor.start(slate, insertPath);
        Transforms.select(slate, point);
      }
    }
  });
}
