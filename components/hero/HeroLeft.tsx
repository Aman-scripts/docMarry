"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const words = ["listen", "consult", "treat", "heal"];
const gradientColors = ["#8C876D", "#c4956a", "#6b7c4e", "#D9BCA3", "#8C876D"];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;
  const DURATION = 500;
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates((prev) => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        const hex2rgb = (hex: string) => [
          parseInt(hex.slice(1, 3), 16),
          parseInt(hex.slice(3, 5), 16),
          parseInt(hex.slice(5, 7), 16),
        ];
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "#205934",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function HeroLeft({ isVisible }: { isVisible: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-7">

      {/* Status badge */}
      <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#016430]/25 bg-[#016430]/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#016430]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#01b459]" />
          Licensed Physicians · HIPAA Compliant
        </span>
      </div>

      {/* Heading */}
      <h1
        className={`text-[clamp(2.8rem,4.5vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-[#1a1714] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="block">Real care, doctors</span>
        <span className="block">
          that{" "}
          <span className="inline-block whitespace-nowrap">
            <BlurWord word={words[wordIndex]} trigger={wordIndex} />
          </span>
        </span>
      </h1>

      {/* Description */}
      <p
        className={`max-w-md text-lg leading-relaxed text-[#5a5040] transition-all duration-700 delay-150 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        MaryDoc exists to make safe, legal, dignified access to medical cannabis something anyone can reach.
      </p>

      {/* CTA buttons */}
      <div
        className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Button
          size="lg"
          className="h-14 rounded-full bg-[#016430] px-10 text-base font-semibold text-white shadow-lg shadow-[#016430]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#014d24]"
        >
          Book Consultation
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 rounded-full border-2 border-[#016430] bg-transparent px-10 text-base font-semibold text-[#016430] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#016430]/10"
        >
          Learn More
        </Button>
      </div>

      {/* Trust line */}
      <div
        className={`flex items-center gap-2 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="h-px w-6 bg-[#3a3428]" />
        <p className="text-sm font-medium text-[#3a3428]">
          Trusted by patients across more than{" "}
          <span className="font-bold text-[#016430]">30 states</span>.
        </p>
      </div>

    </div>
  );
}
