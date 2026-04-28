export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -10%, oklch(0.22 0.02 80) 0%, transparent 60%), linear-gradient(180deg, oklch(0.14 0.005 80) 0%, oklch(0.10 0.004 80) 100%)",
        }}
      />

      {/* faint grid */}
      <div className="absolute inset-0 grid-faint opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* soft gold radial */}
      <div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.13 82) 0%, transparent 60%)",
        }}
      />

      {/* corner accents */}
      <div
        className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.13 82), transparent 70%)" }}
      />

      {/* noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.5] mix-blend-overlay" />
    </div>
  );
}
