import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
});

export const Route = createFileRoute("/api/early-access")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
        const SUPABASE_KEY =
          process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!SUPABASE_URL || !SUPABASE_KEY) {
          return Response.json({ error: "Server not configured" }, { status: 500 });
        }

        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = BodySchema.safeParse(json);
        if (!parsed.success) {
          return Response.json({ error: "Invalid email" }, { status: 400 });
        }

        const { email } = parsed.data;
        const userAgent = request.headers.get("user-agent") ?? "";

        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { error } = await supabase
          .from("early_access_signups")
          .insert({ email: email.toLowerCase(), user_agent: userAgent });

        if (error) {
          // Duplicate email — treat as success so users don't see an error
          if (error.code === "23505") {
            return Response.json({ ok: true, duplicate: true });
          }
          console.error("Signup insert failed", error);
          return Response.json({ error: "Could not save" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
