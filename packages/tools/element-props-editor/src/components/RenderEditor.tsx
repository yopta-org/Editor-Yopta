import {
  Blocks,
  ElementPropEditor,
  Elements,
  SlateElement,
  useSetFocusedElement,
  useFocusedElement,
  YooEditor,
  useUpdateFocusedElement,
} from '@yoopta/editor';
import { useCallback, useReducer, useState } from 'react';
import { ReactEditor } from 'slate-react';
import { RangeSizeEditor } from 'src/editors/RangeSizeEditor';
import { ColorEditor } from '../editors/ColorEditor';
import { SelectEditor } from '../editors/SelectEditor';
import { SizeEditor } from '../editors/SizeEditor';
import { ToggleEditor } from '../editors/ToggleEditor';
import { UploadEditor } from '../editors/UploadEditor';

export type RenderEditorProps = {
  editor: YooEditor;
  propName: string;
  propEditor: ElementPropEditor;
  element: SlateElement;
};

export const RenderElementPropEditor = ({ editor, propEditor, propName, element }: RenderEditorProps) => {
  const focusedElement = useFocusedElement();
  const updateFocusedElement = useUpdateFocusedElement();
  const value = element.props?.[propName];

  const handleChange = (newValue: any) => {
    const elementProps = element.props || {};
    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block) return;

    const slate = Blocks.getBlockSlate(editor, { id: block.id });
    if (!slate) return;

    console.log('handleChange element:', element);
    const elementPath = Elements.getElementPath(editor, block.id, element);
    console.log('handleChange elementPath:', elementPath);
    if (!elementPath) return;

    Elements.updateElement(editor, block.id, {
      type: element.type,
      props: {
        ...elementProps,
        [propName]: newValue,
      },
      path: elementPath,
    });

    updateFocusedElement({
      [propName]: newValue,
    });
  };

  switch (propEditor.type) {
    case 'select':
      return (
        <SelectEditor
          value={value}
          onChange={handleChange}
          options={propEditor.options}
          label={propEditor.label}
          description={propEditor.description}
        />
      );
    case 'toggle':
      return (
        <ToggleEditor
          value={value}
          onChange={handleChange}
          label={propEditor.label}
          description={propEditor.description}
        />
      );
    case 'size':
      return (
        <SizeEditor
          value={value}
          onChange={handleChange}
          units={propEditor.units}
          label={propEditor.label}
          description={propEditor.description}
        />
      );
    case 'color':
      return (
        <ColorEditor
          value={value}
          onChange={handleChange}
          presets={propEditor.presets}
          label={propEditor.label}
          description={propEditor.description}
        />
      );

    case 'upload':
      return (
        <UploadEditor
          value={value}
          onChange={handleChange}
          label={propEditor.label}
          description={propEditor.description}
        />
      );

    case 'range-size':
      return (
        <RangeSizeEditor
          value={value}
          onChange={handleChange}
          label={propEditor.label}
          description={propEditor.description}
          options={propEditor.options}
        />
      );
    default:
      return null;
  }
};
