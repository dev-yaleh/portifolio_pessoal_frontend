import { useEffect, useState } from 'react';

interface TypedTextProps {
  lines: ReadonlyArray<{ text: string; className?: string }>;
  startDelay?: number;
  typingSpeed?: number;
  erasingSpeed?: number;
  holdDuration?: number;
  restartDelay?: number;
}

export default function TypedText({
  lines,
  startDelay = 0,
  typingSpeed = 120,
  erasingSpeed = 85,
  holdDuration = 3000,
  restartDelay = 3000,
}: TypedTextProps) {
  const [visibleText, setVisibleText] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const fullText = lines.map((line) => line.text).join('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      setVisibleText(fullText);
      return;
    }

    setReducedMotion(false);
    setVisibleText('');
    let timer = 0;
    let cancelled = false;

    const eraseNext = (position: number) => {
      if (cancelled) return;
      const nextPosition = position - 1;
      setVisibleText(fullText.slice(0, nextPosition));

      if (nextPosition > 0) {
        timer = window.setTimeout(() => eraseNext(nextPosition), erasingSpeed);
      } else {
        timer = window.setTimeout(() => typeNext(0), restartDelay);
      }
    };

    const typeNext = (position: number) => {
      if (cancelled) return;
      if (position >= fullText.length) {
        timer = window.setTimeout(() => eraseNext(position), holdDuration);
        return;
      }

      const nextPosition = position + 1;
      setVisibleText(fullText.slice(0, nextPosition));
      timer = window.setTimeout(() => typeNext(nextPosition), typingSpeed);
    };

    timer = window.setTimeout(() => typeNext(0), startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [erasingSpeed, fullText, holdDuration, restartDelay, startDelay, typingSpeed]);

  let offset = 0;
  return (
    <span aria-hidden="true">
      {lines.map((line, index) => {
        const start = offset;
        const end = start + line.text.length;
        const lineText = visibleText.slice(start, end);
        const isActiveLine = visibleText.length >= start && visibleText.length < end;
        const showEndCursor = visibleText.length === fullText.length && index === lines.length - 1;
        offset = end;

        return (
          <span key={`${line.text}-${index}`} className={`block ${line.className ?? ''}`}>
            <span className="inline-grid align-top">
              <span className="invisible col-start-1 row-start-1 whitespace-pre">{line.text}</span>
              <span className="col-start-1 row-start-1 whitespace-pre">
                {lineText}
                {!reducedMotion && (isActiveLine || showEndCursor) && (
                  <span className="ml-[0.06em] inline-block h-[0.72em] w-[0.045em] translate-y-[0.04em] animate-pulse bg-current" />
                )}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
