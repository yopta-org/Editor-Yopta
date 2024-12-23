import { useFloating, offset, flip, shift } from '@floating-ui/react';
import { useEffect, useRef } from 'react';
import { useFocusedEntity } from '../../contexts/FocusManager/FocusManager';

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
import { ReactEditor } from 'slate-react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

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

type UploadEditorProps = {
  value: string; // URL изображения
  onChange: (value: string) => void;
  label: string;
  description?: string;
  accept?: string; // Допустимые типы файлов
  maxSize?: number; // Максимальный размер в байтах
};

const UploadEditor = ({
  value,
  onChange,
  label,
  description,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB по умолчанию
}: UploadEditorProps) => {
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > maxSize) {
      // [TODO] - добавить нормальную обработку ошибок
      console.error('File is too large');
      return;
    }

    // [TODO] - добавить реальную загрузку файла
    // Здесь будет ваша логика загрузки файла и получения URL
    const fakeUploadedUrl = URL.createObjectURL(file);
    onChange(fakeUploadedUrl);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      console.error('File is too large');
      return;
    }

    const fakeUploadedUrl = URL.createObjectURL(file);
    onChange(fakeUploadedUrl);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="yoo-editor-upload-wrapper flex flex-col space-y-2">
      <Label className="yoo-editor-upload-label text-sm font-medium text-gray-700">
        {label}
        {description && (
          <span className="yoo-editor-upload-description text-xs font-normal text-gray-500 ml-1">({description})</span>
        )}
      </Label>

      <Dialog>
        <DialogTrigger className="yoo-editor-upload-trigger w-full">
          {value ? (
            <div className="yoo-editor-upload-preview relative w-full aspect-video rounded-md overflow-hidden border border-gray-200 group">
              <img src={value} alt="Uploaded image" className="object-cover" />
              <div className="yoo-editor-upload-overlay absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="text-white w-6 h-6" />
              </div>
            </div>
          ) : (
            <div className="yoo-editor-upload-placeholder w-full aspect-video rounded-md border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors flex flex-col items-center justify-center gap-2">
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-500">Click to upload image</span>
            </div>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload image</DialogTitle>
            <DialogDescription>Drag and drop your image here or click to browse</DialogDescription>
          </DialogHeader>

          <div
            className="yoo-editor-upload-dropzone mt-4 p-8 border-2 border-dashed border-gray-200 rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="yoo-editor-upload-input hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="yoo-editor-upload-label flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <div className="text-center">
                <p className="text-sm text-gray-600">Drag and drop your image here or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB</p>
              </div>
            </label>
          </div>

          {value && (
            <div className="yoo-editor-upload-actions mt-4 flex justify-end">
              <button
                onClick={handleRemove}
                className="yoo-editor-upload-remove flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
                Remove image
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SelectEditor = ({ value, onChange, options, label, description }: SelectEditorProps) => {
  return (
    <div className="yoo-editor-flex yoo-editor-flex-col yoo-editor-space-y-2">
      <Label className="yoo-editor-text-xs yoo-editor-font-medium yoo-editor-text-gray-700">
        {label}
        {description && (
          <span className="yoo-editor-text-xs yoo-editor-font-normal yoo-editor-text-gray-500 yoo-editor-ml-1">
            ({description})
          </span>
        )}
      </Label>
      <Select value={value.toString()} onValueChange={(val) => onChange(val)}>
        <SelectTrigger className="yoo-editor-w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value.toString()} value={option.value.toString()} className="yoo-editor-text-xs">
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
    <div className="yoo-editor-flex yoo-editor-items-center yoo-editor-justify-between yoo-editor-space-x-2">
      <Label className="yoo-editor-text-xs yoo-editor-font-medium yoo-editor-text-gray-700">
        {label}
        {description && (
          <span className="yoo-editor-text-xs yoo-editor-font-normal yoo-editor-text-gray-500 yoo-editor-ml-1">
            ({description})
          </span>
        )}
      </Label>
      <Switch checked={value} onCheckedChange={onChange} className="data-[state=checked]:yoo-editor-bg-blue-600" />
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
    <div className="yoo-editor-flex yoo-editor-flex-col yoo-editor-space-y-2">
      <Label className="yoo-editor-text-xs yoo-editor-font-medium yoo-editor-text-gray-700">
        {label}
        {description && (
          <span className="yoo-editor-text-xs yoo-editor-font-normal yoo-editor-text-gray-500 yoo-editor-ml-1">
            {description}
          </span>
        )}
      </Label>
      <div className="yoo-editor-flex yoo-editor-space-x-2">
        <Input
          type="number"
          value={numValue}
          onChange={handleValueChange}
          className="yoo-editor-h-8 yoo-editor-text-sm"
        />
        <Select value={unit} onValueChange={handleUnitChange}>
          <SelectTrigger className="yoo-editor-w-20 yoo-editor-h-8 yoo-editor-text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit} className="yoo-editor-text-sm">
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
    <div className="yoo-editor-flex yoo-editor-flex-col yoo-editor-space-y-2">
      <Label className="yoo-editor-text-xs yoo-editor-font-medium yoo-editor-text-gray-700">
        {label}
        {description && (
          <span className="yoo-editor-text-xs yoo-editor-font-normal yoo-editor-text-gray-500 yoo-editor-ml-1">
            ({description})
          </span>
        )}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'yoo-editor-w-full yoo-editor-h-8 yoo-editor-rounded-md yoo-editor-border yoo-editor-border-gray-200 yoo-editor-flex yoo-editor-items-center yoo-editor-gap-1 yoo-editor-px-3 yoo-editor-text-sm',
              'focus:yoo-editor-outline-none focus:yoo-editor-ring-2 focus:yoo-editor-ring-blue-500 focus:yoo-editor-ring-offset-1',
            )}
          >
            <div
              className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-rounded-full yoo-editor-border yoo-editor-border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span className="yoo-editor-text-gray-600">{value}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="yoo-editor-w-48 yoo-editor-p-3">
          <div className="yoo-editor-grid yoo-editor-grid-cols-3 yoo-editor-gap-1">
            {presets.map((color) => (
              <button
                key={color}
                className={cn(
                  'yoo-editor-w-full yoo-editor-h-8 yoo-editor-rounded-md yoo-editor-border',
                  'focus:yoo-editor-outline-none focus:yoo-editor-ring-2 focus:yoo-editor-ring-blue-500 focus:yoo-editor-ring-offset-1',
                  value === color && 'yoo-editor-ring-2 yoo-editor-ring-blue-500 yoo-editor-ring-offset-1',
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

const renderPropEditor = (editor: YooEditor, propName: string, propEditor: PropEditor, element: SlateElement) => {
  const value = element.props?.[propName];

  const handleChange = (newValue: any) => {
    const elementProps = element.props || {};
    const block = Blocks.getBlock(editor, { at: editor.path.current });
    if (!block) return;

    const slate = Blocks.getBlockSlate(editor, { id: block.id });
    if (!slate) return;

    const elementPath = ReactEditor.findPath(slate, element);
    console.log('handleChange elementPath:', elementPath);

    Elements.updateElement(
      editor,
      block.id,
      {
        type: element.type,
        props: {
          ...elementProps,
          [propName]: newValue,
        },
      },
      { path: elementPath },
    );
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
  const focusedEntity = useFocusedEntity();
  const elementRef = useRef<HTMLElement | null>(null);

  const { refs, floatingStyles, update } = useFloating({
    placement: 'top',
    middleware: [offset(12), flip(), shift()],
  });

  useEffect(() => {
    if (!focusedEntity) return;

    const element = document.querySelector(`[data-element-id="${focusedEntity.element.id}"]`);

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
  }, [focusedEntity, update]);

  if (!focusedEntity) return null;

  const editorEntries = Object.entries(focusedEntity.editors || {});
  if (editorEntries.length === 0) return null;

  return (
    <Portal id="edit-element">
      <div
        ref={refs.setFloating}
        onClick={(e) => e.stopPropagation()}
        onBlur={() => {
          console.log('EditElementPropsToolbar onBlur');
        }}
        style={floatingStyles}
        className="yoo-editor-z-50 yoo-editor-w-full yoo-editor-max-w-[220px] yoo-editor-p-2 yoo-editor-bg-white yoo-editor-rounded-lg yoo-editor-shadow-lg yoo-editor-border yoo-editor-border-gray-200 yoo-editor-max-h-[264px] yoo-editor-overflow-y-auto"
      >
        <div className="yoo-editor-flex yoo-editor-flex-col yoo-editor-gap-0">
          {editorEntries.map(([propName, propEditor]) => (
            <div
              key={propName}
              className="yoo-editor-flex yoo-editor-flex-col yoo-editor-gap-2 yoo-editor-mt-2 first:yoo-editor-mt-0 first:yoo-editor-gap-0"
            >
              {renderPropEditor(editor, propName, propEditor, focusedEntity.element)}
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
};
