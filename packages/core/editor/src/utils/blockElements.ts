import { Editor, Element, NodeEntry, Path } from 'slate';
import { buildBlockElement } from '../editor/elements/utils';
import { SlateEditor, SlateElement, YooEditor, YooptaBlock, YooptaBlockData } from '../editor/types';
import { Plugin, PluginElement, PluginElementProps, PluginElementsMap } from '../plugins/types';
import { generateId } from './generateId';

export function getRootBlockElementType(elems: PluginElementsMap<string, unknown> | undefined): string | undefined {
  if (!elems) return;

  const elements = Object.keys(elems);
  const rootElementType = elements.length === 1 ? elements[0] : elements.find((key) => elems[key].asRoot);

  return rootElementType;
}

export function getRootBlockElement(
  elems: PluginElementsMap<string, unknown> | undefined,
): PluginElement<string, unknown> | undefined {
  if (!elems) return;

  const rootElementType = getRootBlockElementType(elems);
  const rootElement = rootElementType ? elems[rootElementType] : undefined;

  return rootElement;
}

export function isRootElementVoid(elems: PluginElementsMap<string, unknown> | undefined): boolean {
  const rootElement = getRootBlockElement(elems);
  return rootElement?.props?.nodeType === 'void';
}

export type GetBlockElementNodeOptions = {
  at?: Path;
  elementType?: string;
};

export function getBlockElementNode(
  slate: SlateEditor,
  options: GetBlockElementNodeOptions = {},
): NodeEntry<SlateElement> | undefined {
  const { at, elementType } = options;

  const atPath = at || slate.selection?.anchor.path;
  if (!atPath) return;

  let match = (n) => !Editor.isEditor(n) && Element.isElement(n);

  if (elementType) {
    match = (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === elementType;
  }

  const parentPath = Path.parent(atPath);
  const nodes = Editor.nodes(slate, {
    at: parentPath,
    match,
    mode: 'lowest',
  });

  if (nodes) {
    const [nodeEntry] = nodes;
    return nodeEntry as NodeEntry<SlateElement>;
  }
}

export function buildSlateNodeElement(
  type: string,
  props: PluginElementProps<unknown> = { nodeType: 'block' },
): SlateElement<any> {
  return { id: generateId(), type, children: [{ text: '' }], props };
}

export function getPluginByInlineElement(
  plugins: YooEditor['plugins'],
  elementType: string,
): Plugin<Record<string, SlateElement>, unknown> | undefined {
  const plugin = Object.values(plugins).find((plugin) => {
    return plugin.type === plugin.elements?.[elementType]?.rootPlugin;
  });
  return plugin;
}
