export type PropEditorType = 'select' | 'color' | 'number' | 'toggle' | 'text' | 'size';

export type BasePropEditor = {
  type: PropEditorType;
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

export type UploadPropEditor = BasePropEditor & {
  type: 'upload';
  accept?: string;
  maxSize?: number;
};

export type PropEditor =
  | SelectPropEditor
  | ColorPropEditor
  | NumberPropEditor
  | TogglePropEditor
  | TextPropEditor
  | SizePropEditor
  | UploadPropEditor;
