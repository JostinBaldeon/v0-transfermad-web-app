import { HeroSection } from "@/components/home/hero-section"
import { IdentitySection } from "@/components/home/identity-section"
import { CompetitionsSection } from "@/components/home/competitions-section"
import { TotySection } from "@/components/home/toty-section"
import { StatsSection } from "@/components/home/stats-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IdentitySection />
      <CompetitionsSection />
      <TotySection />
      <StatsSection />
    </div>
  )
}
