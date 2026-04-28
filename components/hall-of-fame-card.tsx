"use client"

import { useState } from "react"
import { User, Trophy, Star, ChevronDown, ChevronUp, Calendar } from "lucide-react"
import type { HallOfFameMember } from "@/lib/data/hall-of-fame"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HallOfFameCardProps {
  member: HallOfFameMember
}

export function HallOfFameCard({ member }: HallOfFameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Header with avatar placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-card border-4 border-background flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        {/* Role badge */}
        <div className="absolute top-4 right-4">
          <Badge variant={member.role === "jugador" ? "default" : "secondary"}>
            {member.role === "jugador" ? "Jugador" : "Técnico"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1 text-center">
          {member.name}
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          {member.club}
        </p>

        {/* Seasons */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4" />
          <span>{member.seasons}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {member.stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="p-2 rounded-lg bg-secondary text-center">
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements preview */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Logros destacados</span>
          </div>
          <ul className="space-y-1">
            {member.achievements.slice(0, isExpanded ? undefined : 2).map((achievement, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-3 w-3 text-accent flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expand/collapse */}
        {member.achievements.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full gap-2"
          >
            {isExpanded ? (
              <>
                Ver menos
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver más ({member.achievements.length - 2} más)
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {/* Description (shown when expanded) */}
        {isExpanded && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
            {member.description}
          </p>
        )}
      </div>
    </div>
  )
}
