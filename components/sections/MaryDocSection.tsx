"use client";

import { Dancing_Script } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing",
});

export function MaryDocSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maryRef = useRef<SVGTextElement>(null);
  const docRef = useRef<SVGTextElement>(null);

  const [maryLen, setMaryLen] = useState(0);
  const [docLen, setDocLen] = useState(0);
  const [maryOffset, setMaryOffset] = useState(9999);
  const [docOffset, setDocOffset] = useState(9999);
  const [descOpacity, setDescOpacity] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(0);

  // Measure actual stroke lengths after font loads
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (maryRef.current) {
        const len = maryRef.current.getComputedTextLength() * 5;
        setMaryLen(len);
        setMaryOffset(len);
      }
      if (docRef.current) {
        const len = docRef.current.getComputedTextLength() * 5;
        setDocLen(len);
        setDocOffset(len);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el || !maryLen || !docLen) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / scrollable));

      // 0.00–0.40 → Mary draws
      const maryP = Math.max(0, Math.min(1, p / 0.40));
      setMaryOffset(maryLen * (1 - maryP));

      // 0.40–0.55 → descriptions fade in
      setDescOpacity(Math.max(0, Math.min(1, (p - 0.40) / 0.12)));

      // 0.50–0.88 → Doc draws
      const docP = Math.max(0, Math.min(1, (p - 0.50) / 0.38));
      setDocOffset(docLen * (1 - docP));

      // 0.88–1.00 → tagline fades in
      setTaglineOpacity(Math.max(0, Math.min(1, (p - 0.88) / 0.12)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maryLen, docLen]);

  const maryDone = maryOffset <= 0.5;
  const docDone = docOffset <= 0.5;

  return (
    <div ref={containerRef} className={dancing.variable} style={{ height: "320vh" }}>
      <section className="sticky top-0 flex h-screen items-center justify-center bg-[#0d3b22] px-6 lg:px-12">
        <div className="w-full max-w-[1100px]">

          {/* Mary + Doc row */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-16">

            {/* Mary */}
            <div className="flex flex-col items-center gap-6 text-center">
              <svg
                viewBox="0 0 380 130"
                className="w-full overflow-visible"
                height={130}
              >
                <text
                  ref={maryRef}
                  x="10"
                  y="105"
                  fontWeight="700"
                  fontSize="100"
                  stroke="#86c8a0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    strokeDasharray: maryLen || 9999,
                    strokeDashoffset: maryOffset,
                    fill: maryDone ? "#86c8a0" : "transparent",
                    transition: "fill 0.6s ease",
                  }}
                >
                  Mary
                </text>
              </svg>
              <p
                className="max-w-[220px] text-sm leading-relaxed text-white/60"
                style={{ opacity: maryDone ? descOpacity : 0, transition: "opacity 0.5s ease" }}
              >
                For the plant people have quietly relied on for generations.
              </p>
            </div>

            {/* + */}
            <div
              className="text-2xl font-light text-white/30"
              style={{ opacity: maryDone ? 1 : 0, transition: "opacity 0.4s ease" }}
            >
              +
            </div>

            {/* Doc */}
            <div className="flex flex-col items-center gap-6 text-center">
              <svg
                viewBox="0 0 260 130"
                className="w-full overflow-visible"
                height={130}
              >
                <text
                  ref={docRef}
                  x="10"
                  y="105"
                  fontWeight="700"
                  fontSize="100"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    strokeDasharray: docLen || 9999,
                    strokeDashoffset: docOffset,
                    fill: docDone ? "#86c8a0" : "transparent",
                    transition: "fill 0.6s ease",
                  }}
                  stroke="#86c8a0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  Doc
                </text>
              </svg>
              <p
                className="max-w-[240px] text-sm leading-relaxed text-white/60"
                style={{ opacity: docDone ? descOpacity : 0, transition: "opacity 0.5s ease" }}
              >
                For the licensed physicians who should always stand between a patient and their care.
              </p>
            </div>

          </div>

          {/* Tagline */}
          <p
            className="mx-auto mt-16 max-w-2xl text-center text-lg italic leading-relaxed text-white/70 lg:text-xl"
            style={{ opacity: taglineOpacity, transition: "opacity 0.3s ease" }}
          >
            Put together, it&apos;s the whole promise — real medicine, real doctors, no shame.
          </p>

        </div>
      </section>
    </div>
  );
}
