import type { Metadata } from "next"
import { ValoracionesFlow } from "@/components/valoraciones/valoraciones-flow"

export const metadata: Metadata = {
  title: "Valoraciones | TransferMad",
  description: "Consulta las valoraciones de los equipos por temporada en la Mad League.",
}

export default function ValoracionesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Valoraciones
          </h1>
          <p className="text-lg text-muted-foreground">
            Consulta las valoraciones de mercado de cada equipo por temporada. 
            Selecciona una temporada y un equipo para ver sus datos.
          </p>
        </div>

        {/* Flow component */}
        <ValoracionesFlow />
      </div>
    </div>
  )
}
