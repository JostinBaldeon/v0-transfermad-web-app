import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { rouletteTypes, getRouletteTypeById } from "@/lib/data/shop"
import { Button } from "@/components/ui/button"
import { RouletteWheel } from "@/components/roulette-wheel"

interface PageProps {
  params: Promise<{ type: string }>
}

const typeMapping: Record<string, string> = {
  "ruleta-libres": "libres",
  "ruleta-heroes": "heroes",
  "ruleta-iconos": "iconos",
}

export async function generateStaticParams() {
  return Object.keys(typeMapping).map((type) => ({
    type,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  const rouletteId = typeMapping[type]
  const roulette = rouletteId ? getRouletteTypeById(rouletteId) : null
  
  if (!roulette) {
    return { title: "Ruleta no encontrada | TransferMad" }
  }

  return {
    title: `${roulette.name} | Tienda TransferMad`,
    description: roulette.description,
  }
}

export default async function RuletaPage({ params }: PageProps) {
  const { type } = await params
  const rouletteId = typeMapping[type]
  const roulette = rouletteId ? getRouletteTypeById(rouletteId) : null

  if (!roulette) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/tienda" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a la tienda
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {roulette.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {roulette.description}
          </p>
        </div>

        {/* Roulette component */}
        <RouletteWheel roulette={roulette} />
      </div>
    </div>
  )
}
