import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isValid = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);
  const showValidationError = touched && email.length > 0 && !isValid;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || loading) return;
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const disabled = submitted || loading || !isValid;

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto px-2 sm:px-0"
    >
      <div
        className={`group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 p-2 sm:p-1.5 rounded-2xl sm:rounded-full bg-white/[0.04] border backdrop-blur-md transition-colors ${
          showValidationError
            ? "border-red-500/60 focus-within:border-red-500/80"
            : "border-white/10 focus-within:border-gold/50"
        }`}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-invalid={showValidationError}
          aria-describedby="email-feedback"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@domain.com"
          disabled={submitted || loading}
          className="flex-1 bg-transparent px-4 py-3 sm:py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/70 outline-none disabled:opacity-60"
        />
        <motion.button
          type="submit"
          whileHover={!disabled ? { scale: 1.02 } : undefined}
          whileTap={!disabled ? { scale: 0.98 } : undefined}
          disabled={disabled}
          className="btn-gold-glow inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-full bg-gradient-to-b from-[oklch(0.86_0.10_88)] to-[oklch(0.72_0.13_78)] px-5 py-3 sm:py-2.5 text-sm font-medium text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitted ? (
            <>
              <Check className="size-4" /> Joined
            </>
          ) : loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              Get Early Access <ArrowRight className="size-4" />
            </>
          )}
        </motion.button>
      </div>

      <div id="email-feedback" className="mt-3 min-h-5 text-center text-xs">
        <AnimatePresence mode="wait" initial={false}>
          {showValidationError ? (
            <motion.p
              key="invalid"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="inline-flex items-center gap-1.5 text-red-400"
            >
              <AlertCircle className="size-3.5" />
              Please enter a valid email address.
            </motion.p>
          ) : serverError ? (
            <motion.p
              key="server"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-red-400"
            >
              {serverError}
            </motion.p>
          ) : submitted ? (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-gold"
            >
              You're on the list. We'll be in touch.
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground"
            >
              Limited to the first 1,000 founding members.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
