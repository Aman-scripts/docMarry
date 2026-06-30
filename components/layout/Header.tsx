"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Services",     href: "#services"      },
  { name: "Pricing",      href: "#pricing"       },
  { name: "Security",     href: "#security"      },
  { name: "About",        href: "#about"         },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#F2F2F2]/90 backdrop-blur-xl border border-[#8C876D]/20 rounded-2xl shadow-lg shadow-[#8C876D]/10 max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 transition-all duration-500 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-one.svg" alt="MaryDoc" className="h-9 w-auto sm:h-11" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-sm font-medium text-[#3a3428] transition-colors duration-300 hover:text-[#1a1714]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#1a1714] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-5 md:flex">
            <Button
              className={`rounded-full bg-[#016430] text-white shadow-lg shadow-[#016430]/25 transition-all duration-500 hover:bg-[#014d24] ${
                isScrolled ? "h-9 px-5 text-xs" : "h-11 px-7 text-sm"
              }`}
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#2a2620] md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F2F2F2] transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col px-8 pb-8 pt-28">
          {/* Staggered nav links */}
          <div className="flex flex-1 flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-bold text-[#2a2620] transition-all duration-500 hover:text-[#8C876D] ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div
            className={`flex gap-4 border-t border-[#8C876D]/20 pt-8 transition-all duration-500 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              className="h-14 flex-1 rounded-full bg-[#016430] text-base text-white hover:bg-[#014d24]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
