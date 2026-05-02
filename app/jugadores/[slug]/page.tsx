import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, User, Shield, Calendar, Ruler, Target, Award, TrendingUp, History } from "lucide-react"
import { players, getPlayerById, formatMarketValue, getPositionName } from "@/lib/data/players"
import { getClubById } from "@/lib/data/clubs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface SupabasePlayer {
  id: string
  name: string
  position: string
  club_id: string
  age: number
  nationality: string
  nationality_flag: string
  height: number
  foot: string
  market_value: number
  goals: number
  assists: number
  matches: number
  is_legend?: boolean
  market_history?: { season: string; value: number }[]
  club_history?: { season: string; clubId: string }[]
}

async function getPlayerFromSupabase(slug: string) {
  try {
    const { supabase } = await import("@/lib/supabase/client")
    const { data, error } = await supabase.from("players").select("*").eq("id", slug).maybeSingle()
    if (error) {
      console.error("[v0] Supabase error fetching player:", error)
      return null
    }
    return data as SupabasePlayer | null
  } catch (error) {
    console.error("[v0] Failed to fetch player:", error)
    return null
  }
}

async function getClubFromSupabase(clubId: string) {
  try {
    const { supabase } = await import("@/lib/supabase/client")
    const { data, error } = await supabase
      .from("clubs")
      .select("id,name,primary_color")
      .eq("id", clubId)
      .maybeSingle()

    if (error) {
      console.error("[v0] Supabase error fetching club:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("[v0] Failed to fetch club:", error)
    return null
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return players.map((player) => ({
    slug: player.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabasePlayer = await getPlayerFromSupabase(slug)
  const player = supabasePlayer
    ? {
        id: supabasePlayer.id,
        name: supabasePlayer.name,
        position: supabasePlayer.position as any,
        marketValue: supabasePlayer.market_value,
      }
    : getPlayerById(slug)

  if (!player) {
    return { title: "Jugador no encontrado | TransferMad" }
  }

  return {
    title: `${player.name} | TransferMad`,
    description: `Perfil de ${player.name}. ${getPositionName(player.position as any)} - Valor: ${formatMarketValue(player.marketValue)}`,
  }
}

export default async function PlayerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabasePlayer = await getPlayerFromSupabase(slug)
  const player = supabasePlayer
    ? {
        id: supabasePlayer.id,
        name: supabasePlayer.name,
        position: supabasePlayer.position as any,
        clubId: supabasePlayer.club_id,
        age: supabasePlayer.age,
        nationality: supabasePlayer.nationality,
        nationalityFlag: supabasePlayer.nationality_flag,
        height: supabasePlayer.height,
        foot: supabasePlayer.foot as any,
        marketValue: supabasePlayer.market_value,
        goals: supabasePlayer.goals,
        assists: supabasePlayer.assists,
        matches: supabasePlayer.matches,
        isLegend: supabasePlayer.is_legend || false,
        marketHistory: supabasePlayer.market_history || [],
        clubHistory: supabasePlayer.club_history || [],
      }
    : getPlayerById(slug)

  if (!player) {
    notFound()
  }

  const supabaseClub = await getClubFromSupabase(player.clubId)
  const club = supabaseClub
    ? {
        id: supabaseClub.id,
        name: supabaseClub.name,
        primaryColor: supabaseClub.primary_color,
      }
    : getClubById(player.clubId)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/buscador" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al buscador
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Player info */}
          <div className="lg:col-span-1">
            {/* Player card */}
            <div className="rounded-2xl bg-card border border-border overflow-hidden mb-6">
              {/* Header with player photo placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-card border-4 border-background flex items-center justify-center">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
                {player.isLegend && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      Leyenda
                    </Badge>
                  </div>
                )}
              </div>

              {/* Player details */}
              <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  {player.name}
                </h1>
                <p className="text-muted-foreground mb-4">
                  {getPositionName(player.position)}
                </p>

                {/* Club link */}
                {club && (
                  <Link
                    href={`/clubes/${club.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Shield
                      className="h-4 w-4"
                      style={{ color: club.primaryColor }}
                    />
                    <span className="text-sm font-medium">{club.name}</span>
                  </Link>
                )}

                {/* Market value */}
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">
                    Valor de mercado
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {formatMarketValue(player.marketValue)}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic info */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Información básica
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Edad
                  </span>
                  <span className="font-medium">{player.age} años</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nacionalidad</span>
                  <span className="font-medium flex items-center gap-2">
                    {player.nationalityFlag} {player.nationality}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Altura
                  </span>
                  <span className="font-medium">{player.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pie hábil</span>
                  <span className="font-medium capitalize">{player.foot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posición</span>
                  <span className="font-medium">
                    {player.position} - {getPositionName(player.position)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Stats & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career stats */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Estadísticas de carrera
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {player.goals}
                  </div>
                  <div className="text-sm text-muted-foreground">Goles</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {player.assists}
                  </div>
                  <div className="text-sm text-muted-foreground">Asistencias</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {player.matches}
                  </div>
                  <div className="text-sm text-muted-foreground">Partidos</div>
                </div>
              </div>

              {/* Goal/match ratio */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Goles por partido
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {(player.goals / player.matches).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Contribución G+A
                  </div>
                  <div className="text-xl font-bold text-accent">
                    {((player.goals + player.assists) / player.matches).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Market value history */}
            {player.marketHistory && player.marketHistory.length > 0 && (
              <div className="rounded-xl bg-card border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Historial de valor de mercado
                </h2>
                <div className="space-y-3">
                  {player.marketHistory.map((entry, index) => (
                    <div
                      key={entry.season}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                    >
                      <span className="text-muted-foreground">
                        Temporada {entry.season}
                      </span>
                      <span className={`font-bold ${
                        index === 0 ? "text-primary" : "text-foreground"
                      }`}>
                        {formatMarketValue(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Club history */}
            {player.clubHistory && player.clubHistory.length > 0 && (
              <div className="rounded-xl bg-card border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Historial de clubes
                </h2>
                <div className="space-y-3">
                  {player.clubHistory.map((entry) => {
                    const histClub = getClubById(entry.clubId)
                    return (
                      <div
                        key={`${entry.clubId}-${entry.season}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                      >
                        <div className="flex items-center gap-3">
                          {histClub && (
                            <Shield
                              className="h-5 w-5"
                              style={{ color: histClub.primaryColor }}
                            />
                          )}
                          <span className="font-medium">
                            {histClub?.name || entry.clubId}
                          </span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {entry.season}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Legend achievements */}
            {player.isLegend && (
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Estado de leyenda
                </h2>
                <p className="text-muted-foreground">
                  {player.name} es considerado una leyenda de la Mad League por su 
                  extraordinaria carrera y sus contribuciones al fútbol mundial.
                  Su legado sigue inspirando a las nuevas generaciones de jugadores.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
