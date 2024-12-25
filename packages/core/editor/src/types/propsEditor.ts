export type ElementPropEditorType =
  | 'select'
  | 'color'
  | 'number'
  | 'toggle'
  | 'text'
  | 'size'
  | 'upload'
  | 'range-size';

export type BasePropEditor = {
  type: ElementPropEditorType;
  label: string;
  description?: string;
};

export type SelectPropEditor = BasePropEditor & {
  type: 'select';
  options: Array<{
    label: string;
    value: string | number;
  }>;
};

export type ColorPropEditor = BasePropEditor & {
  type: 'color';
  presets?: string[];
};

export type NumberPropEditor = BasePropEditor & {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export type TogglePropEditor = BasePropEditor & {
  type: 'toggle';
};

export type TextPropEditor = BasePropEditor & {
  type: 'text';
  placeholder?: string;
};

export type SizePropEditor = BasePropEditor & {
  type: 'size';
  units: ('px' | 'rem' | '%')[];
};

export type RangeSizePropEditor = BasePropEditor & {
  type: 'range-size';
  options: {
    width: {
      label: string;
      min: number;
      max: number;
    };
    height: {
      label: string;
      min: number;
      max: number;
    };
  };
};

export type UploadPropEditor = BasePropEditor & {
  type: 'upload';
  accept?: string;
  maxSize?: number;
};

export type ElementPropEditor =
  | SelectPropEditor
  | ColorPropEditor
  | NumberPropEditor
  | TogglePropEditor
  | TextPropEditor
  | SizePropEditor
  | UploadPropEditor
  | RangeSizePropEditor;
