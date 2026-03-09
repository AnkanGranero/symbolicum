type SliderProps = {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  displayValue?: string
}

export function Slider({ id, label, min, max, step, value, onChange, displayValue }: SliderProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <label htmlFor={id} className="text-sm text-center">{label}</label>
      <input
        id={id}
        className="vertical"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      {displayValue !== undefined && <p>{displayValue}</p>}
    </div>
  )
}
