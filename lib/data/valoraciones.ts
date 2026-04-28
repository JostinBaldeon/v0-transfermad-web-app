import { clubs } from "./clubs"

export interface Season {
  id: number
  name: string
  year: string
}

export interface TeamRating {
  clubId: string
  seasonId: number
  imageUrl: string
}

export const seasons: Season[] = [
  { id: 33, name: "Temporada 33", year: "2022-23" },
  { id: 34, name: "Temporada 34", year: "2023-24" },
  { id: 35, name: "Temporada 35", year: "2024-25" },
]

// Generate team ratings for all clubs across all seasons
export const teamRatings: TeamRating[] = clubs.flatMap((club) =>
  seasons.map((season) => ({
    clubId: club.id,
    seasonId: season.id,
    imageUrl: `/valoraciones/${club.id}-t${season.id}.jpg`,
  }))
)

export function getSeasonById(id: number): Season | undefined {
  return seasons.find((season) => season.id === id)
}

export function getTeamRating(clubId: string, seasonId: number): TeamRating | undefined {
  return teamRatings.find(
    (rating) => rating.clubId === clubId && rating.seasonId === seasonId
  )
}

export function getTeamsForSeason(seasonId: number): string[] {
  return teamRatings
    .filter((rating) => rating.seasonId === seasonId)
    .map((rating) => rating.clubId)
}
