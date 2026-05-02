-- Add relational columns to hall_of_fame
ALTER TABLE hall_of_fame
  ADD COLUMN player_id TEXT NULL REFERENCES players(id) ON UPDATE CASCADE ON DELETE SET NULL,
  ADD COLUMN club_id TEXT NULL REFERENCES clubs(id) ON UPDATE CASCADE ON DELETE SET NULL;

CREATE INDEX idx_hof_player_id ON hall_of_fame(player_id);
CREATE INDEX idx_hof_club_id ON hall_of_fame(club_id);

-- Ensure each player appears only once in hall of fame entries
CREATE UNIQUE INDEX uq_hof_player_id ON hall_of_fame(player_id) WHERE player_id IS NOT NULL;

-- Keep hall_of_fame synchronized whenever player profile changes.
CREATE OR REPLACE FUNCTION sync_hall_of_fame_from_player()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE hall_of_fame hof
  SET
    name = NEW.name,
    image = NEW.image,
    club = c.name,
    club_id = c.id,
    updated_at = NOW()
  FROM clubs c
  WHERE hof.player_id = NEW.id
    AND c.id = NEW.club_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_hof_from_player ON players;
CREATE TRIGGER trg_sync_hof_from_player
AFTER UPDATE OF name, image, club_id ON players
FOR EACH ROW
EXECUTE FUNCTION sync_hall_of_fame_from_player();

-- Optional bootstrap for existing hall_of_fame rows by matching name.
UPDATE hall_of_fame hof
SET
  player_id = p.id,
  club_id = p.club_id,
  club = c.name,
  image = p.image,
  updated_at = NOW()
FROM players p
JOIN clubs c ON c.id = p.club_id
WHERE hof.role = 'jugador'
  AND lower(hof.name) = lower(p.name)
  AND hof.player_id IS NULL;
