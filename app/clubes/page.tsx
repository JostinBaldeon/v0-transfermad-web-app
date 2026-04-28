import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Users, TrendingUp } from "lucide-react"
import { clubs, getTotalMarketValue, formatMarketValue } from "@/lib/data/clubs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Clubes | TransferMad",
  description: "Todos los clubes de la Mad League. Consulta plantillas, valores de mercado y más.",
}

export default function ClubesPage() {
  const totalValue = getTotalMarketValue()
  const sortedClubs = [...clubs].sort((a, b) => b.marketValue - a.marketValue)
  const league1Clubs = sortedClubs.filter((c) => c.league === "mad-league-1")
  const league2Clubs = sortedClubs.filter((c) => c.league === "mad-league-2")

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Clubes
          </h1>
          <p className="text-lg text-muted-foreground">
            Todos los clubes de la Mad League organizados por división. 
            Haz clic en un club para ver su plantilla completa.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{clubs.length}</div>
            <div className="text-sm text-muted-foreground">Clubes totales</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Users className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{league1Clubs.length}</div>
            <div className="text-sm text-muted-foreground">Mad League 1</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Users className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{league2Clubs.length}</div>
            <div className="text-sm text-muted-foreground">Mad League 2</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{formatMarketValue(totalValue)}</div>
            <div className="text-sm text-muted-foreground">Valor total</div>
          </div>
        </div>

        {/* Mad League 1 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-4 h-4 rounded-full bg-primary" />
            <h2 className="text-2xl font-bold text-foreground">Mad League 1</h2>
          </div>
          
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-card hover:bg-card">
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead className="text-center">Jugadores</TableHead>
                    <TableHead className="text-center">Edad media</TableHead>
                    <TableHead className="text-right">Valor de mercado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {league1Clubs.map((club, index) => (
                    <TableRow key={club.id} className="hover:bg-card/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/clubes/${club.id}`}
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${club.primaryColor}20` }}
                          >
                            <Shield
                              className="h-5 w-5"
                              style={{ color: club.primaryColor }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {club.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {club.stadium}
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">{club.playerCount}</TableCell>
                      <TableCell className="text-center">{club.averageAge.toFixed(1)}</TableCell>
                      <TableCell className="text-right font-medium text-primary">
                        {formatMarketValue(club.marketValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Mad League 2 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-4 h-4 rounded-full bg-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground">Mad League 2</h2>
          </div>
          
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-card hover:bg-card">
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead className="text-center">Jugadores</TableHead>
                    <TableHead className="text-center">Edad media</TableHead>
                    <TableHead className="text-right">Valor de mercado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {league2Clubs.map((club, index) => (
                    <TableRow key={club.id} className="hover:bg-card/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/clubes/${club.id}`}
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${club.primaryColor}20` }}
                          >
                            <Shield
                              className="h-5 w-5"
                              style={{ color: club.primaryColor }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {club.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {club.stadium}
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">{club.playerCount}</TableCell>
                      <TableCell className="text-center">{club.averageAge.toFixed(1)}</TableCell>
                      <TableCell className="text-right font-medium text-primary">
                        {formatMarketValue(club.marketValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
