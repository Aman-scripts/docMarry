"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FeatureCard } from "./FeatureCard";
import { fadeUp, staggerContainer } from "./variants";

const headingLines = ["Real Doctors.", "Real Conversations.", "Real Relief."];

const features = [
  {
    icon: Shield,
    title: "Licensed Physicians",
    description: "Board-certified doctors ready to help",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "HIPAA-compliant and fully confidential",
  },
  {
    icon: Award,
    title: "State Compliant",
    description: "Every visit meets state regulations",
  },
  {
    icon: MessageCircle,
    title: "Personalized Care",
    description: "Treatment plans tailored to you",
  },
];

export function HeroLeft() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-7"
    >
      <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        {headingLines.map((line, i) => (
          <motion.span
            key={line}
            variants={fadeUp}
            transition={{ delay: i * 0.15 }}
            className={cn(
              "block whitespace-nowrap",
              i === headingLines.length - 1 && "text-emerald-300"
            )}
          >
            {line}
          </motion.span>
        ))}
      </h1>

      <motion.p variants={fadeUp} className="max-w-xl text-emerald-100/70">
        Connect with licensed physicians online and get the medical guidance
        you need to live a better, more comfortable life.
      </motion.p>

      <motion.div variants={fadeUp} className="flex items-center gap-4">
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            align={i === 0 ? "start" : i === features.length - 1 ? "end" : "center"}
          />
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-nowrap items-stretch gap-3 pt-2 sm:gap-4">
        <Button
          size="lg"
          variant="outline"
          className="h-12 min-w-0 flex-1 basis-1/2 justify-center rounded-full border-2 border-white/30 bg-white/5 px-2 text-center text-sm font-semibold whitespace-normal text-white transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 hover:text-white sm:h-14 sm:flex-initial sm:basis-auto sm:px-8 sm:text-base sm:whitespace-nowrap"
        >
          Learn More
        </Button>
        <Button
          size="lg"
          className="h-12 min-w-0 flex-1 basis-1/2 justify-center rounded-full bg-emerald-400 px-2 text-center text-sm font-semibold whitespace-normal text-emerald-950 shadow-lg shadow-emerald-400/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 sm:h-14 sm:flex-initial sm:basis-auto sm:px-8 sm:text-base sm:whitespace-nowrap"
        >
          Book Consultation
        </Button>
      </motion.div>
    </motion.div>
  );
}
