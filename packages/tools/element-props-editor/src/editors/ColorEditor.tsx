import { HexColorPicker } from 'react-colorful';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { ColorPropEditor } from '@yoopta/editor';

type ColorEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  presets: ColorPropEditor['presets'];
};

export const ColorEditor = ({ value, onChange, label, description, presets }: ColorEditorProps) => {
  const [customColor, setCustomColor] = useState(value);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);

    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
      onChange(newColor);
    }
  };

  return (
    <div className="yoo-elements-flex yoo-elements-flex-col yoo-elements-space-y-2">
      <Label className="yoo-elements-text-xs yoo-elements-font-medium yoo-elements-text-gray-700">
        {label}
        {description && (
          <span className="yoo-elements-text-xs yoo-elements-font-normal yoo-elements-text-gray-500 yoo-elements-ml-1">
            ({description})
          </span>
        )}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'yoo-elements-w-full yoo-elements-h-8 yoo-elements-rounded-md yoo-elements-border yoo-elements-border-gray-200',
              'yoo-elements-flex yoo-elements-items-center yoo-elements-gap-2 yoo-elements-px-3',
              'focus:yoo-elements-outline-none focus:yoo-elements-ring-2 focus:yoo-elements-ring-blue-500',
            )}
          >
            <div
              className="yoo-elements-w-4 yoo-elements-h-4 yoo-elements-rounded-md yoo-elements-border yoo-elements-border-gray-200 yoo-elements-shadow-sm"
              style={{ backgroundColor: value }}
            />
            <span className="yoo-elements-text-sm yoo-elements-text-gray-600">{value}</span>
          </button>
        </PopoverTrigger>

        <PopoverContent className="yoo-elements-w-64 yoo-elements-p-3">
          <div className="yoo-elements-space-y-4">
            <HexColorPicker color={value} onChange={onChange} className="!yoo-elements-w-full" />

            <div className="yoo-elements-space-y-2">
              <Label className="yoo-elements-text-xs">Custom HEX Color</Label>
              <Input
                value={customColor}
                onChange={handleCustomColorChange}
                className="yoo-elements-h-8 yoo-elements-text-sm"
                placeholder="#000000"
              />
            </div>

            {Array.isArray(presets) && presets.length > 0 && (
              <div className="yoo-elements-space-y-2">
                <Label className="yoo-elements-text-xs">Common Colors</Label>
                <div className="yoo-elements-grid yoo-elements-grid-cols-5 yoo-elements-gap-1">
                  {presets.map((color) => (
                    <button
                      key={color}
                      onClick={() => onChange(color)}
                      className={cn(
                        'yoo-elements-w-full yoo-elements-h-8 yoo-elements-rounded-md yoo-elements-border',
                        'yoo-elements-transition-all hover:yoo-elements-scale-110',
                        'focus:yoo-elements-outline-none focus:yoo-elements-ring-2 focus:yoo-elements-ring-blue-500',
                        value === color && 'yoo-elements-ring-2 yoo-elements-ring-blue-500',
                      )}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
