import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CatchnexLogo } from "@/components/CatchnexLogo";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const GlobePulse = lazy(() =>
  import("@/components/ui/cobe-globe-pulse").then((m) => ({ default: m.GlobePulse })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catchnex — Next copy trading generation" },
      {
        name: "description",
        content:
          "The future of automated wealth. Copy top traders. Scale your capital. Join the Catchnex early access.",
      },
      { property: "og:title", content: "Catchnex — Next copy trading generation" },
      {
        property: "og:description",
        content:
          "Premium crypto copy trading. Copy top traders. Scale your capital.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-foreground overflow-x-hidden">
      {/* Navbar overlay */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-12 py-4 sm:py-6"
      >
        <a href="/" className="hover-glow-gold inline-flex items-center" aria-label="Catchnex home">
          <CatchnexLogo />
        </a>
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-white/[0.03] px-2.5 sm:px-3 h-7 sm:h-8 backdrop-blur-md transition-colors hover:border-gold/40">
          <span className="size-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/60 leading-none">
            Coming Soon
          </span>
        </div>
      </motion.header>

      <HeroGeometric
        badge="Premium crypto copy trading"
        title1="Next copy trading"
        title2="generation"
        description="The future of automated wealth. Copy top traders. Scale your capital — effortlessly."
      >
        <EarlyAccessForm />
      </HeroGeometric>

      {/* Globe section */}
      <section className="relative bg-[#0A0A0A] px-4 sm:px-6 -mt-8 sm:-mt-16 pb-12 sm:pb-20">
        <div className="relative max-w-xl mx-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-2xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.78 0.13 82 / 0.25), transparent 65%)",
            }}
          />
          <LazyGlobe />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5 bg-[#0A0A0A]">
        <p className="text-[11px] sm:text-xs text-white/50 text-center sm:text-left">
          © {new Date().getFullYear()} Catchnex — All rights reserved.
        </p>
        <p className="text-[11px] sm:text-xs text-white/50 tracking-wider text-center sm:text-right">
          Built for traders who don't wait.
        </p>
      </footer>
    </div>
  );
}

