import type { Metadata } from "next"
import { Trophy, User, Star, Award } from "lucide-react"
import { hallOfFameMembers } from "@/lib/data/hall-of-fame"
import { HallOfFameCard } from "@/components/hall-of-fame-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Hall de la Fama | TransferMad",
  description: "Los jugadores y técnicos más legendarios de la historia de la Mad League.",
}

export default function HallOfFamePage() {
  const players = hallOfFameMembers.filter((m) => m.role === "jugador")
  const coaches = hallOfFameMembers.filter((m) => m.role === "tecnico")

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Leyendas de la Mad League</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hall de la Fama
          </h1>
          <p className="text-lg text-muted-foreground">
            Reconocemos a los jugadores y técnicos más destacados que han dejado 
            huella imborrable en la historia de nuestra liga.
          </p>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <User className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{players.length}</div>
            <div className="text-sm text-muted-foreground">Jugadores</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Award className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{coaches.length}</div>
            <div className="text-sm text-muted-foreground">Técnicos</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">15+</div>
            <div className="text-sm text-muted-foreground">MVPs</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">50+</div>
            <div className="text-sm text-muted-foreground">Títulos</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="jugadores">Jugadores</TabsTrigger>
            <TabsTrigger value="tecnicos">Técnicos</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hallOfFameMembers.map((member) => (
                <HallOfFameCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jugadores">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((member) => (
                <HallOfFameCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tecnicos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((member) => (
                <HallOfFameCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
