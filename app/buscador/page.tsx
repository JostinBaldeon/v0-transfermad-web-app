import type { Metadata } from "next"
import { PlayerSearch } from "@/components/player-search"

export const metadata: Metadata = {
  title: "Buscador | TransferMad",
  description: "Busca jugadores y clubes en la Mad League. Filtros por posición, equipo y más.",
}

export default function BuscadorPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Buscador
          </h1>
          <p className="text-lg text-muted-foreground">
            Encuentra jugadores y clubes en la Mad League. Utiliza los filtros 
            para refinar tu búsqueda.
          </p>
        </div>

        {/* Search component */}
        <PlayerSearch />
      </div>
    </div>
  )
}
