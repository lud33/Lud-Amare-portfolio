import React, { useEffect, useRef, useState } from "react";

function getOffset(index, activeIndex, length) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export default function CircularCarousel({
  items,
  activeIndex,
  motionStartIndex,
  motionKey,
  onChange,
  onSelect,
  onOpen,
  onPhotoClick,
  isPaused = false,
  cardWidth = 220,
  interval = 3,
  direction = "left",
  pauseOnHover = true,
  focusOnClick = true,
  draggable = true,
  tilt = 0,
  perspective = 1800,
  depthFade = 0.55,
  cornerRadius = 12,
  isActive = true,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef(null);
  const cylinderRef = useRef(null);
  const cardRefs = useRef([]);
  const dragStart = useRef(null);
  const didDrag = useRef(false);
  const rotation = 360 / items.length;
  const visibleCardWidth = stageWidth ? Math.min(cardWidth, stageWidth * 0.78) : cardWidth;
  const radius = items.length === 2
    ? visibleCardWidth * 0.85
    : Math.max(visibleCardWidth * 0.8, (visibleCardWidth / 2) / Math.tan(Math.PI / items.length));
  useEffect(() => {
    if (!stageRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (items.length < 2 || prefersReducedMotion || !isActive) return undefined;
    let reportedIndex = motionStartIndex;
    const cycleDuration = interval * items.length * 1000;
    const stepDuration = interval * 1000;
    const directionStep = direction === "left" ? 1 : -1;
    let frameId;
    const updateFrontImage = () => {
      const animation = cylinderRef.current?.getAnimations()[0];
      const elapsed = animation?.currentTime;
      if (typeof elapsed === "number" && Number.isFinite(elapsed)) {
        const cycleProgress = (elapsed % cycleDuration) / stepDuration;
        const step = Math.floor(cycleProgress);
        const nextIndex = (motionStartIndex + directionStep * step + items.length) % items.length;
        const virtualCenter = motionStartIndex + directionStep * cycleProgress;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const offset = ((index - virtualCenter + items.length / 2) % items.length + items.length) % items.length - items.length / 2;
          const proximity = Math.max(0, 1 - Math.abs(offset) * Math.max(depthFade, 0.01));
          const focus = proximity * proximity * (3 - 2 * proximity);
          card.style.opacity = String(0.3 + focus * 0.7);
          card.style.filter = `brightness(${1 + focus * 0.12})`;
        });

        if (nextIndex !== reportedIndex) {
          reportedIndex = nextIndex;
          onChange(nextIndex);
        }
      }
      frameId = window.requestAnimationFrame(updateFrontImage);
    };
    frameId = window.requestAnimationFrame(updateFrontImage);
    return () => window.cancelAnimationFrame(frameId);
  }, [depthFade, direction, interval, isActive, items.length, motionKey, motionStartIndex, onChange, prefersReducedMotion]);

  const handlePointerDown = (event) => {
    if (!draggable || event.button !== 0) return;
    dragStart.current = { x: event.clientX, pointerId: event.pointerId };
    didDrag.current = false;
    event.target.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!dragStart.current) return;
    const distance = event.clientX - dragStart.current.x;
    if (Math.abs(distance) > 30) {
      didDrag.current = true;
      const directionDelta = distance < 0 ? 1 : -1;
      onChange((activeIndex + directionDelta + items.length) % items.length);
    }
    dragStart.current = null;
  };

  return (
    <div
      ref={stageRef}
      className="carousel-stage"
      style={{
        "--carousel-perspective": `${perspective}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { dragStart.current = null; }}
      onClick={(event) => {
        if (didDrag.current) {
          event.preventDefault();
          event.stopPropagation();
          didDrag.current = false;
        }
      }}
    >
      <div
        ref={cylinderRef}
        key={motionKey}
        className="carousel-cylinder"
        style={{
          "--carousel-cycle": `${interval * items.length}s`,
          "--carousel-start-angle": `${-motionStartIndex * rotation}deg`,
          "--carousel-end-angle": `${-motionStartIndex * rotation + (direction === "left" ? -360 : 360)}deg`,
          animation: prefersReducedMotion ? "none" : undefined,
          animationPlayState: !isActive || isPaused || (pauseOnHover && isHovered) ? "paused" : "running",
        }}
      >
        {items.map((item, index) => {
          const offset = getOffset(index, activeIndex, items.length);
          const isActive = offset === 0;
          return (
            <button
              ref={(element) => { cardRefs.current[index] = element; }}
              className={`carousel-card${isActive ? " is-active" : ""}`}
              key={item.screen}
              type="button"
              aria-label={isActive ? `Open ${item.screen} screenshot` : `Show ${item.screen} screenshot`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                if (didDrag.current) {
                  didDrag.current = false;
                  return;
                }
                onPhotoClick();
                if (isActive) onOpen(index);
                else if (focusOnClick) onSelect(index);
              }}
              style={{
                "--card-width": `${visibleCardWidth}px`,
                "--carousel-radius": `${radius}px`,
                "--carousel-card-angle": `${index * rotation}deg`,
                "--carousel-tilt": `${tilt}deg`,
                "--card-radius": `${cornerRadius}px`,
                "--card-scale": isPaused && isActive ? 1.06 : 1,
              }}
            >
              <img src={item.src} alt={item.alt} draggable="false" loading="lazy" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
