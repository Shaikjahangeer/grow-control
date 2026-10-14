DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit valid inquiries" ON public.inquiries FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(phone)) BETWEEN 5 AND 30
  AND (city IS NULL OR char_length(city) <= 120)
  AND (product IS NULL OR char_length(product) <= 200)
  AND char_length(btrim(message)) BETWEEN 1 AND 3000
);

DROP POLICY IF EXISTS "Anyone can submit applications" ON public.career_applications;
CREATE POLICY "Anyone can submit valid applications" ON public.career_applications FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 1 AND 120
  AND char_length(btrim(father_name)) BETWEEN 1 AND 120
  AND char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(phone)) BETWEEN 5 AND 30
  AND char_length(btrim(dob)) BETWEEN 1 AND 20
  AND gender IN ('Male','Female','Others')
  AND char_length(btrim(address)) BETWEEN 1 AND 500
  AND char_length(btrim(qualification)) BETWEEN 1 AND 200
  AND (department IS NULL OR department IN ('EEE','ECE','MECH','IT'))
  AND (referred IS NULL OR referred IN ('Walk-in','Referral','Social Media','Others'))
  AND (employment IS NULL OR employment IN ('Employed','Unemployed','Intern','Self-employed'))
  AND (applied_before IS NULL OR applied_before IN ('Yes','No'))
  AND char_length(btrim(message)) BETWEEN 1 AND 3000
);