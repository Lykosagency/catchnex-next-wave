import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
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

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5 + i * 0.2, ease },
  }),
};

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
        <CatchnexLogo className="h-10 sm:h-11" />
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Coming Soon
          </span>
        </div>
      </motion.header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-6 pb-20 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-gold/[0.18] mb-8 md:mb-10 backdrop-blur-md"
        >
          <Circle className="h-2 w-2 fill-gold text-gold" />
          <span className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Premium crypto copy trading
          </span>
        </motion.div>

        {/* Title — split with serif accent */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-[-0.02em] leading-[0.95] max-w-5xl"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
            Next copy trading
          </span>
          <br />
          <span className="text-gradient-gold italic">generation</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed font-light tracking-wide px-4"
        >
          The future of automated wealth. Copy top traders.
          Scale your capital — effortlessly.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 w-full"
        >
          <EarlyAccessForm />
        </motion.div>

        {/* Globe */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-20 sm:mt-24 w-full max-w-xl mx-auto relative"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.78 0.13 82 / 0.25), transparent 65%)",
            }}
          />
          <GlobePulse className="relative z-10" />
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
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
