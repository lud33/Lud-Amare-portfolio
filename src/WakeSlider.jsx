import React, { useState } from "react";

export default function WakeSlider({
  min,
  max,
  step,
  bars,
  height,
  restHeight,
  gap,
  fillColor,
  trackColor,
  sensitivity,
  reach,
  skew,
  glide,
  smoothing,
  showValue,
  value,
  phase,
  onChange,
  disabled,
}) {
  const [sliderValue, setSliderValue] = useState(value);
  const [wakePosition, setWakePosition] = useState(null);
  const progress = (sliderValue - min) / (max - min);
  const activeBar = progress * (bars - 1);

  return (
    <div
      className="wake-slider"
      style={{
        "--wake-height": `${height}px`,
        "--wake-gap": `${gap}px`,
        "--wake-fill": fillColor,
        "--wake-track": trackColor,
        "--wake-smoothing": `${smoothing}ms`,
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setWakePosition(((event.clientX - bounds.left) / bounds.width) * (bars - 1));
      }}
      onPointerLeave={() => setWakePosition(null)}
    >
      <div className="wake-slider-bars" aria-hidden="true">
        {Array.from({ length: bars }, (_, index) => {
          const distance = wakePosition === null ? 0 : Math.abs(index - wakePosition);
          const wake = wakePosition === null || distance > reach
            ? 0
            : Math.pow(1 - distance / reach, skew) * sensitivity;
          const wave = 0.3 + ((Math.sin(index * glide + 1) + 1) / 2) * 0.45;
          const barHeight = restHeight + (height - restHeight) * Math.min(wave + wake * 0.25, 1);

          return (
            <span
              className={`wake-slider-bar${index <= activeBar ? " is-filled" : ""}`}
              key={index}
              style={{ height: `${barHeight}px` }}
            />
          );
        })}
      </div>
      <input
        className="wake-slider-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        aria-label={`Appearance: ${phase}`}
        aria-valuetext={`${phase}, ${sliderValue} percent`}
        onChange={(event) => {
          const nextValue = Number(event.target.value);
          setSliderValue(nextValue);
          onChange(nextValue);
        }}
        disabled={disabled}
      />
      {showValue && <output className="wake-slider-value">{value}</output>}
    </div>
  );
}
