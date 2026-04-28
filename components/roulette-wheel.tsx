"use client"

import { useState, useCallback } from "react"
import { RotateCw, Gift, Sparkles, RefreshCw } from "lucide-react"
import type { RouletteType, RouletteItem } from "@/lib/data/shop"
import { spinRoulette, getRarityColor, getRarityName } from "@/lib/data/shop"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RouletteWheelProps {
  roulette: RouletteType
}

export function RouletteWheel({ roulette }: RouletteWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<RouletteItem | null>(null)
  const [spinCount, setSpinCount] = useState(0)

  const handleSpin = useCallback(() => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)
    setSpinCount((prev) => prev + 1)

    // Simulate spin duration (3-5 seconds)
    const spinDuration = 3000 + Math.random() * 2000

    setTimeout(() => {
      const winner = spinRoulette(roulette.items)
      setResult(winner)
      setIsSpinning(false)
    }, spinDuration)
  }, [isSpinning, roulette.items])

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Wheel visualization */}
      <div className="relative mb-8">
        <div className="aspect-square max-w-md mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-border" />
          
          {/* Inner wheel with items */}
          <div 
            className={cn(
              "absolute inset-4 rounded-full bg-card border-2 border-border overflow-hidden transition-transform duration-[4000ms]",
              isSpinning && "animate-spin"
            )}
            style={{
              animationDuration: isSpinning ? "0.5s" : "0s",
              animationIterationCount: isSpinning ? "infinite" : "1",
            }}
          >
            {/* Segments */}
            {roulette.items.map((item, index) => {
              const angle = (360 / roulette.items.length) * index
              const rarityColor = getRarityColor(item.rarity)
              
              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-3 h-3 rounded-full -translate-y-1/2"
                    style={{ backgroundColor: rarityColor }}
                  />
                </div>
              )
            })}
            
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                {isSpinning ? (
                  <RotateCw className="h-10 w-10 text-primary-foreground animate-spin" />
                ) : (
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                )}
              </div>
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-primary" />
          </div>
        </div>
      </div>

      {/* Spin button */}
      <div className="text-center mb-8">
        {!result ? (
          <Button
            size="lg"
            onClick={handleSpin}
            disabled={isSpinning}
            className="gap-2 px-8"
          >
            {isSpinning ? (
              <>
                <RotateCw className="h-5 w-5 animate-spin" />
                Girando...
              </>
            ) : (
              <>
                <Gift className="h-5 w-5" />
                Girar ruleta
              </>
            )}
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            onClick={handleReset}
            className="gap-2 px-8"
          >
            <RefreshCw className="h-5 w-5" />
            Girar de nuevo
          </Button>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="text-center p-8 rounded-2xl bg-card border border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${getRarityColor(result.rarity)}20`,
                color: getRarityColor(result.rarity),
              }}
            >
              {getRarityName(result.rarity)}
            </span>
          </div>
          
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="h-10 w-10 text-primary" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {result.name}
          </h3>
          <p className="text-muted-foreground">
            {result.description}
          </p>
        </div>
      )}

      {/* Available prizes */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Premios disponibles
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {roulette.items.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-card border border-border text-center"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: getRarityColor(item.rarity) }}
              />
              <div className="text-sm font-medium text-foreground line-clamp-1">
                {item.name}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: getRarityColor(item.rarity) }}
              >
                {getRarityName(item.rarity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spin counter */}
      {spinCount > 0 && (
        <div className="text-center mt-8 text-sm text-muted-foreground">
          Has girado {spinCount} {spinCount === 1 ? "vez" : "veces"}
        </div>
      )}
    </div>
  )
}
