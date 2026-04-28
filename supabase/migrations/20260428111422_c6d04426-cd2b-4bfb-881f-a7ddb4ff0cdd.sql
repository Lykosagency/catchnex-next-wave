
CREATE TABLE public.early_access_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for early access"
ON public.early_access_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
