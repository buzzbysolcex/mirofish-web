'use client';

import { useEffect, useRef } from 'react';

const FISH_COLORS = ['#00ffff', '#ff00ff', '#00ff88', '#ffff00', '#7c3aed'];

interface Fish {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
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
    const height = 40;
    canvas.width = width;
    canvas.height = height;

    // Initialize 5 small fish
    fishRef.current = FISH_COLORS.map((color, i) => ({
      x: (width / 6) * (i + 1),
      y: height / 2 + (Math.random() - 0.5) * 10,
      speed: 0.3 + Math.random() * 0.4,
      size: 4 + Math.random() * 3,
      color,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
    }));

    let frame = 0;

    function drawFish(ctx: CanvasRenderingContext2D, fish: Fish) {
      const { x, y, size, color } = fish;
      const s = size;
      ctx.save();

      // Angular mechanical body — outer hull
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(x - s * 1.8, y);
      ctx.lineTo(x - s, y - s);
      ctx.lineTo(x + s * 1.2, y - s * 0.7);
      ctx.lineTo(x + s * 2, y);
      ctx.lineTo(x + s * 1.2, y + s * 0.7);
      ctx.lineTo(x - s, y + s);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.7;
      ctx.stroke();

      // Circuit line through body
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.moveTo(x - s, y);
      ctx.lineTo(x + s * 1.2, y);
      ctx.stroke();

      // Tail fin — angular struts
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(x + s * 1.8, y);
      ctx.lineTo(x + s * 2.6, y - s * 0.7);
      ctx.moveTo(x + s * 1.8, y);
      ctx.lineTo(x + s * 2.6, y + s * 0.7);
      ctx.stroke();

      // Glowing eye
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x - s * 0.8, y - s * 0.15, s * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Eye ring
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.arc(x - s * 0.8, y - s * 0.15, s * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const fish of fishRef.current) {
        fish.wobble += fish.wobbleSpeed;
        fish.x -= fish.speed;
        fish.y = height / 2 + Math.sin(fish.wobble) * 6;

        // Wrap around
        if (fish.x < -20) {
          fish.x = canvas.width + 20;
        }

        drawFish(ctx, fish);
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="no-print"
      style={{ width: '100%', height: '40px', display: 'block', opacity: 0.6 }}
    />
  );
}
