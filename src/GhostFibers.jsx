import React, { useEffect, useRef } from "react";

function drawFibers(ctx, width, height, time, options, pointer, pulses) {
  const {
    backgroundColor, glowColor, lineColor, secondaryColor, layers, twist,
    threads, depthOfField, fiberStyle, waves, volume, spread, rotation,
    density, thickness, tips, foldGlow, flow, focusDepth, particles,
    sparkle, brightness, vignette, grain, mouseStrength, pulseSpeed,
    lightMode,
  } = options;
  const dimension = Math.max(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const angle = rotation * Math.PI / 180;
  const pointerX = pointer.active ? pointer.x : centerX;
  const pointerY = pointer.active ? pointer.y : centerY;
  const lightness = lightMode ? 0.58 : 1;
  const strokeCount = Math.max(12, Math.round(threads * density));

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  ctx.translate(-centerX, -centerY);
  ctx.lineCap = fiberStyle === "dots" ? "round" : "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = lightMode ? "source-over" : "screen";

  for (let layer = 0; layer < layers; layer += 1) {
    const layerProgress = layers === 1 ? 0 : layer / (layers - 1);
    const layerOffset = (layerProgress - 0.5) * spread * height * 0.36;
    const blur = Math.max(0, (1 - Math.abs(layerProgress - focusDepth)) * depthOfField * 5);
    const amplitude = height * (0.09 + layerProgress * 0.035) * waves;
    const layerTime = time * (0.35 + flow * 0.9) * (layer % 2 ? -1 : 1);

    ctx.save();
    ctx.shadowBlur = blur + foldGlow * 8;
    ctx.shadowColor = glowColor;

    for (let index = 0; index < strokeCount; index += 1) {
      const progress = index / Math.max(1, strokeCount - 1);
      const baseX = progress * width;
      const drift = Math.sin(progress * Math.PI * 2 * twist + layerTime) * amplitude;
      const mouseDistance = Math.hypot(baseX - pointerX, centerY - pointerY);
      const mouseEffect = pointer.active
        ? Math.max(0, 1 - mouseDistance / (dimension * 0.45)) * mouseStrength * height * 0.045
        : 0;
      const phase = progress * Math.PI * 2 * twist + layerTime + layer * 1.7;
      const x = centerX + (baseX - centerX) * (0.85 + spread * 0.15);
      const y = centerY + layerOffset + drift + Math.sin(phase * 0.6) * mouseEffect;
      const controlOffset = Math.sin(phase + time * pulseSpeed) * amplitude * 0.5;
      const emphasized = Math.max(0, 1 - Math.abs(progress - 0.5) * 1.8);
      const alpha = Math.min((0.2 + volume * 0.42 + emphasized * foldGlow * 0.2) * lightness, 0.88);
      const color = (index + layer) % 4 === 0 ? secondaryColor : lineColor;

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.7, thickness * (0.55 + emphasized * 1.2) * (1 + layerProgress * 0.35));

      if (fiberStyle === "dots") {
        const dotSpacing = Math.max(5, 12 - volume * 5);
        for (let point = 0; point <= dotSpacing; point += 1) {
          const t = point / dotSpacing;
          const dotX = x + (t - 0.5) * dimension * 0.38;
          const curveY = y + Math.sin(t * Math.PI * 2 + phase) * amplitude * 0.34
            + Math.cos(t * Math.PI + phase) * controlOffset * 0.35;
          const dotRadius = Math.max(0.7, (0.8 + sparkle * 1.4) * (1 - Math.abs(t - 0.5) * 0.55));
          ctx.beginPath();
          ctx.arc(dotX, curveY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(x - dimension * 0.25, y + amplitude * 0.2);
        ctx.bezierCurveTo(
          x - dimension * 0.12, y - controlOffset - amplitude,
          x + dimension * 0.12, y + controlOffset + amplitude,
          x + dimension * 0.25, y - amplitude * 0.2,
        );
        ctx.stroke();
      }

      if (tips > 0 && (index % Math.max(1, Math.floor(threads / 8)) === 0)) {
        ctx.globalAlpha = alpha * tips;
        ctx.fillStyle = glowColor;
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + sparkle * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
  ctx.restore();

  pulses.forEach((pulseEvent) => {
    const elapsed = performance.now() - pulseEvent.time;
    const progress = Math.min(elapsed / 1000, 1);
    const radius = dimension * progress * 0.42;
    ctx.globalAlpha = (1 - progress) * 0.8;
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 1 + sparkle * 2;
    ctx.beginPath();
    ctx.arc(pulseEvent.x, pulseEvent.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  });

  if (particles > 0) {
    for (let index = 0; index < 36; index += 1) {
      const phase = index * 2.4 + time * (0.2 + flow);
      const x = ((index * 7919) % 997) / 997 * width + Math.sin(phase) * 12;
      const y = ((index * 6271) % 991) / 991 * height + Math.cos(phase) * 10;
      ctx.globalAlpha = particles * (0.15 + (Math.sin(phase * 1.8) + 1) * 0.18);
      ctx.fillStyle = index % 3 ? lineColor : glowColor;
      ctx.beginPath();
      ctx.arc(x, y, 0.7 + sparkle * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (vignette > 0) {
    const shade = ctx.createRadialGradient(centerX, centerY, dimension * 0.16, centerX, centerY, dimension * 0.72);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(1, `rgba(${lightMode ? "50,62,90" : "0,0,0"},${vignette * (lightMode ? 0.14 : 0.42)})`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  }

  if (grain > 0) {
    ctx.globalAlpha = grain;
    ctx.fillStyle = lightMode ? "#283854" : "#ffffff";
    for (let index = 0; index < 90; index += 1) {
      ctx.fillRect(((index * 7919) % 997) / 997 * width, ((index * 6271) % 991) / 991 * height, 1, 1);
    }
  }
}

export default function GhostFibers({
  backgroundColor = "#100d18",
  glowColor = "#8b5cf6",
  layers = 3,
  twist = 1.2,
  threads = 72,
  fiberStyle = "dots",
  depthOfField = 0.85,
  hoverEffect = "focus",
  intro = true,
  mouseInteraction = true,
  lineColor = "#dfd1fc",
  secondaryColor = "#6f4ac5",
  gradient = "depth",
  waves = 1,
  volume = 0.7,
  spread = 1,
  scale = 1,
  rotation = 18,
  perspective = 0.65,
  density = 1,
  thickness = 1,
  tips = 0,
  foldGlow = 1,
  speed = 0.5,
  flow = 0.4,
  rollSpeed = 0.15,
  focusDepth = 0,
  particles = 0.5,
  sparkle = 0.5,
  glow = 0.8,
  brightness = 1,
  vignette = 0.3,
  grain = 0.06,
  mouseStrength = 1,
  pulseOnClick = true,
  lightMode = false,
}) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const pulsesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return undefined;

    let width = 1;
    let height = 1;
    let frameId;
    let lastFrame = 0;
    let elapsed = 0;
    let introStarted = performance.now();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const options = {
      backgroundColor, glowColor, lineColor, secondaryColor, layers, twist,
      threads, depthOfField, fiberStyle, waves, volume, spread, scale,
      rotation, perspective, density, thickness, tips, foldGlow, flow,
      focusDepth, particles, sparkle, glow, brightness, vignette, grain,
      mouseStrength, speed, rollSpeed, lightMode,
    };

    const draw = (time, pulses = pulsesRef.current) => {
      drawFibers(ctx, width, height, time, options, pointerRef.current, pulses);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(1, Math.round(bounds.width * dpr));
      height = Math.max(1, Math.round(bounds.height * dpr));
      canvas.width = width;
      canvas.height = height;
      draw(elapsed, []);
      canvas.style.opacity = String(intro && !motionPreference.matches ? 0 : 1);
    };
    const pointFromEvent = (event) => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      return { x: (event.clientX - bounds.left) * dpr, y: (event.clientY - bounds.top) * dpr };
    };
    const insideCanvas = (event) => {
      const bounds = canvas.getBoundingClientRect();
      return event.clientX >= bounds.left && event.clientX <= bounds.right
        && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    };
    const handlePointerMove = (event) => {
      pointerRef.current = mouseInteraction && insideCanvas(event)
        ? { ...pointFromEvent(event), active: true }
        : { ...pointerRef.current, active: false };
    };
    const handlePointerDown = (event) => {
      if (!pulseOnClick || !insideCanvas(event)) return;
      pulsesRef.current.push({ ...pointFromEvent(event), time: performance.now() });
      pulsesRef.current = pulsesRef.current.slice(-3);
    };
    const render = (now) => {
      frameId = undefined;
      if (motionPreference.matches) return;
      if (now - lastFrame < 33) {
        frameId = window.requestAnimationFrame(render);
        return;
      }
      const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
      lastFrame = now;
      elapsed += delta * speed;
      draw(elapsed);
      if (intro) canvas.style.opacity = String(Math.min((now - introStarted) / 900, 1));
      pulsesRef.current = pulsesRef.current.filter((item) => now - item.time < 1000);
      frameId = window.requestAnimationFrame(render);
    };
    const handleMotionChange = () => {
      if (motionPreference.matches) {
        if (frameId !== undefined) window.cancelAnimationFrame(frameId);
        frameId = undefined;
        draw(0, []);
        canvas.style.opacity = "1";
      } else if (frameId === undefined) {
        lastFrame = 0;
        frameId = window.requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    motionPreference.addEventListener("change", handleMotionChange);
    if (!motionPreference.matches) frameId = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      motionPreference.removeEventListener("change", handleMotionChange);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [
    backgroundColor, brightness, depthOfField, density, fiberStyle, flow, focusDepth,
    foldGlow, glow, glowColor, grain, gradient, intro, layers, lightMode,
    lineColor, mouseInteraction, mouseStrength, particles, perspective, pulseOnClick,
    rollSpeed, rotation, scale, secondaryColor, speed, sparkle, spread, threads,
    thickness, tips, twist, vignette, volume, waves, hoverEffect,
  ]);

  return <canvas className="ghost-fibers-canvas" ref={canvasRef} aria-hidden="true" />;
}
