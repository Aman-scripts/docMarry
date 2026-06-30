"use client";

import { useEffect, useRef, useState } from "react";

const MARY = "Mary";
const DOC = "Doc";

export function MaryDocSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maryChars, setMaryChars] = useState(0);
  const [docChars, setDocChars] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(0);
  const [descOpacity, setDescOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = el.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // progress: 0 → container top hits viewport top
      //           1 → container bottom hits viewport bottom
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

      // 0.00 – 0.30 → Mary types
      const maryP = Math.max(0, Math.min(1, progress / 0.30));
      setMaryChars(Math.round(maryP * MARY.length));

      // 0.35 – 0.45 → descriptions fade in
      const descP = Math.max(0, Math.min(1, (progress - 0.35) / 0.10));
      setDescOpacity(descP);

      // 0.45 – 0.75 → Doc types
      const docP = Math.max(0, Math.min(1, (progress - 0.45) / 0.30));
      setDocChars(Math.round(docP * DOC.length));

      // 0.80 – 1.00 → tagline fades in
      const tagP = Math.max(0, Math.min(1, (progress - 0.80) / 0.20));
      setTaglineOpacity(tagP);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Tall container gives scroll room; content is sticky inside
    <div ref={containerRef} style={{ height: "300vh" }}>
      <section className="sticky top-0 flex h-screen items-center justify-center bg-[#0d3b22] px-6 lg:px-12">
        <div className="w-full max-w-[1100px]">

          {/* Mary + Doc row */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-8 lg:gap-16">

            {/* Mary */}
            <div className="flex flex-col items-center text-center">
              <h2
                className="mb-6 text-7xl font-bold text-[#86c8a0] lg:text-8xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", minHeight: "1.15em" }}
              >
                {MARY.split("").map((char, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      opacity: i < maryChars ? 1 : 0,
                      filter: i < maryChars ? "blur(0px)" : "blur(6px)",
                      transition: "opacity 0.12s ease, filter 0.12s ease",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              <p
                className="max-w-[220px] text-sm leading-relaxed text-white/60"
                style={{ opacity: descOpacity, transition: "opacity 0.3s ease" }}
              >
                For the plant people have quietly relied on for generations.
              </p>
            </div>

            {/* Plus */}
            <div
              className="mt-6 text-2xl font-light text-white/30 lg:mt-8"
              style={{ opacity: maryChars === MARY.length ? 1 : 0, transition: "opacity 0.3s ease" }}
            >
              +
            </div>

            {/* Doc */}
            <div className="flex flex-col items-center text-center">
              <h2
                className="mb-6 text-7xl font-bold text-[#86c8a0] lg:text-8xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", minHeight: "1.15em" }}
              >
                {DOC.split("").map((char, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      opacity: i < docChars ? 1 : 0,
                      filter: i < docChars ? "blur(0px)" : "blur(6px)",
                      transition: "opacity 0.12s ease, filter 0.12s ease",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              <p
                className="max-w-[240px] text-sm leading-relaxed text-white/60"
                style={{
                  opacity: docChars === DOC.length ? descOpacity : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                For the licensed physicians who should always stand between a patient and their care.
              </p>
            </div>

          </div>

          {/* Tagline */}
          <p
            className="mx-auto mt-16 max-w-2xl text-center text-lg italic leading-relaxed text-white/70 lg:text-xl"
            style={{ opacity: taglineOpacity, transition: "opacity 0.2s ease" }}
          >
            Put together, it&apos;s the whole promise — real medicine, real doctors, no shame.
          </p>

        </div>
      </section>
    </div>
  );
}
