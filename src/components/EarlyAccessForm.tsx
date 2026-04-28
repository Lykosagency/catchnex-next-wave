import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <div className="group relative flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md transition-colors focus-within:border-gold/50">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          disabled={submitted}
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none disabled:opacity-60"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitted}
          className="btn-gold-glow inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[oklch(0.86_0.10_88)] to-[oklch(0.72_0.13_78)] px-5 py-2.5 text-sm font-medium text-primary-foreground transition-shadow disabled:opacity-80"
        >
          {submitted ? (
            <>
              <Check className="size-4" /> Joined
            </>
          ) : (
            <>
              Get Early Access <ArrowRight className="size-4" />
            </>
          )}
        </motion.button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Limited to the first 1,000 founding members.
      </p>
    </motion.form>
  );
}
