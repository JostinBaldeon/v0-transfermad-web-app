-- Insert hall of fame data
INSERT INTO hall_of_fame (id, name, role, club, image, achievements, stats, seasons, description)
VALUES
(
  'messi-hof',
  'Lionel Messi',
  'jugador',
  'FC Madrid Central',
  '/players/messi.jpg',
  ARRAY['3x MVP de la Mad League', '2x Campeón de Liga', 'Máximo goleador histórico', 'Balón de Oro Mad League'],
  '[{"label":"Goles","value":"823"},{"label":"Asistencias","value":"375"},{"label":"Partidos","value":"1.048"},{"label":"Títulos","value":"8"}]'::jsonb,
  'T33 - Actual',
  'Considerado por muchos como el mejor jugador de todos los tiempos, Messi ha traído su magia a la Mad League, demostrando que su clase es eterna.'
),
(
  'ronaldo-hof',
  'Cristiano Ronaldo',
  'jugador',
  'Atlético Norte',
  '/players/ronaldo.jpg',
  ARRAY['2x MVP de la Mad League', '1x Campeón de Liga', '2x Pichichi de la Liga', 'Récord de hat-tricks'],
  '[{"label":"Goles","value":"900"},{"label":"Asistencias","value":"245"},{"label":"Partidos","value":"1.215"},{"label":"Hat-tricks","value":"65"}]'::jsonb,
  'T33 - Actual',
  'La máquina de goles portuguesa sigue demostrando su increíble capacidad goleadora y su mentalidad ganadora en cada partido.'
),
(
  'neymar-hof',
  'Neymar Jr',
  'jugador',
  'Real Sur FC',
  '/players/neymar.jpg',
  ARRAY['1x MVP de la Mad League', '1x Campeón de Liga', 'Mejor Asistidor T34', 'Jugador más espectacular'],
  '[{"label":"Goles","value":"438"},{"label":"Asistencias","value":"295"},{"label":"Partidos","value":"715"},{"label":"Regates","value":"2.340"}]'::jsonb,
  'T34 - Actual',
  'El brasileño aporta el toque de samba y creatividad que hace de la Mad League un espectáculo único.'
),
(
  'carlos-sanchez-hof',
  'Carlos Sánchez',
  'tecnico',
  'FC Madrid Central',
  '/coaches/sanchez.jpg',
  ARRAY['2x Campeón de Liga', '1x Champions League', 'Mejor Entrenador T34', '100+ victorias en liga'],
  '[{"label":"Victorias","value":"156"},{"label":"Empates","value":"42"},{"label":"Derrotas","value":"28"},{"label":"% Victoria","value":"69%"}]'::jsonb,
  'T32 - Actual',
  'El arquitecto del éxito del FC Madrid Central, conocido por su visión táctica y capacidad para desarrollar jóvenes talentos.'
),
(
  'roberto-silva-hof',
  'Roberto Silva',
  'tecnico',
  'Atlético Norte',
  '/coaches/silva.jpg',
  ARRAY['1x Campeón de Liga', '2x Copa Mad', 'Mejor defensa de la liga T33', 'Ascenso desde Mad League 2'],
  '[{"label":"Victorias","value":"128"},{"label":"Empates","value":"56"},{"label":"Derrotas","value":"32"},{"label":"% Victoria","value":"59%"}]'::jsonb,
  'T31 - Actual',
  'Maestro de la táctica defensiva, ha convertido al Atlético Norte en uno de los equipos más sólidos de la competición.'
),
(
  'diego-martinez-hof',
  'Diego Martínez',
  'jugador',
  'Atlético Norte',
  '/players/martinez.jpg',
  ARRAY['Mejor Centrocampista T34', 'Mejor Centrocampista T35', 'Capitán del Atlético Norte', 'Selección Mad League'],
  '[{"label":"Goles","value":"42"},{"label":"Asistencias","value":"58"},{"label":"Partidos","value":"145"},{"label":"MVP partidos","value":"28"}]'::jsonb,
  'T33 - Actual',
  'El corazón del mediocampo del Atlético Norte, combina visión de juego con capacidad goleadora de manera excepcional.'
)
ON CONFLICT (id) DO NOTHING;
