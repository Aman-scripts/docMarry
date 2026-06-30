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
    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mx-auto w-full"
      style={{
        maskImage:
          "radial-gradient(ellipse 92% 82% at 56% 46%, black 30%, rgba(0,0,0,0.55) 52%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 92% 82% at 56% 46%, black 30%, rgba(0,0,0,0.55) 52%, transparent 72%)",
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
