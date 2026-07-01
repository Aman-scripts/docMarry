"use client";

import { useEffect, useState } from "react";
import { HeroLeft } from "./HeroLeft";
import { HeroRight } from "./HeroRight";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      aria-label="Healthcare that understands you"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem]"
      style={{
        background: "linear-gradient(135deg, #F2F2F2 0%, #F2E4D8 100%)",
        boxShadow: "0 20px 60px rgba(100, 85, 60, 0.22)",
      }}
    >
      {/* Two-column content */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-start gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-32">
        <HeroLeft isVisible={isVisible} />
        <HeroRight />
      </div>
    </section>
  );
}
