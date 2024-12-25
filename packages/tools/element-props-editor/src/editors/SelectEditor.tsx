import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type SelectEditorProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{
    label: string;
    value: string | number;
  }>;
  label: string;
  description?: string;
};

export const SelectEditor = ({ value, onChange, options, label, description }: SelectEditorProps) => {
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
      <Select value={value.toString()} onValueChange={(val) => onChange(val)}>
        <SelectTrigger className="yoo-elements-w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value.toString()} value={option.value.toString()} className="yoo-elements-text-xs">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
