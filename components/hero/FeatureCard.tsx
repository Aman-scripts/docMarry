import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  align?: "start" | "center" | "end";
}

const alignClasses: Record<NonNullable<FeatureCardProps["align"]>, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  align = "center",
}: FeatureCardProps) {
  return (
    <button
      type="button"
      aria-label={`${title}: ${description}`}
      className="group relative flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-amber-600 shadow-lg shadow-black/20 ring-1 ring-white/40 outline-none transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      <Icon className="size-5" aria-hidden="true" />

      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-full z-20 mb-3 w-48 translate-y-1 rounded-xl border border-white/10 bg-emerald-950 p-3 text-center opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
          alignClasses[align]
        )}
      >
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="mt-1 block text-xs text-emerald-100/70">{description}</span>
      </span>
    </button>
  );
}
