import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  life: number;
}

export default function CometCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const points: TrailPoint[] = [];
    let pointerTarget: { x: number; y: number } | null = null;
    let head: { x: number; y: number } | null = null;
    let frame = 0;
    let pixelRatio = 1;
    let previousFrameTime = 0;

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      frame = 0;
      const delta = previousFrameTime ? Math.min(time - previousFrameTime, 40) : 16;
      previousFrameTime = time;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--comet-cursor-color')
        .trim() || getComputedStyle(document.documentElement)
          .getPropertyValue('--color-brandOrange')
          .trim() || '#e0682b';

      if (pointerTarget) {
        if (!head) head = { ...pointerTarget };
        const previousHead = { ...head };
        const smoothing = 1 - Math.exp(-delta / 42);
        head.x += (pointerTarget.x - head.x) * smoothing;
        head.y += (pointerTarget.y - head.y) * smoothing;

        const distance = Math.hypot(head.x - previousHead.x, head.y - previousHead.y);
        const steps = Math.ceil(distance / 4);
        for (let step = 1; step <= steps; step += 1) {
          const amount = step / steps;
          points.push({
            x: previousHead.x + (head.x - previousHead.x) * amount,
            y: previousHead.y + (head.y - previousHead.y) * amount,
            life: 1,
          });
        }

        if (points.length === 0) points.push({ x: head.x, y: head.y, life: 1 });
        if (points.length > 48) points.splice(0, points.length - 48);
      }

      for (let index = points.length - 1; index >= 0; index -= 1) {
        points[index].life -= delta / 680;
        if (points[index].life <= 0) points.splice(index, 1);
      }

      if (points.length > 0) {
        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.shadowColor = color;
        context.shadowBlur = 16;

        if (points.length > 1) {
          let start: { x: number; y: number } = points[0];
          for (let index = 1; index < points.length; index += 1) {
            const point = points[index];
            const next = points[index + 1];
            const end = next
              ? { x: (point.x + next.x) / 2, y: (point.y + next.y) / 2 }
              : point;
            const progress = index / (points.length - 1);
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.quadraticCurveTo(point.x, point.y, end.x, end.y);
            context.strokeStyle = color;
            context.globalAlpha = point.life * (0.1 + progress * 0.62);
            context.lineWidth = 0.8 + progress * 5.2;
            context.stroke();
            start = end;
          }
        }

        const trailHead = head ?? points[points.length - 1];
        const headLife = points[points.length - 1]?.life ?? 0;
        const halo = context.createRadialGradient(trailHead.x, trailHead.y, 0, trailHead.x, trailHead.y, 17);
        halo.addColorStop(0, color);
        halo.addColorStop(0.22, color);
        halo.addColorStop(1, 'transparent');
        context.globalAlpha = headLife;
        context.fillStyle = halo;
        context.beginPath();
        context.arc(trailHead.x, trailHead.y, 17, 0, Math.PI * 2);
        context.fill();

        context.shadowBlur = 0;
        context.fillStyle = color;
        context.beginPath();
        context.arc(trailHead.x, trailHead.y, 2.2, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      const distanceToTarget = pointerTarget && head
        ? Math.hypot(pointerTarget.x - head.x, pointerTarget.y - head.y)
        : 0;
      if (points.length > 0 || distanceToTarget > 0.5) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!event.isPrimary || event.pointerType === 'touch') return;
      pointerTarget = { x: event.clientX, y: event.clientY };
      scheduleDraw();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
