import React, { useEffect, useRef } from "react";

function parseHexColor(hex) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value;
  const number = Number.parseInt(normalized, 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

function drawField(ctx, width, height, time, options, pointer) {
  const {
    gradientFrom, gradientTo, dotRadius, dotSpacing, cursorRadius,
    bulgeStrength, glowRadius, pattern, glowColor, gradientAngle, twist,
    glowIntensity, baseOpacity, waveAmplitude, sparkle, lightMode,
  } = options;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
  const spacing = Math.max(4, dotSpacing * dpr);
  const radius = Math.max(0.5, dotRadius * dpr);
  const angle = gradientAngle * Math.PI / 180;
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  const gradientSpan = Math.max(1, Math.abs(width * directionX) + Math.abs(height * directionY));
  const from = parseHexColor(gradientFrom);
  const to = parseHexColor(gradientTo);
  const glow = parseHexColor(glowColor);
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const centerX = width / 2;
  const centerY = height / 2;
  const pointerX = pointer.active ? pointer.x : -spacing * 2;
  const pointerY = pointer.active ? pointer.y : -spacing * 2;
  const cursorRange = cursorRadius * dpr;
  const glowRange = glowRadius * dpr;
  const pressedScale = pointer.held && pointer.holdToZoom ? 1.7 : 1;
  const colorAt = (t) => from.map((channel, index) => Math.round(channel + (to[index] - channel) * t));

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.fillStyle = lightMode ? "#283854" : "#ffffff";

  for (let row = 0; row <= rows; row += 1) {
    for (let column = 0; column <= cols; column += 1) {
      const baseX = column * spacing;
      const baseY = row * spacing;
      const dx = baseX - centerX;
      const dy = baseY - centerY;
      const phase = dx * directionX + dy * directionY;
      const t = Math.max(0, Math.min(1, 0.5 + phase / gradientSpan));
      const rgb = colorAt(t);
      const distance = Math.hypot(baseX - pointerX, baseY - pointerY);
      const bulge = pointer.active ? Math.max(0, 1 - distance / cursorRange) * bulgeStrength : 0;
      const localWave = waveAmplitude > 0
        ? Math.sin(dx * 0.012 + dy * 0.01 + time * 1.2) * waveAmplitude * dpr
        : 0;
      const spiral = pointer.active && twist !== 0
        ? Math.atan2(dy, dx) * twist * bulge * spacing * 0.35
        : 0;
      const x = baseX + (pointer.active && distance > 0 ? (dx / distance) * bulge * spacing * 0.7 : 0) + localWave;
      const y = baseY + (pointer.active && distance > 0 ? (dy / distance) * bulge * spacing * 0.7 : 0) + spiral + localWave;
      const halo = pointer.active ? Math.max(0, 1 - distance / glowRange) * glowIntensity : 0;
      const dotSize = radius * pressedScale * (1 + bulge * 0.7 + halo * 0.45);
      const variation = 0.88 + ((Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1 + 1) % 1 * 0.2;

      ctx.globalAlpha = Math.min(1, baseOpacity * variation + halo * 0.32);
      ctx.fillStyle = halo > 0.08
        ? `rgb(${glow.map((channel, index) => Math.round(channel * halo + rgb[index] * (1 - halo))).join(",")})`
        : `rgb(${rgb.join(",")})`;
      ctx.shadowBlur = (2.5 + halo * 3) * dpr;
      ctx.shadowColor = halo > 0.2
        ? glowColor
        : `rgb(${rgb.map((channel) => Math.round(channel * 0.82)).join(",")})`;

      if (pattern === "grid") {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(x - dotSize, y - dotSize, dotSize * 2, dotSize * 2);
      }

      if (sparkle && halo > 0.75) {
        ctx.globalAlpha = halo;
        ctx.fillStyle = glowColor;
        ctx.fillRect(x - dotSize * 2, y - 0.5 * dpr, dotSize * 4, dpr);
        ctx.fillRect(x - 0.5 * dpr, y - dotSize * 2, dpr, dotSize * 4);
      }
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

export default function DotField({
  gradientFrom = "#5227FF",
  gradientTo = "#FF9FFC",
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 240,
  bulgeStrength = 0.6,
  glowRadius = 160,
  pattern = "grid",
  glowColor = "#ffffff",
  gradientAngle = 135,
  twist = 0,
  glowIntensity = 0.8,
  baseOpacity = 0.55,
  waveAmplitude = 0,
  speed = 1,
  sparkle = false,
  interactive = true,
  holdToZoom = true,
  intro = true,
  lightMode = false,
}) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false, held: false, holdToZoom });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return undefined;

    let width = 1;
    let height = 1;
    let elapsed = 0;
    let lastFrame = 0;
    let frameId;
    const startedAt = performance.now();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const options = {
      gradientFrom, gradientTo, dotRadius, dotSpacing, cursorRadius,
      bulgeStrength, glowRadius, pattern, glowColor, gradientAngle, twist,
      glowIntensity, baseOpacity, waveAmplitude, sparkle, lightMode,
    };
    const draw = () => drawField(ctx, width, height, elapsed, options, pointerRef.current);
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(1, Math.round(bounds.width * dpr));
      height = Math.max(1, Math.round(bounds.height * dpr));
      canvas.width = width;
      canvas.height = height;
      draw();
      canvas.style.opacity = String(intro && !motionPreference.matches ? 0 : 1);
    };
    const setPointer = (event, held = pointerRef.current.held) => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
        && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      pointerRef.current = interactive && inside
        ? { x: (event.clientX - bounds.left) * dpr, y: (event.clientY - bounds.top) * dpr, active: true, held, holdToZoom }
        : { ...pointerRef.current, active: false, held: false };
    };
    const handlePointerMove = (event) => setPointer(event);
    const handlePointerDown = (event) => setPointer(event, true);
    const handlePointerUp = () => { pointerRef.current.held = false; };
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
      draw();
      if (intro) canvas.style.opacity = String(Math.min((now - startedAt) / 1000, 1));
      frameId = window.requestAnimationFrame(render);
    };
    const handleMotionChange = () => {
      if (motionPreference.matches) {
        if (frameId !== undefined) window.cancelAnimationFrame(frameId);
        frameId = undefined;
        draw();
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
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    motionPreference.addEventListener("change", handleMotionChange);
    if (!motionPreference.matches) frameId = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      motionPreference.removeEventListener("change", handleMotionChange);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [
    baseOpacity, bulgeStrength, cursorRadius, dotRadius, dotSpacing,
    glowColor, glowIntensity, glowRadius, gradientAngle, gradientFrom, gradientTo,
    holdToZoom, interactive, intro, lightMode, pattern, sparkle, speed, twist,
    waveAmplitude,
  ]);

  return <canvas className="dot-field-canvas" ref={canvasRef} aria-hidden="true" />;
}
