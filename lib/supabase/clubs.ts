import { createClient } from "@/lib/supabase/client"
import type { Club } from "@/lib/data/clubs"

export async function getClubs(): Promise<Club[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("clubs")
    .select("id,name,short_name,badge,primary_color,secondary_color,founded_year,stadium,league")
    .order("name")

  if (error) throw error

  return (data ?? []).map((club) => ({
    id: club.id,
    name: club.name,
    shortName: club.short_name,
    badge: club.badge,
    primaryColor: club.primary_color,
    secondaryColor: club.secondary_color,
    foundedYear: club.founded_year,
    stadium: club.stadium,
    league: club.league,
    playerCount: 0,
    averageAge: 0,
    marketValue: 0,
  }))
}
