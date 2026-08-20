-- 1. Lock down public INSERT on applications (was WITH CHECK (true))
DROP POLICY IF EXISTS "Anyone can submit an application" ON public.applications;

CREATE POLICY "Anyone can submit an application"
ON public.applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND admin_notes IS NULL
  AND length(full_name) BETWEEN 1 AND 120
  AND length(email) BETWEEN 3 AND 254
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(phone) BETWEEN 5 AND 30
  AND length(brand) BETWEEN 1 AND 160
  AND length(designation) BETWEEN 1 AND 120
  AND length(revenue) BETWEEN 1 AND 80
  AND length(why) BETWEEN 1 AND 4000
  AND (website IS NULL OR length(website) <= 300)
  AND (linkedin IS NULL OR length(linkedin) <= 300)
);

-- 2. Remove public/anon execute on SECURITY DEFINER helpers
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE ALL ON FUNCTION public.grant_first_user_admin() FROM PUBLIC, anon, authenticated;

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;