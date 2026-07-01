"use client";

import { Dancing_Script } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing",
});

// Straight line length for our plus (viewBox 0 0 80 80, lines span 64px each)
const PLUS_LEN = 64;

export function MaryDocSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maryRef = useRef<SVGTextElement>(null);
  const docRef = useRef<SVGTextElement>(null);

  const [maryLen, setMaryLen] = useState(0);
  const [docLen, setDocLen] = useState(0);
  const [maryOffset, setMaryOffset] = useState(9999);
  const [docOffset, setDocOffset] = useState(9999);
  const [maryDescOpacity, setMaryDescOpacity] = useState(0);
  const [docDescOpacity, setDocDescOpacity] = useState(0);
  // Plus: vertical draws first, then horizontal
  const [plusOpacity, setPlusOpacity] = useState(0);
  const [plusVOffset, setPlusVOffset] = useState(PLUS_LEN);
  const [plusHOffset, setPlusHOffset] = useState(PLUS_LEN);
  const [taglineOpacity, setTaglineOpacity] = useState(0);

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

      // 0.40–0.52 → Mary description fades in
      setMaryDescOpacity(Math.max(0, Math.min(1, (p - 0.40) / 0.12)));

      // 0.36–0.38 → plus container fades in
      setPlusOpacity(Math.max(0, Math.min(1, (p - 0.36) / 0.04)));

      // 0.38–0.44 → vertical stroke draws top→bottom
      const plusVP = Math.max(0, Math.min(1, (p - 0.38) / 0.06));
      setPlusVOffset(PLUS_LEN * (1 - plusVP));

      // 0.44–0.50 → horizontal stroke draws left→right
      const plusHP = Math.max(0, Math.min(1, (p - 0.44) / 0.06));
      setPlusHOffset(PLUS_LEN * (1 - plusHP));

      // 0.50–0.88 → Doc draws
      const docP = Math.max(0, Math.min(1, (p - 0.50) / 0.38));
      setDocOffset(docLen * (1 - docP));

      // 0.88–1.00 → Doc description fades in
      setDocDescOpacity(Math.max(0, Math.min(1, (p - 0.88) / 0.10)));

      // 0.90–1.00 → Tagline fades in
      setTaglineOpacity(Math.max(0, Math.min(1, (p - 0.90) / 0.10)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maryLen, docLen]);

  const maryDone = maryOffset <= 0.5;
  const docDone = docOffset <= 0.5;
  const plusDone = plusVOffset <= 0.5 && plusHOffset <= 0.5;

  return (
    <div ref={containerRef} className={dancing.variable} style={{ height: "320vh" }}>
      <section
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 lg:px-12"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, #1a5c35 0%, #0d3b22 55%, #071f12 100%)",
        }}
      >
        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#86c8a0]/[0.06] blur-3xl" />
          <div className="absolute -right-40 bottom-1/3 h-[500px] w-[500px] rounded-full bg-[#86c8a0]/[0.06] blur-3xl" />
          <div className="absolute left-1/2 -top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#016430]/25 blur-3xl" />
          <div className="absolute left-1/2 bottom-0 h-48 w-96 -translate-x-1/2 rounded-full bg-[#86c8a0]/[0.04] blur-2xl" />
        </div>

        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #86c8a0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#071f12]/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071f12]/60 to-transparent" />

        <div className="relative w-full max-w-[1100px]">

          {/* Section label */}
          <div
            className="mb-10 flex justify-center"
            style={{ opacity: maryDescOpacity, transition: "opacity 0.6s ease" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#86c8a0]/25 bg-[#86c8a0]/[0.07] px-6 py-2 text-sm font-bold uppercase tracking-widest text-white/85">
              <span className="size-2 rounded-full bg-white/60" />
              The name behind the mission
            </span>
          </div>

          {/* Mary + Doc row */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-8 lg:gap-16">

            {/* Mary */}
            <div className="flex flex-col items-start">
              <div className="flex h-[185px] w-full items-end justify-start">
                <div
                  style={{
                    filter: maryDone ? "drop-shadow(0 0 32px rgba(134,200,160,0.28))" : "none",
                    transition: "filter 1s ease",
                    width: "100%",
                  }}
                >
                  <svg viewBox="0 0 490 160" className="max-w-full overflow-visible" height={160}>
                    <text
                      ref={maryRef}
                      x="10"
                      y="138"
                      fontWeight="700"
                      fontSize="130"
                      stroke="#86c8a0"
                      strokeWidth="2"
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
                </div>
              </div>

              <div
                className="mt-6 flex min-h-[110px] flex-col items-start gap-3"
                style={{ opacity: maryDescOpacity, transition: "opacity 0.5s ease" }}
              >
                <span className="h-px w-10 bg-gradient-to-r from-[#86c8a0]/50 to-transparent" />
                <p className="max-w-[260px] text-left text-base leading-relaxed text-white/60">
                  For the plant people have quietly relied on for generations.
                </p>
                <span className="mt-auto rounded-full border border-[#86c8a0]/20 bg-[#86c8a0]/[0.06] px-5 py-1.5 text-sm font-bold uppercase tracking-widest text-white/90">
                  The Plant
                </span>
              </div>
            </div>

            {/* Plus — hand-drawn stroke by stroke */}
            <div
              className="flex flex-col items-center gap-2 mt-[4px] pt-10"
              style={{ opacity: plusOpacity }}
            >
              <span className="h-10 w-px bg-gradient-to-b from-transparent to-[#86c8a0]/20" />

              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border border-[#86c8a0]/25 bg-[#86c8a0]/[0.06]"
                style={{
                  boxShadow: plusDone
                    ? "0 0 36px rgba(134,200,160,0.22), inset 0 0 20px rgba(134,200,160,0.08)"
                    : "inset 0 0 16px rgba(134,200,160,0.04)",
                  transition: "box-shadow 0.8s ease",
                }}
              >
                {/* viewBox 0 0 80 80 — vertical: (40,8)→(40,72), horizontal: (8,40)→(72,40) */}
                <svg width="56" height="56" viewBox="0 0 80 80" fill="none">
                  {/* Vertical stroke — draws top to bottom */}
                  <line
                    x1="40" y1="8" x2="40" y2="72"
                    stroke="#86c8a0"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeOpacity="0.7"
                    style={{
                      strokeDasharray: PLUS_LEN,
                      strokeDashoffset: plusVOffset,
                    }}
                  />
                  {/* Horizontal stroke — draws left to right */}
                  <line
                    x1="8" y1="40" x2="72" y2="40"
                    stroke="#86c8a0"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeOpacity="0.7"
                    style={{
                      strokeDasharray: PLUS_LEN,
                      strokeDashoffset: plusHOffset,
                    }}
                  />
                </svg>
              </div>

              <span className="h-10 w-px bg-gradient-to-t from-transparent to-[#86c8a0]/20" />
            </div>

            {/* Doc — mirrors Mary but right-anchored */}
            <div className="flex flex-col items-end">
              <div className="flex h-[185px] w-full items-end justify-end">
                <div
                  style={{
                    filter: docDone ? "drop-shadow(0 0 32px rgba(134,200,160,0.28))" : "none",
                    transition: "filter 1s ease",
                    width: "100%",
                  }}
                >
                  <svg viewBox="0 0 340 160" className="w-full overflow-visible" height={160}>
                    <text
                      ref={docRef}
                      x="330"
                      y="138"
                      textAnchor="end"
                      fontWeight="700"
                      fontSize="130"
                      stroke="#86c8a0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        fontFamily: "var(--font-dancing)",
                        strokeDasharray: docLen || 9999,
                        strokeDashoffset: docOffset,
                        fill: docDone ? "#86c8a0" : "transparent",
                        transition: "fill 0.6s ease",
                      }}
                    >
                      Doc
                    </text>
                  </svg>
                </div>
              </div>

              <div
                className="mt-6 flex min-h-[110px] flex-col items-end gap-3"
                style={{ opacity: docDescOpacity, transition: "opacity 0.5s ease" }}
              >
                <span className="h-px w-10 bg-gradient-to-l from-[#86c8a0]/50 to-transparent" />
                <p className="text-right text-base leading-relaxed text-white/60">
                  For the licensed physicians who should<br />stand between a patient and their care.
                </p>
                <span className="mt-auto rounded-full border border-[#86c8a0]/20 bg-[#86c8a0]/[0.06] px-5 py-1.5 text-sm font-bold uppercase tracking-widest text-white/90">
                  The Doctor
                </span>
              </div>
            </div>

          </div>

          {/* Tagline */}
          <div
            className="mx-auto mt-10 max-w-2xl text-center"
            style={{ opacity: taglineOpacity, transition: "opacity 0.4s ease" }}
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#86c8a0]/20" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86c8a0]/50">
                Together
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#86c8a0]/20" />
            </div>
            <p className="text-lg italic leading-relaxed text-white/60 lg:text-xl">
              Put together, it&apos;s the whole promise —{" "}
              <span className="font-semibold not-italic text-[#86c8a0]/85">real medicine</span>,{" "}
              <span className="font-semibold not-italic text-[#86c8a0]/85">real doctors</span>, no shame.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
