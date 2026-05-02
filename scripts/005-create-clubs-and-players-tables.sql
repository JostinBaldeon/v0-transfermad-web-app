-- Create clubs table
CREATE TABLE clubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  badge TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  founded_year INTEGER NOT NULL,
  stadium TEXT NOT NULL,
  league TEXT NOT NULL CHECK (league IN ('mad-league-1', 'mad-league-2')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_clubs_league ON clubs(league);
CREATE INDEX idx_clubs_name ON clubs(name);

-- Create players table
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('POR', 'DFC', 'LI', 'LD', 'MCD', 'MC', 'MCO', 'EI', 'ED', 'SD', 'DC')),
  nationality TEXT NOT NULL,
  nationality_flag TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0),
  club_id TEXT NOT NULL REFERENCES clubs(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  market_value NUMERIC(12,2) NOT NULL CHECK (market_value >= 0),
  foot TEXT NOT NULL CHECK (foot IN ('derecho', 'izquierdo', 'ambos')),
  height INTEGER NOT NULL CHECK (height > 0),
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  matches INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  is_legend BOOLEAN NOT NULL DEFAULT FALSE,
  market_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  club_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_players_club_id ON players(club_id);
CREATE INDEX idx_players_name ON players(name);
CREATE INDEX idx_players_is_legend ON players(is_legend);

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to clubs"
  ON clubs FOR SELECT USING (true);

CREATE POLICY "Allow public read access to players"
  ON players FOR SELECT USING (true);
