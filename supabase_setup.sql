-- Buat tabel portfolio_settings
CREATE TABLE portfolio_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  json_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pastikan anon key bisa membaca dan memperbarui data (untuk development ini diizinkan sementara)
-- Dalam production, Anda sebaiknya membatasi RLS (Row Level Security) agar hanya admin yang bisa UPDATE.
-- Untuk kemudahan sekarang, kita akan mendisable RLS:
ALTER TABLE portfolio_settings DISABLE ROW LEVEL SECURITY;

-- Masukkan data awal (default) agar tidak kosong
INSERT INTO portfolio_settings (json_data)
VALUES (
'{
  "profile": {
    "name": "RAGA AKBAR",
    "title": "Designer & AR Development",
    "about": "My name is Raga Akbar. I''m a third-year Informatics Engineering student...",
    "email": "rakbar@student.umrah.ac.id",
    "phone": "082372433085",
    "linkedin": "https://www.linkedin.com/in/raga-akbar-439556411/",
    "github": "racgaacbar",
    "instagram": "ragakbr"
  },
  "skills": [
    { "name": "Flutter", "level": 80 },
    { "name": "UI/UX & Design", "level": 90 }
  ],
  "education": [
    {
      "id": "edu1",
      "school": "Universitas Maritim Raja Ali Haji",
      "period": "2023 - Now",
      "description": "Currently, I am studying at Universitas Maritim Raja Ali Haji."
    }
  ],
  "experience": [
    {
      "id": "exp1",
      "company": "Nodeflux",
      "role": "Nodeflux technology Indonesia",
      "period": "References",
      "description": "Nodeflux technology Indonesia"
    }
  ],
  "projects": [
    {
      "id": "proj1",
      "title": "Portfolio Website",
      "description": "Personal portfolio website built with Next.js, Vercel Blob, and Supabase."
    }
  ],
  "articles": [
    {
      "id": "art1",
      "title": "My Journey in AR Development",
      "excerpt": "Sharing my experience learning Augmented Reality development...",
      "content": "Full content goes here...",
      "date": "2026-06-26"
    }
  ]
}'::jsonb
);
