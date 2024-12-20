import { useFloating, offset, flip, shift } from '@floating-ui/react';
import { useEffect, useRef } from 'react';
import { useFocusedElement } from '../../contexts/FocusManager/FocusManager';

import { PropEditor } from '../../types/propsEditor';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import cn from 'classnames';
import { Switch } from '../ui/switch';
import { Portal } from '../../UI/Portal/Portal';
import { SlateElement, YooEditor } from '../../editor/types';
import { Elements } from '../../editor/elements';
import { Blocks } from '../../editor/blocks';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';

type SelectEditorProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{
    label: string;
    value: string | number;
  }>;
  label: string;
  description?: string;
};

const SelectEditor = ({ value, onChange, options, label, description }: SelectEditorProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {description && <span className="text-xs font-normal text-gray-500 ml-1">({description})</span>}
      </Label>
      <Select value={value.toString()} onValueChange={(val) => onChange(val)}>
        <SelectTrigger className="w-full h-8 text-sm">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value.toString()} value={option.value.toString()} className="text-sm">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

type ToggleEditorProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
};

const ToggleEditor = ({ value, onChange, label, description }: ToggleEditorProps) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {description && <span className="text-xs font-normal text-gray-500 ml-1">({description})</span>}
      </Label>
      <Switch checked={value} onCheckedChange={onChange} className="data-[state=checked]:bg-blue-600" />
    </div>
  );
};

// Size Editor
type SizeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  units: ('px' | 'rem' | '%')[];
  label: string;
  description?: string;
};

const SizeEditor = ({ value, onChange, units, label, description }: SizeEditorProps) => {
  // Парсинг значения и единицы измерения
  const numValue = parseFloat(value) || 0;
  const unit = value.replace(/[\d.]/g, '') || units[0];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${e.target.value}${unit}`);
  };

  const handleUnitChange = (newUnit: string) => {
    onChange(`${numValue}${newUnit}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {description && <span className="text-xs font-normal text-gray-500 ml-1">({description})</span>}
      </Label>
      <div className="flex space-x-2">
        <Input type="number" value={numValue} onChange={handleValueChange} className="h-8 text-sm" />
        <Select value={unit} onValueChange={handleUnitChange}>
          <SelectTrigger className="w-20 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit} className="text-sm">
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// Color Editor
type ColorEditorProps = {
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
  label: string;
  description?: string;
};

const DEFAULT_COLORS = [
  '#000000',
  '#FFFFFF',
  '#F3F4F6',
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#6366F1',
  '#8B5CF6',
];

const ColorEditor = ({ value, onChange, presets = DEFAULT_COLORS, label, description }: ColorEditorProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {description && <span className="text-xs font-normal text-gray-500 ml-1">({description})</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'w-full h-8 rounded-md border border-gray-200 flex items-center gap-2 px-3 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
            )}
          >
            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: value }} />
            <span className="text-gray-600">{value}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-3">
          <div className="grid grid-cols-3 gap-2">
            {presets.map((color) => (
              <button
                key={color}
                className={cn(
                  'w-full h-8 rounded-md border',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                  value === color && 'ring-2 ring-blue-500 ring-offset-1',
                )}
                style={{ backgroundColor: color }}
                onClick={() => onChange(color)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const renderPropEditor = (
  editor: YooEditor,
  propName: string,
  propEditor: PropEditor,
  element: Pick<SlateElement, 'id' | 'type' | 'props'>,
) => {
  const value = element.props?.[propName];

  const handleChange = (newValue: any) => {
    const elementProps = element.props || {};
    const oldValue = elementProps[propName];
    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block) return;

    Elements.updateElement(editor, block.id, {
      type: element.type,
      props: {
        ...elementProps,
        [propName]: newValue,
      },
    });

    console.log('handleChange:', { prop: propName, newValue: newValue, oldValue: oldValue });
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
    default:
      return null;
  }
};

export const EditElementPropsToolbar = () => {
  const editor = useYooptaEditor();
  const focusedElement = useFocusedElement();
  const elementRef = useRef<HTMLElement | null>(null);

  const { refs, floatingStyles, update } = useFloating({
    placement: 'top',
    middleware: [offset(12), flip(), shift()],
  });

  useEffect(() => {
    if (!focusedElement) return;

    const element = document.querySelector(`[data-element-id="${focusedElement.id}"]`);

    if (element) {
      elementRef.current = element as HTMLElement;
      refs.setReference(element);
      update();
    }

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [focusedElement, update]);

  // console.log('EditElementPropsToolbar', focusedElement);

  if (!focusedElement) return null;

  const editorEntries = Object.entries(focusedElement.editors || {});
  if (editorEntries.length === 0) return null;

  return (
    <Portal id="edit-element">
      <div
        ref={refs.setFloating}
        onClick={(e) => e.stopPropagation()}
        style={floatingStyles}
        className="z-50 min-w-[280px] p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <div className="flex flex-col gap-4">
          <div className="text-sm font-medium text-gray-700 pb-2 border-b capitalize">{focusedElement.type}</div>
          {editorEntries.map(([propName, propEditor]) => (
            <div key={propName} className="flex flex-col gap-1">
              {renderPropEditor(editor, propName, propEditor, {
                id: focusedElement.id,
                type: focusedElement.props,
                props: focusedElement.props,
              })}
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
};
