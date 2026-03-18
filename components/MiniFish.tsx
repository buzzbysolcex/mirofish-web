'use client';

import { useEffect, useRef } from 'react';

const FISH_CONFIGS = [
  { color: '#00ffff', light: '#66ffff', dark: '#006666' },
  { color: '#ff0066', light: '#ff4d94', dark: '#660029' },
  { color: '#00ff88', light: '#66ffb3', dark: '#006633' },
  { color: '#ffff00', light: '#ffff66', dark: '#666600' },
  { color: '#7c3aed', light: '#a370f7', dark: '#4c1d95' },
];

interface Fish {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  light: string;
  dark: string;
  wobble: number;
  wobbleSpeed: number;
}

export default function MiniFish() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishRef = useRef<Fish[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = 44;
    canvas.width = width * 2; // retina
    canvas.height = height * 2;
    ctx.scale(2, 2);

    fishRef.current = FISH_CONFIGS.map((cfg, i) => ({
      x: (width / 6) * (i + 1),
      y: height / 2 + (Math.random() - 0.5) * 8,
      speed: 0.25 + Math.random() * 0.35,
      size: 5 + Math.random() * 2,
      ...cfg,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.015 + Math.random() * 0.02,
    }));

    function drawDroneFish(ctx: CanvasRenderingContext2D, fish: Fish) {
      const { x, y, size: s, color, light, dark } = fish;
      ctx.save();

      // === Segment 1: Nose/Head ===
      ctx.beginPath();
      ctx.moveTo(x - s * 2.2, y);          // nose tip
      ctx.lineTo(x - s * 1.2, y - s * 0.9); // top-left
      ctx.lineTo(x - s * 0.3, y - s * 0.85);
      ctx.lineTo(x - s * 0.3, y + s * 0.85);
      ctx.lineTo(x - s * 1.2, y + s * 0.9);
      ctx.closePath();
      const headGrad = ctx.createLinearGradient(x - s * 2, y - s, x - s * 2, y + s);
      headGrad.addColorStop(0, light);
      headGrad.addColorStop(1, dark);
      ctx.fillStyle = headGrad;
      ctx.globalAlpha = 0.35;
      ctx.fill();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = light;
      ctx.lineWidth = 0.4;
      ctx.stroke();

      // Head segment join line
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - s * 0.3, y - s * 0.85);
      ctx.lineTo(x - s * 0.3, y + s * 0.85);
      ctx.strokeStyle = light;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // === Segment 2: Main body ===
      ctx.beginPath();
      ctx.moveTo(x - s * 0.3, y - s * 0.85);
      ctx.lineTo(x + s * 1.0, y - s * 0.75);
      ctx.lineTo(x + s * 1.0, y + s * 0.75);
      ctx.lineTo(x - s * 0.3, y + s * 0.85);
      ctx.closePath();
      const bodyGrad = ctx.createLinearGradient(x, y - s, x, y + s);
      bodyGrad.addColorStop(0, light);
      bodyGrad.addColorStop(0.5, color);
      bodyGrad.addColorStop(1, dark);
      ctx.fillStyle = bodyGrad;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = light;
      ctx.lineWidth = 0.4;
      ctx.stroke();

      // Body circuit lines
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 0.25;
      ctx.strokeStyle = color;
      // horizontal
      ctx.beginPath();
      ctx.moveTo(x - s * 0.2, y);
      ctx.lineTo(x + s * 0.9, y);
      ctx.stroke();
      // vertical ribs
      ctx.beginPath();
      ctx.moveTo(x + s * 0.3, y - s * 0.7);
      ctx.lineTo(x + s * 0.3, y + s * 0.7);
      ctx.stroke();

      // Segment 2 join line
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = light;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x + s * 1.0, y - s * 0.75);
      ctx.lineTo(x + s * 1.0, y + s * 0.75);
      ctx.stroke();

      // === Segment 3: Tail section ===
      ctx.beginPath();
      ctx.moveTo(x + s * 1.0, y - s * 0.75);
      ctx.lineTo(x + s * 1.8, y - s * 0.4);
      ctx.lineTo(x + s * 1.8, y + s * 0.4);
      ctx.lineTo(x + s * 1.0, y + s * 0.75);
      ctx.closePath();
      ctx.fillStyle = bodyGrad;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = light;
      ctx.lineWidth = 0.35;
      ctx.stroke();

      // === Tail fin — split angular ===
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 0.35;
      // Upper fin
      ctx.beginPath();
      ctx.moveTo(x + s * 1.8, y - s * 0.3);
      ctx.lineTo(x + s * 2.5, y - s * 0.9);
      ctx.lineTo(x + s * 2.3, y - s * 0.1);
      ctx.closePath();
      ctx.fillStyle = dark;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = light;
      ctx.stroke();
      // Lower fin
      ctx.beginPath();
      ctx.moveTo(x + s * 1.8, y + s * 0.3);
      ctx.lineTo(x + s * 2.5, y + s * 0.9);
      ctx.lineTo(x + s * 2.3, y + s * 0.1);
      ctx.closePath();
      ctx.fillStyle = dark;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = light;
      ctx.stroke();

      // === Dorsal fin ===
      ctx.beginPath();
      ctx.moveTo(x - s * 0.1, y - s * 0.85);
      ctx.lineTo(x + s * 0.3, y - s * 1.4);
      ctx.lineTo(x + s * 0.7, y - s * 0.8);
      ctx.closePath();
      ctx.fillStyle = dark;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = light;
      ctx.lineWidth = 0.3;
      ctx.stroke();

      // === Glowing eye ===
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x - s * 1.4, y - s * 0.1, s * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = light;
      ctx.beginPath();
      ctx.arc(x - s * 1.4, y - s * 0.1, s * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x - s * 1.4, y - s * 0.1, s * 0.07, 0, Math.PI * 2);
      ctx.fill();

      // === Thruster dot at tail ===
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + s * 1.85, y, s * 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      for (const fish of fishRef.current) {
        fish.wobble += fish.wobbleSpeed;
        fish.x -= fish.speed;
        fish.y = (canvas.height / 4) + Math.sin(fish.wobble) * 5;

        if (fish.x < -30) {
          fish.x = (canvas.width / 2) + 30;
        }

        drawDroneFish(ctx, fish);
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="no-print"
      style={{ width: '100%', height: '44px', display: 'block', opacity: 0.7 }}
    />
  );
}
