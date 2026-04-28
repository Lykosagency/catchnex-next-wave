import { motion } from "framer-motion";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-gold/[0.18]",
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
      initial={{ opacity: 0, y: -120, rotate: rotate - 12 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.1 },
      }}
      className={`absolute ${className ?? ""}`}
    >
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-gold/[0.12] shadow-[0_8px_32px_0_oklch(0.78_0.13_82_/_0.08)] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -10%, oklch(0.22 0.02 80) 0%, transparent 60%), linear-gradient(180deg, oklch(0.14 0.005 80) 0%, oklch(0.09 0.004 80) 100%)",
        }}
      />

      {/* warm gold haze behind everything */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-transparent to-gold-deep/[0.04] blur-3xl" />

      {/* floating elegant shapes */}
      <ElegantShape
        delay={0.3}
        width={620}
        height={150}
        rotate={12}
        gradient="from-gold/[0.16]"
        className="left-[-12%] md:left-[-6%] top-[14%] md:top-[18%]"
      />
      <ElegantShape
        delay={0.5}
        width={520}
        height={130}
        rotate={-15}
        gradient="from-gold-deep/[0.18]"
        className="right-[-8%] md:right-[-4%] top-[68%] md:top-[72%]"
      />
      <ElegantShape
        delay={0.4}
        width={320}
        height={85}
        rotate={-8}
        gradient="from-gold-soft/[0.14]"
        className="left-[4%] md:left-[8%] bottom-[8%] md:bottom-[12%]"
      />
      <ElegantShape
        delay={0.6}
        width={220}
        height={60}
        rotate={20}
        gradient="from-gold/[0.18]"
        className="right-[14%] md:right-[20%] top-[12%] md:top-[16%]"
      />
      <ElegantShape
        delay={0.7}
        width={160}
        height={45}
        rotate={-25}
        gradient="from-gold-soft/[0.16]"
        className="left-[22%] md:left-[28%] top-[6%] md:top-[10%]"
      />

      {/* faint grid */}
      <div className="absolute inset-0 grid-faint opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />

      {/* top + bottom vignette to keep luxury depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70 pointer-events-none" />

      {/* noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.45] mix-blend-overlay" />
    </div>
  );
}
