export function CatchnexLogo({ className = "h-9" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="cnx-mark" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.92 0.08 88)" />
            <stop offset="55%" stopColor="oklch(0.78 0.13 82)" />
            <stop offset="100%" stopColor="oklch(0.62 0.13 70)" />
          </linearGradient>
        </defs>
        <path
          d="M16 2 L29 9 L29 23 L16 30 L3 23 L3 9 Z"
          stroke="url(#cnx-mark)"
          strokeWidth="1.6"
          fill="oklch(0.78 0.13 82 / 0.06)"
        />
        <path
          d="M21.5 12.5 C20.2 11 18.3 10 16 10 C12.7 10 10 12.7 10 16 C10 19.3 12.7 22 16 22 C18.3 22 20.2 21 21.5 19.5"
          stroke="url(#cnx-mark)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className="font-display text-2xl tracking-[-0.01em] leading-none text-foreground"
        style={{ fontWeight: 500 }}
      >
        Catch<span className="text-gradient-gold italic">nex</span>
      </span>
    </div>
  );
}
