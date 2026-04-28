"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 0.6 },
      }}
      className={cn("absolute will-change-transform", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-gold/[0.15]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,oklch(1_0_0_/_0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

interface HeroGeometricProps {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  children?: React.ReactNode;
}

export function HeroGeometric({
  badge = "Catchnex",
  title1 = "Next copy trading",
  title2 = "generation",
  description = "The future of automated wealth. Copy top traders. Scale your capital — effortlessly.",
  children,
}: HeroGeometricProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.05] via-transparent to-gold-deep/[0.05]" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-gold/[0.18]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-gold/[0.18]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-gold-soft/[0.18]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-0">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-gold/[0.2] mb-6 sm:mb-8 md:mb-12 transition-colors hover:border-gold/50"
          >
            <Circle className="h-2 w-2 fill-gold text-gold" />
            <span className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/60">
              {badge}
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18, delayChildren: 0.6 } },
            }}
            className="text-[2.25rem] sm:text-5xl md:text-6xl font-semibold mb-6 md:mb-8 tracking-[-0.035em] leading-[1.05]"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
              className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            >
              {title1}
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
              className="block relative"
            >
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, oklch(0.62 0.13 70) 0%, oklch(0.78 0.13 82) 25%, oklch(0.96 0.04 88) 50%, oklch(0.78 0.13 82) 75%, oklch(0.62 0.13 70) 100%)",
                  backgroundSize: "200% 100%",
                }}
              >
                {title2}
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>

          {children && (
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80 pointer-events-none" />
    </div>
  );
}
