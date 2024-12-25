import { cn } from '../lib/utils';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

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

export const ColorEditor = ({ value, onChange, presets = DEFAULT_COLORS, label, description }: ColorEditorProps) => {
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
              'yoo-elements-w-full yoo-elements-h-8 yoo-elements-rounded-md yoo-elements-border yoo-elements-border-gray-200 yoo-elements-flex yoo-elements-items-center yoo-elements-gap-1 yoo-elements-px-3 yoo-elements-text-sm',
              'focus:yoo-elements-outline-none focus:yoo-elements-ring-2 focus:yoo-elements-ring-blue-500 focus:yoo-elements-ring-offset-1',
            )}
          >
            <div
              className="yoo-elements-w-4 yoo-elements-h-4 yoo-elements-rounded-full yoo-elements-border yoo-elements-border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span className="yoo-elements-text-gray-600">{value}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="yoo-elements-w-48 yoo-elements-p-3">
          <div className="yoo-elements-grid yoo-elements-grid-cols-3 yoo-elements-gap-1">
            {presets.map((color) => (
              <button
                key={color}
                className={cn(
                  'yoo-elements-w-full yoo-elements-h-8 yoo-elements-rounded-md yoo-elements-border',
                  'focus:yoo-elements-outline-none focus:yoo-elements-ring-2 focus:yoo-elements-ring-blue-500 focus:yoo-elements-ring-offset-1',
                  value === color && 'yoo-elements-ring-2 yoo-elements-ring-blue-500 yoo-elements-ring-offset-1',
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
