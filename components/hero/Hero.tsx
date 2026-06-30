"use client";

import { MotionConfig } from "framer-motion";
import { HeroLeft } from "./HeroLeft";
import { HeroRight } from "./HeroRight";

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Healthcare that understands you"
        className="relative overflow-hidden rounded-b-[2rem] bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 py-14 sm:rounded-b-[2.5rem] sm:py-20"
      >
        <div
          className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <HeroLeft />
          <HeroRight />
        </div>
      </section>
    </MotionConfig>
  );
}
