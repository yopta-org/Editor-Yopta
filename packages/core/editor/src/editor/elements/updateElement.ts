import { Editor, Element, Path, Transforms } from 'slate';
import { Blocks } from '../blocks';
import { SlateElement, YooEditor } from '../types';
import { ElementOperationOptions } from './utils';

// export function updateElement<TElementKeys extends string, TElementProps>(
//   editor: YooEditor,
//   blockId: string,
//   element: UpdateElement<TElementKeys, TElementProps>,
//   options?: UpdateElementOptions,
// ) {
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
//     const [elementEntry] = Editor.nodes<SlateElement>(slate, {
//       at: options?.path || [0],
//       match: (n) => Element.isElement(n) && n.type === element.type,
//     });

//     const elementToUpdate = elementEntry?.[0];
//     const elementToUpdatePath = elementEntry?.[1];

//     const props = elementToUpdate?.props || {};
//     const updatedElement = { props: { ...props, ...element.props } };

//     Transforms.setNodes<SlateElement>(slate, updatedElement, {
//       at: options?.path || elementToUpdatePath || [0],
//       match: (n) => Element.isElement(n) && n.type === element.type,
//       mode: 'lowest',
//     });

//     // editor.emit('change', { value: editor.children, operations: [] });
//   });
// }

/**
 * Обновляет существующий элемент, сохраняя его структуру и дочерние элементы.
 * Метод гарантирует, что обновление не нарушит структуру документа.
 */
export function updateElement<T extends SlateElement = SlateElement>(
  editor: YooEditor,
  blockId: string,
  options: Omit<ElementOperationOptions<T>, 'split' | 'focus'> & { path?: Path },
) {
  const slate = Blocks.getBlockSlate(editor, { id: blockId });
  if (!slate) return;

  Editor.withoutNormalizing(slate, () => {
    const updatePath = options.path;

    console.log('updateElement updatePath', updatePath);
    const [elementEntry] = Editor.nodes<SlateElement>(slate, {
      at: updatePath || [0],
      match: (n) => Element.isElement(n) && n.type === options.type,
    });

    console.log('updateElement elementEntry', elementEntry);

    const path = elementEntry?.[1];
    if (!Path.isPath(path)) return;

    const [existing] = Editor.node(slate, path);
    if (!Element.isElement(existing) || existing.type !== options.type) {
      console.warn(`Cannot update element: element not found or type mismatch at path ${path.join(',')}`);
      return;
    }

    const updatedProps = {
      ...existing.props,
      ...options.props,
    };

    Transforms.setNodes(
      slate,
      { props: updatedProps },
      { at: path, match: (n) => Element.isElement(n) && n.type === options.type },
    );
  });
}
