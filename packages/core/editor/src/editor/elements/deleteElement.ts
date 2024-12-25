import { Editor, Element, Path, Transforms } from 'slate';
import { generateId } from '../../utils/generateId';
import { Blocks } from '../blocks';
import { SlateElement, YooEditor } from '../types';
import { findElementSiblingPath } from './utils';

// export function deleteElement(editor: YooEditor, blockId: string, element: DeleteBlockElement) {
//   const block = editor.children[blockId];

//   if (!block) {
//     throw new Error(`Block with id ${blockId} not found`);
//   }

//   const slate = findSlateBySelectionPath(editor, { at: block.meta.order });

//   if (!slate) {
//     console.warn('No slate found');
//     return;
//   }

//   Editor.withoutNormalizing(slate, () => {
//     Transforms.removeNodes(slate, {
//       at: element.path,
//       match: (n) => Element.isElement(n) && n.type === element.type,
//     });

//     // editor.emit('change', { value: editor.children, operations: [] });
//   });
// }

export function deleteElement(editor: YooEditor, blockId: string, options: { type: string; path: number[] | Path }) {
  const slate = Blocks.getBlockSlate(editor, { id: blockId });
  if (!slate) return;

  Editor.withoutNormalizing(slate, () => {
    const deletePath = Array.isArray(options.path) ? options.path : [options.path];

    const [existing] = Editor.node(slate, deletePath);
    if (!Element.isElement(existing) || existing.type !== options.type) {
      console.warn(`Cannot delete element: element not found or type mismatch at path ${deletePath.join(',')}`);
      return;
    }

    const siblingPath = findElementSiblingPath(editor, blockId, options.type);
    const isLastOfType = siblingPath && Path.equals(siblingPath, deletePath);

    Transforms.removeNodes(slate, { at: deletePath });

    if (isLastOfType) {
      const blockData = editor.children[blockId];
      const blockEntity = editor.blocks[blockData.type];
      const elementConfig = blockEntity.elements[options.type];

      if (elementConfig.asRoot) {
        const newElement: SlateElement = {
          id: generateId(),
          type: options.type,
          children: [{ text: '' }],
          props: { ...elementConfig.props },
        };

        Transforms.insertNodes(slate, newElement, { at: [0] });
      }
    }
  });
}
