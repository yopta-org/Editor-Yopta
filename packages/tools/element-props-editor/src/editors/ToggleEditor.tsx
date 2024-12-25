import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

type ToggleEditorProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
};

export const ToggleEditor = ({ value, onChange, label, description }: ToggleEditorProps) => {
  return (
    <div className="yoo-elements-flex yoo-elements-items-center yoo-elements-justify-between yoo-elements-space-x-2">
      <Label className="yoo-elements-text-xs yoo-elements-font-medium yoo-elements-text-gray-700">
        {label}
        {description && (
          <span className="yoo-elements-text-xs yoo-elements-font-normal yoo-elements-text-gray-500 yoo-elements-ml-1">
            ({description})
          </span>
        )}
      </Label>
      <Switch checked={value} onCheckedChange={onChange} className="data-[state=checked]:yoo-elements-bg-blue-600" />
    </div>
  );
};
