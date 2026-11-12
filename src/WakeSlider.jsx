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
      <svg
        className="wake-slider-sun"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ opacity: 0.35 + progress * 0.65 }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
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
