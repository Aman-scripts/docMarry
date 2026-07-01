import { Hero } from "@/components/hero/Hero";
import { MaryDocSection } from "@/components/sections/MaryDocSection";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="bg-[#071f12]">
        <Hero />
      </div>
      <MaryDocSection />
    </main>
  );
}
