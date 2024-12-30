import { Range } from 'react-range';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../lib/utils';
import { useState, useCallback } from 'react';
import { RangeSizePropEditor } from '@yoopta/editor';

type RangeSizeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  options: RangeSizePropEditor['options'];
  label: string;
  description?: string;
};

const RangeSizeEditor = ({ value, onChange, options, label, description }: RangeSizeEditorProps) => {
  const handleRangeChange = (values: number[]) => {
    // onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = parseInt(e.target.value, 10);

    // if (!isNaN(numberValue) && numberValue >= option.min && numberValue <= option.max) {
    // onChange(numberValue);
    // }
  };

  const renderTrack = useCallback(
    ({ props, children }) => (
      <div
        {...props}
        className={cn('yoo-elements-h-1 yoo-elements-w-full yoo-elements-rounded-full', 'yoo-elements-bg-gray-200')}
      >
        {children}
      </div>
    ),
    [],
  );

  const renderThumb = useCallback(
    ({ props }) => (
      <div
        {...props}
        className={cn(
          'yoo-elements-h-4 yoo-elements-w-4 yoo-elements-rounded-full',
          'yoo-elements-bg-white yoo-elements-border yoo-elements-border-gray-300',
          'yoo-elements-shadow-sm focus:yoo-elements-outline-none focus:yoo-elements-ring-2',
          'focus:yoo-elements-ring-blue-500 hover:yoo-elements-border-blue-500',
        )}
      />
    ),
    [],
  );

  return (
    <div className="yoo-elements-space-y-4">
      <Label className="yoo-elements-text-xs yoo-elements-font-medium yoo-elements-text-gray-700">
        {label}
        {description && (
          <span className="yoo-elements-text-xs yoo-elements-font-normal yoo-elements-text-gray-500 yoo-elements-ml-1">
            ({description})
          </span>
        )}
      </Label>

      {options.map((option) => {
        return (
          <div className="yoo-elements-space-y-2" key={option.label}>
            <div className="yoo-elements-flex yoo-elements-justify-between">
              <Label className="yoo-elements-text-xs yoo-elements-text-gray-600">{option.label}</Label>
              <Input
                type="number"
                value={value}
                onChange={handleInputChange}
                min={option.min}
                max={option.max}
                className="yoo-elements-w-20 yoo-elements-h-6 yoo-elements-text-xs"
              />
            </div>
            <Range
              values={[typeof value === 'number' ? value : +value]}
              onChange={handleRangeChange}
              min={option.min}
              max={option.max}
              renderTrack={renderTrack}
              renderThumb={renderThumb}
            />
          </div>
        );
      })}
      {/* 
      <div className="yoo-elements-space-y-2">
        <div className="yoo-elements-flex yoo-elements-justify-between">
          <Label className="yoo-elements-text-xs yoo-elements-text-gray-600">{options.width.label}</Label>
          <Input
            type="number"
            value={inputValues.width}
            onChange={handleInputChange('width')}
            min={options.width.min}
            max={options.width.max}
            className="yoo-elements-w-20 yoo-elements-h-6 yoo-elements-text-xs"
          />
        </div>
        <Range
          values={[value.width]}
          onChange={handleRangeChange('width')}
          min={options.width.min}
          max={options.width.max}
          renderTrack={renderTrack}
          renderThumb={renderThumb}
        />
      </div>

      <div className="yoo-elements-space-y-2">
        <div className="yoo-elements-flex yoo-elements-justify-between">
          <Label className="yoo-elements-text-xs yoo-elements-text-gray-600">{options.height.label}</Label>
          <Input
            type="number"
            value={inputValues.height}
            onChange={handleInputChange('height')}
            min={options.height.min}
            max={options.height.max}
            className="yoo-elements-w-20 yoo-elements-h-6 yoo-elements-text-xs"
          />
        </div>
        <Range
          values={[value.height]}
          onChange={handleRangeChange('height')}
          min={options.height.min}
          max={options.height.max}
          renderTrack={renderTrack}
          renderThumb={renderThumb}
        />
      </div> */}
    </div>
  );
};

export { RangeSizeEditor };
