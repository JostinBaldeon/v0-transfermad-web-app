import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingBag, Sparkles, Star, Crown, ArrowRight } from "lucide-react"
import { rouletteTypes } from "@/lib/data/shop"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Tienda | TransferMad",
  description: "Tienda de TransferMad. Prueba tu suerte en las ruletas de jugadores.",
}

const iconMap = {
  libres: ShoppingBag,
  heroes: Star,
  iconos: Crown,
}

const colorMap = {
  libres: "from-emerald-500 to-emerald-600",
  heroes: "from-purple-500 to-purple-600",
  iconos: "from-amber-500 to-amber-600",
}

export default function TiendaPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Prueba tu suerte</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tienda
          </h1>
          <p className="text-lg text-muted-foreground">
            Bienvenido a la tienda de TransferMad. Gira las ruletas para conseguir 
            jugadores, premios y más. Cada ruleta tiene diferentes niveles de rareza.
          </p>
        </div>

        {/* Roulette cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rouletteTypes.map((roulette) => {
            const Icon = iconMap[roulette.id as keyof typeof iconMap] || Star
            const gradient = colorMap[roulette.id as keyof typeof colorMap] || "from-blue-500 to-blue-600"
            
            return (
              <Link
                key={roulette.id}
                href={`/tienda/ruleta-${roulette.id}`}
                className="group block"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  
                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {roulette.name}
                    </h2>
                    <p className="text-muted-foreground mb-6 flex-1">
                      {roulette.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {roulette.items.length} premios
                      </span>
                      <Button variant="outline" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                        Jugar
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Info section */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Cómo funcionan las ruletas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Elige una ruleta
              </h4>
              <p className="text-sm text-muted-foreground">
                Cada ruleta tiene diferentes tipos de premios y probabilidades.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Gira la ruleta
              </h4>
              <p className="text-sm text-muted-foreground">
                Pulsa el botón de girar y espera a ver dónde se detiene.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Consigue tu premio
              </h4>
              <p className="text-sm text-muted-foreground">
                Obtén jugadores, monedas y items especiales según tu suerte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
