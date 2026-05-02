-- Create hall_of_fame table
CREATE TABLE hall_of_fame (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('jugador', 'tecnico')),
  club TEXT NOT NULL,
  image TEXT,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  seasons TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_hall_of_fame_role ON hall_of_fame(role);
CREATE INDEX idx_hall_of_fame_name ON hall_of_fame(name);

ALTER TABLE hall_of_fame ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to hall_of_fame"
  ON hall_of_fame
  FOR SELECT
  USING (true);
