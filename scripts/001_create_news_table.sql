-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('premios', 'actualizacion', 'temporada', 'records', 'fichajes')),
  published_at DATE NOT NULL,
  author TEXT NOT NULL,
  related_news TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);

-- Enable RLS (for public read access)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow public read access to news
CREATE POLICY "Allow public read access to news" ON public.news
  FOR SELECT
  USING (true);
