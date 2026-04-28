import { motion } from "framer-motion";

const points = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 35, 44, 41, 52, 48, 60];

function Sparkline() {
  const w = 520;
  const h = 140;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = w / (points.length - 1);
  const norm = (v: number) => h - ((v - min) / (max - min)) * (h - 20) - 10;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(p)}`)
    .join(" ");
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="goldLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.86 0.10 88)" />
          <stop offset="100%" stopColor="oklch(0.78 0.13 82)" />
        </linearGradient>
        <linearGradient id="goldFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.13 82 / 0.35)" />
          <stop offset="100%" stopColor="oklch(0.78 0.13 82 / 0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#goldFill)" />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#goldLine)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.6 }}
      />
    </svg>
  );
}

export function DashboardCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass-card rounded-2xl p-6 sm:p-7"
      >
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="size-2 rounded-full bg-gold shadow-[0_0_10px] shadow-gold/60" />
            <span className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Live · Portfolio
            </span>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">24h</span>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Profit
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-gradient-gold tabular-nums">
              +$24,350
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Win rate
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-foreground tabular-nums">
              68%
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Traders
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-foreground tabular-nums">
              12
            </p>
          </div>
        </div>

        {/* chart */}
        <div className="h-36 -mx-1">
          <Sparkline />
        </div>

        {/* footer row */}
        <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Auto-copy active</span>
          <span className="tabular-nums">Sharpe 2.4 · Max DD 6.1%</span>
        </div>
      </motion.div>

      {/* soft halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-10 h-40 blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.13 82 / 0.35), transparent 70%)",
        }}
      />
    </motion.div>
  );
}
