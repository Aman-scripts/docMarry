"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { scaleIn } from "./variants";

export function HeroRight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-md lg:max-w-xl"
    >
      <div
        className="absolute -inset-6 rounded-[2.5rem] bg-[#D9BCA3]/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-[6px] border-card bg-card shadow-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.02]">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src="/hero-section.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute bottom-4 right-4 flex items-center gap-2.5 rounded-2xl bg-card px-3.5 py-2.5 shadow-lg">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Licensed Physicians</p>
            <p className="text-xs text-muted-foreground">Available now</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
