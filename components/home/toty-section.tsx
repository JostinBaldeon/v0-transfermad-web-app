import Link from "next/link"
import { ArrowRight, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TotySection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* TOTY Reales */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card border border-border hover:border-primary/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative p-8 md:p-10">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  TOTY Reales
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Los mejores equipos del año formados por estrellas del fútbol mundial. 
                  Messi, Ronaldo, Neymar y más leyendas compiten en la Mad League.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Messi
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Ronaldo
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Neymar
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm font-medium">
                    +57 más
                  </span>
                </div>
                
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/jugadores/lionel-messi">
                    Ver leyendas
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* TOTY Creados */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-card to-card border border-border hover:border-accent/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative p-8 md:p-10">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <Sparkles className="h-7 w-7 text-accent" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  TOTY Creados
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Equipos formados por los mejores jugadores de la comunidad Mad League. 
                  Talentos emergentes que brillan temporada tras temporada.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    Diego Martínez
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    Marco Santos
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm font-medium">
                    +18 más
                  </span>
                </div>
                
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/hall-de-la-fama">
                    Ver Hall de la Fama
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
