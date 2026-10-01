import { useEffect, useRef } from 'react';

/** Lightweight decorative network; drawing is capped for high-DPI screens. */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(90, Math.floor((width * height) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
      }));
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((point, index) => {
        if (!reducedMotion.matches) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < 0 || point.x > width) point.vx *= -1;
          if (point.y < 0 || point.y > height) point.vy *= -1;
        }
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distanceToPointer = Math.hypot(dx, dy);
        if (!reducedMotion.matches && distanceToPointer < 130 && distanceToPointer > 0) {
          point.x += (dx / distanceToPointer) * 0.18;
          point.y += (dy / distanceToPointer) * 0.18;
        }
        context.beginPath();
        context.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
        context.fillStyle = 'rgba(0, 162, 255, 0.55)';
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 125) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(0, 162, 255, ${(1 - distance / 125) * 0.13})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      });
      if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const movePointer = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(draw);
    };
    resize();
    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', movePointer, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    reducedMotion.addEventListener('change', visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      document.removeEventListener('visibilitychange', visibility);
      reducedMotion.removeEventListener('change', visibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-70" />;
}
