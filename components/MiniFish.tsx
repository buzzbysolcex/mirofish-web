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
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;

      // Body (ellipse)
      ctx.beginPath();
      ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(x + size * 1.5, y);
      ctx.lineTo(x + size * 2.5, y - size * 0.8);
      ctx.lineTo(x + size * 2.5, y + size * 0.8);
      ctx.closePath();
      ctx.fill();

      // Eye
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x - size * 0.6, y - size * 0.2, size * 0.25, 0, Math.PI * 2);
      ctx.fill();

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
