import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clubs, getTotalMarketValue, formatMarketValue } from "@/lib/data/clubs"
import { players } from "@/lib/data/players"

export function StatsSection() {
  const totalValue = getTotalMarketValue()
  const totalPlayers = players.length
  const totalClubs = clubs.length
  const legends = players.filter(p => p.isLegend).length

  const stats = [
    { label: "Valor total del mercado", value: formatMarketValue(totalValue) },
    { label: "Jugadores registrados", value: `${totalPlayers}+` },
    { label: "Clubes activos", value: totalClubs.toString() },
    { label: "Leyendas", value: legends.toString() },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            La liga en números
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Estadísticas actualizadas de la Mad League
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/clubes">
                Ver todos los clubes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/buscador">
                Buscar jugadores
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
