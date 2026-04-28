import logo from "@/assets/catchnex-logo.png";

export function CatchnexLogo({ className = "h-8" }: { className?: string }) {
  return <img src={logo} alt="Catchnex" className={className} draggable={false} />;
}
