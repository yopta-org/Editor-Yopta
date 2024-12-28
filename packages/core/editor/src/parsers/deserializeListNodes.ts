import {generateId} from '../utils/generateId';
import {YooEditor, YooptaBlockData} from '../editor/types';
import {deserializeTextNodes} from './deserializeTextNodes';
import {Descendant} from 'slate';

type ListHTMLElement = HTMLUListElement | HTMLOListElement | Element;

type DeserializeListBlockOptions = {
    depth?: number;
    type: 'TodoList' | 'NumberedList' | 'BulletedList';
    align: YooptaBlockData['meta']['align'];
};

// recursive function to parse nested lists and return list of Blocks
export function deserializeListNodes(
    editor: YooEditor,
    listEl: ListHTMLElement,
    options: DeserializeListBlockOptions,
): YooptaBlockData[] {
    const deserializedListBlocks: YooptaBlockData[] = [];
    const depth = typeof options.depth === 'number' ? options.depth : 0;

    if (listEl.nodeName === 'UL' || listEl.nodeName === 'OL') {
        const listItems = Array.from(listEl.children).filter((el) => el.nodeName === 'LI');

        // check if the list is a TodoList or not
        const isTodoList = listItems.some((listItem) => {
            const hasCheckbox = listItem.querySelector('input[type="checkbox"]');
            const textContent = listItem.textContent || '';
            const hasBrackets = /\[\s*[xX\s]?\s*\]/.test(textContent);
            return hasCheckbox || hasBrackets;
        });

        if (isTodoList && options.type !== 'TodoList') {
            return deserializedListBlocks;
        }

        if (!isTodoList && options.type === 'TodoList') {
            return deserializedListBlocks;
        }

        listItems.forEach((listItem) => {
            const textContent = listItem.textContent || '';
            let blockData: YooptaBlockData | null = null;

            if (options.type === 'TodoList') {
                // check if the list item has a checkbox input or brackets `[]` in the text content
                const checkbox = listItem.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
                const checked = checkbox ? checkbox.checked : /\[\s*[xX]\s*\]/.test(textContent);

                const cleanText = textContent
                    .replace(/\[\s*[xX\s]?\s*\]/, '')
                    .replace(/\u00a0/g, ' ')
                    .trim();

                blockData = {
                    id: generateId(),
                    type: 'TodoList',
                    value: [
                        {
                            id: generateId(),
                            type: 'todo-list',
                            children: [{ text: cleanText }],
                            props: { nodeType: 'block', checked },
                        },
                    ],
                    meta: { order: 0, depth, align: options.align },
                };
            } else {
                const listType = options.type === 'NumberedList' ? 'numbered-list' : 'bulleted-list';
                blockData = {
                    id: generateId(),
                    type: options.type,
                    value: [
                        {
                            id: generateId(),
                            type: listType,
                            children: deserializeTextNodes(editor, listItem.childNodes),
                            props: { nodeType: 'block' },
                        },
                    ],
                    meta: { order: 0, depth, align: options.align },
                };
            }

            if (blockData) {
                const cleanedData = {
                    ...blockData,
                    value: removeEmptyTextNodes(blockData.value),
                }

                deserializedListBlocks.push(cleanedData);
            }

            const nestedLists = Array.from(listItem.children).filter((el) => (el.nodeName === 'UL' || el.nodeName === 'OL'));

            // if the list item has nested lists, then parse them recursively by increasing the depth
            if (nestedLists.length > 0) {
                nestedLists.forEach((nestedList) => {
                    const nestedBlocks = deserializeListNodes(editor, nestedList as ListHTMLElement, {
                        ...options,
                        depth: depth + 1,
                    });
                    deserializedListBlocks.push(...nestedBlocks);
                });
            }
        });
    }

    return deserializedListBlocks;
}

function removeEmptyTextNodes(descendants: Descendant[]): Descendant[] {
    return descendants
        .map((descendant) => {
            if ('children' in descendant) {
                // Recursively clean nested children
                return {
                    ...descendant,
                    children: removeEmptyTextNodes(descendant.children),
                };
            }

            // Only include text nodes that has content
            if ('text' in descendant) {
                return !!descendant.text.trim() ? descendant : null;
            }

            return descendant;
        })
        .filter(Boolean) as Descendant[];
}
