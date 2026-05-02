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

export function getHallOfFameByRole(members: HallOfFameMember[], role: "jugador" | "tecnico"): HallOfFameMember[] {
  return members.filter((member) => member.role === role)
}
