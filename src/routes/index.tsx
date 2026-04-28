import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { CatchnexLogo } from "@/components/CatchnexLogo";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";

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

const ease = [0.22, 1, 0.36, 1] as const;

function Index() {
  return (
    <div className="relative min-h-screen flex flex-col text-foreground">
      <Background />

      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6"
      >
        <CatchnexLogo className="h-7 sm:h-8" />
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Coming Soon
          </span>
        </div>
      </motion.header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] tracking-[0.18em] uppercase text-muted-foreground backdrop-blur-md"
        >
          <span className="text-gold">◆</span> Premium crypto copy trading
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[1.02] max-w-4xl"
        >
          Next copy trading{" "}
          <span className="text-gradient-gold italic font-medium">generation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          The future of automated wealth. Copy top traders.
          Scale your capital — effortlessly.
        </motion.p>

        <div className="mt-10 w-full">
          <EarlyAccessForm />
        </div>

        <div className="mt-20 sm:mt-24 w-full max-w-xl mx-auto relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.78 0.13 82 / 0.25), transparent 65%)",
            }}
          />
          <GlobePulse className="relative z-10" />
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative z-10 px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5"
      >
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Catchnex — All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground tracking-wider">
          Built for traders who don't wait.
        </p>
      </motion.footer>
    </div>
  );
}
