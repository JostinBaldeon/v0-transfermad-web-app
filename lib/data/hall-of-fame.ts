export interface HallOfFameMember {
  id: string
  name: string
  role: "jugador" | "tecnico"
  club: string
  image: string
  achievements: string[]
  stats: {
    label: string
    value: string
  }[]
  seasons: string
  description: string
}

export const hallOfFameMembers: HallOfFameMember[] = [
  {
    id: "messi-hof",
    name: "Lionel Messi",
    role: "jugador",
    club: "FC Madrid Central",
    image: "/players/messi.jpg",
    achievements: [
      "3x MVP de la Mad League",
      "2x Campeón de Liga",
      "Máximo goleador histórico",
      "Balón de Oro Mad League",
    ],
    stats: [
      { label: "Goles", value: "823" },
      { label: "Asistencias", value: "375" },
      { label: "Partidos", value: "1.048" },
      { label: "Títulos", value: "8" },
    ],
    seasons: "T33 - Actual",
    description: "Considerado por muchos como el mejor jugador de todos los tiempos, Messi ha traído su magia a la Mad League, demostrando que su clase es eterna.",
  },
  {
    id: "ronaldo-hof",
    name: "Cristiano Ronaldo",
    role: "jugador",
    club: "Atlético Norte",
    image: "/players/ronaldo.jpg",
    achievements: [
      "2x MVP de la Mad League",
      "1x Campeón de Liga",
      "2x Pichichi de la Liga",
      "Récord de hat-tricks",
    ],
    stats: [
      { label: "Goles", value: "900" },
      { label: "Asistencias", value: "245" },
      { label: "Partidos", value: "1.215" },
      { label: "Hat-tricks", value: "65" },
    ],
    seasons: "T33 - Actual",
    description: "La máquina de goles portuguesa sigue demostrando su increíble capacidad goleadora y su mentalidad ganadora en cada partido.",
  },
  {
    id: "neymar-hof",
    name: "Neymar Jr",
    role: "jugador",
    club: "Real Sur FC",
    image: "/players/neymar.jpg",
    achievements: [
      "1x MVP de la Mad League",
      "1x Campeón de Liga",
      "Mejor Asistidor T34",
      "Jugador más espectacular",
    ],
    stats: [
      { label: "Goles", value: "438" },
      { label: "Asistencias", value: "295" },
      { label: "Partidos", value: "715" },
      { label: "Regates", value: "2.340" },
    ],
    seasons: "T34 - Actual",
    description: "El brasileño aporta el toque de samba y creatividad que hace de la Mad League un espectáculo único.",
  },
  {
    id: "carlos-sanchez-hof",
    name: "Carlos Sánchez",
    role: "tecnico",
    club: "FC Madrid Central",
    image: "/coaches/sanchez.jpg",
    achievements: [
      "2x Campeón de Liga",
      "1x Champions League",
      "Mejor Entrenador T34",
      "100+ victorias en liga",
    ],
    stats: [
      { label: "Victorias", value: "156" },
      { label: "Empates", value: "42" },
      { label: "Derrotas", value: "28" },
      { label: "% Victoria", value: "69%" },
    ],
    seasons: "T32 - Actual",
    description: "El arquitecto del éxito del FC Madrid Central, conocido por su visión táctica y capacidad para desarrollar jóvenes talentos.",
  },
  {
    id: "roberto-silva-hof",
    name: "Roberto Silva",
    role: "tecnico",
    club: "Atlético Norte",
    image: "/coaches/silva.jpg",
    achievements: [
      "1x Campeón de Liga",
      "2x Copa Mad",
      "Mejor defensa de la liga T33",
      "Ascenso desde Mad League 2",
    ],
    stats: [
      { label: "Victorias", value: "128" },
      { label: "Empates", value: "56" },
      { label: "Derrotas", value: "32" },
      { label: "% Victoria", value: "59%" },
    ],
    seasons: "T31 - Actual",
    description: "Maestro de la táctica defensiva, ha convertido al Atlético Norte en uno de los equipos más sólidos de la competición.",
  },
  {
    id: "diego-martinez-hof",
    name: "Diego Martínez",
    role: "jugador",
    club: "Atlético Norte",
    image: "/players/martinez.jpg",
    achievements: [
      "Mejor Centrocampista T34",
      "Mejor Centrocampista T35",
      "Capitán del Atlético Norte",
      "Selección Mad League",
    ],
    stats: [
      { label: "Goles", value: "42" },
      { label: "Asistencias", value: "58" },
      { label: "Partidos", value: "145" },
      { label: "MVP partidos", value: "28" },
    ],
    seasons: "T33 - Actual",
    description: "El corazón del mediocampo del Atlético Norte, combina visión de juego con capacidad goleadora de manera excepcional.",
  },
]

export function getHallOfFameMemberById(id: string): HallOfFameMember | undefined {
  return hallOfFameMembers.find((member) => member.id === id)
}

export function getHallOfFameByRole(role: "jugador" | "tecnico"): HallOfFameMember[] {
  return hallOfFameMembers.filter((member) => member.role === role)
}
