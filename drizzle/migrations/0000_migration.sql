CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  city text CHECK (char_length(city) <= 120),
  product text CHECK (char_length(product) <= 200),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  father_name text NOT NULL CHECK (char_length(father_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  dob text NOT NULL CHECK (char_length(dob) <= 20),
  gender text NOT NULL CHECK (char_length(gender) <= 20),
  address text NOT NULL CHECK (char_length(address) BETWEEN 1 AND 500),
  qualification text NOT NULL CHECK (char_length(qualification) BETWEEN 1 AND 200),
  department text CHECK (char_length(department) <= 20),
  referred text CHECK (char_length(referred) <= 50),
  employment text CHECK (char_length(employment) <= 30),
  applied_before text CHECK (char_length(applied_before) <= 5),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.career_applications TO anon, authenticated;
GRANT ALL ON public.career_applications TO service_role;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit applications" ON public.career_applications FOR INSERT TO anon, authenticated WITH CHECK (true);