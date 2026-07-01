"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function HeroRight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="relative mx-auto w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        loop
        muted
        playsInline
        preload="auto"
      />
    </motion.div>
  );
}
