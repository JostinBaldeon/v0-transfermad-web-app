"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Trophy, Medal, Award, Crown, Star, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const competitions = [
  {
    name: "Mad League 1",
    description: "Primera división",
    icon: Crown,
    color: "from-amber-500 to-amber-600",
  },
  {
    name: "Mad League 2",
    description: "Segunda división",
    icon: Medal,
    color: "from-slate-400 to-slate-500",
  },
  {
    name: "Mad Cup",
    description: "Copa nacional",
    icon: Trophy,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Mad Super Cup",
    description: "Supercopa",
    icon: Award,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Champions League",
    description: "Máxima competición europea",
    icon: Star,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Europa League",
    description: "Segunda competición europea",
    icon: Globe,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Super Cup",
    description: "Supercopa europea",
    icon: Sparkles,
    color: "from-rose-500 to-rose-600",
  },
]

export function CompetitionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Competiciones
              </h2>
              <p className="text-muted-foreground">
                7 torneos emocionantes para demostrar tu valía
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                aria-label="Scroll izquierda"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                aria-label="Scroll derecha"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {competitions.map((competition) => (
              <div
                key={competition.name}
                className="flex-shrink-0 w-64 snap-start"
              >
                <div className="group relative h-48 rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${competition.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${competition.color} flex items-center justify-center shadow-lg`}>
                      <competition.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {competition.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {competition.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll buttons */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll izquierda"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll derecha"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
