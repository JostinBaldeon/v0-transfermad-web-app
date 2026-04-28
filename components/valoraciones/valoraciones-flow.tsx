"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Shield, ImageIcon, Check } from "lucide-react"
import { seasons } from "@/lib/data/valoraciones"
import { clubs, getClubById, formatMarketValue } from "@/lib/data/clubs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Step = "season" | "team" | "rating"

export function ValoracionesFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("season")
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const handleSeasonSelect = (seasonId: number) => {
    setSelectedSeason(seasonId)
    setCurrentStep("team")
  }

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId)
    setCurrentStep("rating")
  }

  const handleBack = () => {
    if (currentStep === "rating") {
      setSelectedTeam(null)
      setCurrentStep("team")
    } else if (currentStep === "team") {
      setSelectedSeason(null)
      setCurrentStep("season")
    }
  }

  const handleReset = () => {
    setSelectedSeason(null)
    setSelectedTeam(null)
    setCurrentStep("season")
  }

  const selectedSeasonData = seasons.find((s) => s.id === selectedSeason)
  const selectedTeamData = selectedTeam ? getClubById(selectedTeam) : null

  return (
    <div>
      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <StepIndicator
          step={1}
          label="Temporada"
          isActive={currentStep === "season"}
          isCompleted={currentStep !== "season"}
          value={selectedSeasonData?.name}
        />
        <div className="w-8 h-px bg-border flex-shrink-0" />
        <StepIndicator
          step={2}
          label="Equipo"
          isActive={currentStep === "team"}
          isCompleted={currentStep === "rating"}
          value={selectedTeamData?.name}
        />
        <div className="w-8 h-px bg-border flex-shrink-0" />
        <StepIndicator
          step={3}
          label="Valoración"
          isActive={currentStep === "rating"}
          isCompleted={false}
        />
      </div>

      {/* Back button */}
      {currentStep !== "season" && (
        <Button variant="ghost" onClick={handleBack} className="mb-6 -ml-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      )}

      {/* Step content */}
      {currentStep === "season" && (
        <SeasonSelector onSelect={handleSeasonSelect} />
      )}

      {currentStep === "team" && selectedSeason && (
        <TeamSelector seasonId={selectedSeason} onSelect={handleTeamSelect} />
      )}

      {currentStep === "rating" && selectedSeason && selectedTeam && (
        <RatingViewer
          seasonId={selectedSeason}
          teamId={selectedTeam}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

function StepIndicator({
  step,
  label,
  isActive,
  isCompleted,
  value,
}: {
  step: number
  label: string
  isActive: boolean
  isCompleted: boolean
  value?: string
}) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
          isActive && "bg-primary text-primary-foreground",
          isCompleted && "bg-primary/20 text-primary",
          !isActive && !isCompleted && "bg-secondary text-muted-foreground"
        )}
      >
        {isCompleted ? <Check className="h-5 w-5" /> : step}
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-sm font-medium",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}>
          {label}
        </span>
        {value && (
          <span className="text-xs text-muted-foreground">{value}</span>
        )}
      </div>
    </div>
  )
}

function SeasonSelector({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Selecciona una temporada
      </h2>
      <p className="text-muted-foreground mb-6">
        Elige la temporada de la que quieres consultar las valoraciones.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => onSelect(season.id)}
            className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 text-left transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {season.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Año {season.year}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

function TeamSelector({
  seasonId,
  onSelect,
}: {
  seasonId: number
  onSelect: (id: string) => void
}) {
  const seasonData = seasons.find((s) => s.id === seasonId)
  const league1Clubs = clubs.filter((c) => c.league === "mad-league-1")
  const league2Clubs = clubs.filter((c) => c.league === "mad-league-2")

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Selecciona un equipo
      </h2>
      <p className="text-muted-foreground mb-6">
        Equipos de la {seasonData?.name}. Selecciona uno para ver sus valoraciones.
      </p>

      {/* Mad League 1 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          Mad League 1
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {league1Clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => onSelect(club.id)}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 text-center transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${club.primaryColor}20` }}
              >
                <Shield className="h-6 w-6" style={{ color: club.primaryColor }} />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {club.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mad League 2 */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-muted-foreground" />
          Mad League 2
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {league2Clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => onSelect(club.id)}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 text-center transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${club.primaryColor}20` }}
              >
                <Shield className="h-6 w-6" style={{ color: club.primaryColor }} />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {club.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function RatingViewer({
  seasonId,
  teamId,
  onReset,
}: {
  seasonId: number
  teamId: string
  onReset: () => void
}) {
  const season = seasons.find((s) => s.id === seasonId)
  const team = getClubById(teamId)

  if (!season || !team) return null

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {team.name}
          </h2>
          <p className="text-muted-foreground">
            Valoración de la {season.name}
          </p>
        </div>
        <Button variant="outline" onClick={onReset}>
          Nueva consulta
        </Button>
      </div>

      {/* Team stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-2xl font-bold text-primary">
            {formatMarketValue(team.marketValue)}
          </div>
          <div className="text-sm text-muted-foreground">Valor de mercado</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-2xl font-bold text-foreground">
            {team.playerCount}
          </div>
          <div className="text-sm text-muted-foreground">Jugadores</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-2xl font-bold text-foreground">
            {team.averageAge.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Edad media</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-2xl font-bold text-foreground capitalize">
            {team.league === "mad-league-1" ? "Primera" : "Segunda"}
          </div>
          <div className="text-sm text-muted-foreground">División</div>
        </div>
      </div>

      {/* Rating image placeholder */}
      <div className="relative aspect-video max-w-4xl rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-border overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${team.primaryColor}30` }}
          >
            <Shield className="h-10 w-10" style={{ color: team.primaryColor }} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {team.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {season.name} - Captura de valoración
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
            <ImageIcon className="h-4 w-4" />
            <span>Imagen no disponible - Placeholder</span>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-8 p-6 rounded-xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Información del equipo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estadio</span>
            <span className="text-foreground font-medium">{team.stadium}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fundación</span>
            <span className="text-foreground font-medium">{team.foundedYear}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Liga</span>
            <span className="text-foreground font-medium">
              {team.league === "mad-league-1" ? "Mad League 1" : "Mad League 2"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Temporada</span>
            <span className="text-foreground font-medium">{season.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
