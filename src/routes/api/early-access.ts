import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SPREADSHEET_ID = "1n97EJksQx-h-BL5TUbp69ErzN-TS8kzGoVlTfjFr6Kg";
const RANGE = "Sheet1!A:C";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
});

export const Route = createFileRoute("/api/early-access")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
        if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
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
        const timestamp = new Date().toISOString();
        const userAgent = request.headers.get("user-agent") ?? "";

        const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[timestamp, email, userAgent]],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Sheets append failed", res.status, text);
          return Response.json({ error: "Could not save" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
