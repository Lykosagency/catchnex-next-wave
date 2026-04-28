import logo from "@/assets/catchnex-logo.png";

export function CatchnexLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Catchnex"
      className={`h-7 sm:h-10 w-auto block ${className}`}
    />
  );
}
