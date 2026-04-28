import Link from "next/link"
import { ArrowRight, Users, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Temporada 35 Activa</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Bienvenido a</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              TransferMad
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            El portal oficial de la Mad League. Más de{" "}
            <span className="text-foreground font-semibold">60 futbolistas</span>,{" "}
            <span className="text-foreground font-semibold">20 equipos</span> y{" "}
            <span className="text-foreground font-semibold">2 ligas</span> te esperan.
            Descubre el mercado más emocionante del fútbol virtual.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2">
              <Link href="/clubes">
                Explorar clubes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/noticias">
                Ver noticias
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border">
              <Users className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-bold text-foreground">60+</span>
              <span className="text-xs md:text-sm text-muted-foreground">Jugadores</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border">
              <Trophy className="h-6 w-6 text-accent mb-2" />
              <span className="text-2xl md:text-3xl font-bold text-foreground">20</span>
              <span className="text-xs md:text-sm text-muted-foreground">Equipos</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border">
              <Star className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-bold text-foreground">7</span>
              <span className="text-xs md:text-sm text-muted-foreground">Competiciones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
