"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
  width: number;
  height: number;
};

export default function BeforeAfter({ before, after, alt, width, height }: Props) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromX = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // One gentle nudge on first view so people know it moves.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        if (dragging.current) return;
        const k = Math.min(1, (t - t0) / 1600);
        setPos(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting && !started) {
          started = true;
          setTimeout(run, 500);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure className="ba">
      <div
        ref={box}
        className="ba-box"
        style={{ aspectRatio: `${width} / ${height}` }}
        onPointerDown={(e) => {
          dragging.current = true;
          setTouched(true);
          e.currentTarget.setPointerCapture?.(e.pointerId);
          fromX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) fromX(e.clientX);
        }}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img
          className="ba-img"
          src={after}
          alt={`After: ${alt}`}
          width={width}
          height={height}
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
        <img
          className="ba-img ba-before"
          src={before}
          alt={`Before: ${alt}`}
          width={width}
          height={height}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          decoding="async"
          draggable={false}
        />
        <span className="ba-tag ba-tag-l" aria-hidden="true">Before</span>
        <span className="ba-tag ba-tag-r" aria-hidden="true">After</span>
        <div className="ba-line" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="ba-knob">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <input
          className="ba-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          aria-label="Drag to compare before and after"
          onChange={(e) => {
            setTouched(true);
            setPos(Number(e.target.value));
          }}
        />
      </div>
      <figcaption className={touched ? "ba-cap done" : "ba-cap"}>
        <span className="ba-hint">Drag it.</span> Same kitchen, before and after we rebuilt it.
      </figcaption>
    </figure>
  );
}
