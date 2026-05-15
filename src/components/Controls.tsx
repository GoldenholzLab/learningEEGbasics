import type { CSSProperties } from "react";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  displayValue?: string;
  accentColor?: string;
  onChange: (value: number) => void;
};

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  displayValue,
  accentColor,
  onChange,
}: SliderProps) {
  const fillPercent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <label
      className="control"
      style={
        {
          "--slider-color": accentColor,
          "--slider-fill-percent": `${fillPercent}%`,
        } as CSSProperties
      }
    >
      <span>
        {label}
        <strong>
          {displayValue ?? `${value}${unit}`}
        </strong>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({ label, value, options, onChange }: SegmentedProps<T>) {
  return (
    <fieldset className="segmented">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            className={option.value === value ? "selected" : ""}
            type="button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
