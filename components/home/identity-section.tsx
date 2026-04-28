import { Shield, TrendingUp, Users2, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Clubes Únicos",
    description: "20 equipos con identidad propia, escudos y colores distintivos.",
  },
  {
    icon: TrendingUp,
    title: "Mercado Dinámico",
    description: "Valoraciones actualizadas por temporada con datos reales de rendimiento.",
  },
  {
    icon: Users2,
    title: "Comunidad Activa",
    description: "Miles de jugadores compitiendo cada temporada por la gloria.",
  },
  {
    icon: Zap,
    title: "Actualizaciones Constantes",
    description: "Nuevas funciones, jugadores y contenido en cada actualización.",
  },
]

export function IdentitySection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">TM</span>
              </div>
              <span className="text-2xl font-bold text-foreground">TransferMad</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              El mercado de todos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              TransferMad es el portal oficial de la Mad League, donde la pasión por el fútbol 
              se une con la emoción del mercado de fichajes. Sigue a tus equipos favoritos, 
              descubre nuevos talentos y vive cada temporada como si fuera la última.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
