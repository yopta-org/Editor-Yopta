import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Size Editor
type SizeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  units: ('px' | 'rem' | '%')[];
  label: string;
  description?: string;
};

export const SizeEditor = ({ value, onChange, units, label, description }: SizeEditorProps) => {
  const numValue = parseFloat(value) || 0;
  const unit = value.replace(/[\d.]/g, '') || units[0];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${e.target.value}${unit}`);
  };

  const handleUnitChange = (newUnit: string) => {
    onChange(`${numValue}${newUnit}`);
  };

  return (
    <div className="yoo-elements-flex yoo-elements-flex-col yoo-elements-space-y-2">
      <Label className="yoo-elements-text-xs yoo-elements-font-medium yoo-elements-text-gray-700">
        {label}
        {description && (
          <span className="yoo-elements-text-xs yoo-elements-font-normal yoo-elements-text-gray-500 yoo-elements-ml-1">
            {description}
          </span>
        )}
      </Label>
      <div className="yoo-elements-flex yoo-elements-space-x-2">
        <Input
          type="number"
          value={numValue}
          onChange={handleValueChange}
          className="yoo-elements-h-8 yoo-elements-text-sm"
        />
        <Select value={unit} onValueChange={handleUnitChange}>
          <SelectTrigger className="yoo-elements-w-20 yoo-elements-h-8 yoo-elements-text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit} className="yoo-elements-text-sm">
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
