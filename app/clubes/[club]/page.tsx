import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Shield, User, Calendar, MapPin, TrendingUp } from "lucide-react"
import { clubs, getClubById, formatMarketValue } from "@/lib/data/clubs"
import { getPlayersByClub, formatMarketValue as formatPlayerValue, getPositionName } from "@/lib/data/players"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PageProps {
  params: Promise<{ club: string }>
}

export async function generateStaticParams() {
  return clubs.map((club) => ({
    club: club.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { club: clubId } = await params
  const club = getClubById(clubId)
  
  if (!club) {
    return { title: "Club no encontrado | TransferMad" }
  }

  return {
    title: `${club.name} | TransferMad`,
    description: `Plantilla y estadísticas de ${club.name} en la Mad League. Valor de mercado: ${formatMarketValue(club.marketValue)}`,
  }
}

export default async function ClubDetailPage({ params }: PageProps) {
  const { club: clubId } = await params
  const club = getClubById(clubId)

  if (!club) {
    notFound()
  }

  const players = getPlayersByClub(clubId)
  const totalPlayerValue = players.reduce((sum, p) => sum + p.marketValue, 0)

  // Group players by position type
  const goalkeepers = players.filter((p) => p.position === "POR")
  const defenders = players.filter((p) => ["DFC", "LI", "LD"].includes(p.position))
  const midfielders = players.filter((p) => ["MCD", "MC", "MCO"].includes(p.position))
  const attackers = players.filter((p) => ["EI", "ED", "SD", "DC"].includes(p.position))

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/clubes" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a clubes
          </Link>
        </Button>

        {/* Club header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${club.primaryColor}20` }}
          >
            <Shield
              className="h-12 w-12 md:h-16 md:w-16"
              style={{ color: club.primaryColor }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-3 h-3 rounded-full ${club.league === "mad-league-1" ? "bg-primary" : "bg-muted-foreground"}`} />
              <span className="text-sm text-muted-foreground">
                {club.league === "mad-league-1" ? "Mad League 1" : "Mad League 2"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {club.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{club.stadium}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Fundado en {club.foundedYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">
              {formatMarketValue(club.marketValue)}
            </div>
            <div className="text-sm text-muted-foreground">Valor de mercado</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <User className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {club.playerCount}
            </div>
            <div className="text-sm text-muted-foreground">Jugadores</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {club.averageAge.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Edad media</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {formatPlayerValue(totalPlayerValue / players.length || 0)}
            </div>
            <div className="text-sm text-muted-foreground">Valor medio</div>
          </div>
        </div>

        {/* Squad */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Plantilla
          </h2>

          {players.length > 0 ? (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-card hover:bg-card">
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Posición</TableHead>
                      <TableHead className="text-center">Edad</TableHead>
                      <TableHead>Nacionalidad</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Goalkeepers */}
                    {goalkeepers.length > 0 && (
                      <>
                        <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                          <TableCell colSpan={6} className="py-2">
                            <span className="text-sm font-semibold text-foreground">
                              Porteros ({goalkeepers.length})
                            </span>
                          </TableCell>
                        </TableRow>
                        {goalkeepers.map((player) => (
                          <PlayerRow key={player.id} player={player} clubColor={club.primaryColor} />
                        ))}
                      </>
                    )}
                    {/* Defenders */}
                    {defenders.length > 0 && (
                      <>
                        <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                          <TableCell colSpan={6} className="py-2">
                            <span className="text-sm font-semibold text-foreground">
                              Defensas ({defenders.length})
                            </span>
                          </TableCell>
                        </TableRow>
                        {defenders.map((player) => (
                          <PlayerRow key={player.id} player={player} clubColor={club.primaryColor} />
                        ))}
                      </>
                    )}
                    {/* Midfielders */}
                    {midfielders.length > 0 && (
                      <>
                        <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                          <TableCell colSpan={6} className="py-2">
                            <span className="text-sm font-semibold text-foreground">
                              Centrocampistas ({midfielders.length})
                            </span>
                          </TableCell>
                        </TableRow>
                        {midfielders.map((player) => (
                          <PlayerRow key={player.id} player={player} clubColor={club.primaryColor} />
                        ))}
                      </>
                    )}
                    {/* Attackers */}
                    {attackers.length > 0 && (
                      <>
                        <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                          <TableCell colSpan={6} className="py-2">
                            <span className="text-sm font-semibold text-foreground">
                              Delanteros ({attackers.length})
                            </span>
                          </TableCell>
                        </TableRow>
                        {attackers.map((player) => (
                          <PlayerRow key={player.id} player={player} clubColor={club.primaryColor} />
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl bg-card border border-border">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Sin jugadores registrados
              </h3>
              <p className="text-muted-foreground">
                Este club aún no tiene jugadores en la base de datos.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function PlayerRow({ player, clubColor }: { player: any; clubColor: string }) {
  return (
    <TableRow className="hover:bg-card/50">
      <TableCell>
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell>
        <Link
          href={`/jugadores/${player.id}`}
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          {player.name}
          {player.isLegend && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
              Leyenda
            </span>
          )}
        </Link>
      </TableCell>
      <TableCell>
        <span className="px-2 py-1 rounded bg-secondary text-xs font-medium">
          {player.position}
        </span>
        <span className="ml-2 text-xs text-muted-foreground hidden md:inline">
          {getPositionName(player.position)}
        </span>
      </TableCell>
      <TableCell className="text-center">{player.age}</TableCell>
      <TableCell>
        <span className="flex items-center gap-1">
          <span>{player.nationalityFlag}</span>
          <span className="hidden md:inline">{player.nationality}</span>
        </span>
      </TableCell>
      <TableCell className="text-right font-medium text-primary">
        {formatPlayerValue(player.marketValue)}
      </TableCell>
    </TableRow>
  )
}
