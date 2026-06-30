import { Hero } from "@/components/hero/Hero";
import { MaryDocSection } from "@/components/sections/MaryDocSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <MaryDocSection />
    </main>
  );
}
