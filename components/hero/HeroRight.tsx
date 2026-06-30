"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HeroRight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) video.pause();
    else video.play().catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="relative mx-auto w-full"
      style={{
        mixBlendMode: "multiply",
        maskImage: [
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 30%, black 85%, transparent 100%)",
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        ].join(", "),
        WebkitMaskImage: [
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 30%, black 85%, transparent 100%)",
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        ].join(", "),
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <video
        ref={videoRef}
        className="w-full object-cover"
        style={{ aspectRatio: "4/3" }}
        src="/hero-section.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </motion.div>
  );
}
