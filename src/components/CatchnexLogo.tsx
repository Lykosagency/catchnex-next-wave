import logo from "@/assets/catchnex-logo.png";

export function CatchnexLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Catchnex"
      className={className}
      style={{ height: "55px", width: "auto" }}
    />
  );
}
