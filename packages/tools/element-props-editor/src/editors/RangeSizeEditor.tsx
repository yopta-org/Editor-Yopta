type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  options: {
    width: { label: string; min: number; max: number };
    height: { label: string; min: number; max: number };
  };
};

const RangeSizeEditor = (props: EditorProps) => {
  const { value, onChange, label, description, options } = props;
  const { width, height } = options;

  return (
    <div>
      <label>{label}</label>
      {description && <p>{description}</p>}
      <div>
        <label>{width.label}</label>
        <input type="range" value={value} min={width.min} max={width.max} onChange={(e) => onChange(e.target.value)} />
        <input type="number" value={value} min={width.min} max={width.max} onChange={(e) => onChange(e.target.value)} />
      </div>
      <div>
        <label>{height.label}</label>
        <input
          type="range"
          value={value}
          min={height.min}
          max={height.max}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="number"
          value={value}
          min={height.min}
          max={height.max}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export { RangeSizeEditor };
