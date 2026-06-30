"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About Us", href: "#about" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-emerald-950 px-4 pt-4 pb-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <header className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-sm">
          <Link href="/" className="flex shrink-0 items-center rounded-md bg-white px-2 py-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-one.svg" alt="MaryDoc" className="h-6 w-auto sm:h-7" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold tracking-wide text-emerald-100/80 uppercase transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="#"
              className="text-xs font-bold tracking-wide text-emerald-100/80 uppercase transition-colors hover:text-white"
            >
              Patient Login
            </a>
            <Button className="gap-1.5 rounded-full bg-emerald-400 px-5 text-xs font-bold tracking-wide text-emerald-950 uppercase hover:bg-emerald-300">
              Book Consultation
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex items-center justify-center rounded-lg p-2 text-white lg:hidden"
          >
            {open ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </header>

        {open && (
          <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm lg:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-xs font-bold tracking-wide text-emerald-100/80 uppercase"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="text-xs font-bold tracking-wide text-emerald-100/80 uppercase"
              >
                Patient Login
              </a>
              <Button className="w-full justify-center gap-1.5 rounded-full bg-emerald-400 text-xs font-bold tracking-wide text-emerald-950 uppercase hover:bg-emerald-300">
                Book Consultation
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
