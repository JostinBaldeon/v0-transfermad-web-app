import { createClient } from "@/lib/supabase/client"
import type { Player } from "@/lib/data/players"

function mapPlayer(row: any): Player {
  return {
    id: row.id,
    name: row.name,
    firstName: row.first_name,
    lastName: row.last_name,
    position: row.position,
    nationality: row.nationality,
    nationalityFlag: row.nationality_flag,
    age: row.age,
    clubId: row.club_id,
    marketValue: Number(row.market_value),
    foot: row.foot,
    height: row.height,
    goals: row.goals,
    assists: row.assists,
    matches: row.matches,
    image: row.image,
    isLegend: row.is_legend,
    marketHistory: row.market_history,
    clubHistory: row.club_history,
  }
}

export async function getPlayers(): Promise<Player[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("players").select("*").order("name")
  if (error) throw error
  return (data ?? []).map(mapPlayer)
}

export async function updatePlayer(playerId: string, payload: Partial<Player>): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from("players")
    .update({
      name: payload.name,
      first_name: payload.firstName,
      last_name: payload.lastName,
      position: payload.position,
      nationality: payload.nationality,
      nationality_flag: payload.nationalityFlag,
      age: payload.age,
      club_id: payload.clubId,
      market_value: payload.marketValue,
      foot: payload.foot,
      height: payload.height,
      goals: payload.goals,
      assists: payload.assists,
      matches: payload.matches,
      image: payload.image,
      is_legend: payload.isLegend,
      market_history: payload.marketHistory,
      club_history: payload.clubHistory,
      updated_at: new Date().toISOString(),
    })
    .eq("id", playerId)

  if (error) throw error
}
