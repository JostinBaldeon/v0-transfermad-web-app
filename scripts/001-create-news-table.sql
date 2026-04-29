-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  category TEXT NOT NULL CHECK (category IN ('premios', 'actualizacion', 'temporada', 'records', 'fichajes')),
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  author TEXT NOT NULL,
  related_news TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_news_slug ON news(slug);

-- Create index on published_at for sorting
CREATE INDEX idx_news_published_at ON news(published_at DESC);

-- Create index on category for filtering
CREATE INDEX idx_news_category ON news(category);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access to news" 
  ON news 
  FOR SELECT 
  USING (true);
