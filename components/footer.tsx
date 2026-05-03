import Link from "next/link"
import { Instagram, Music2, Youtube } from "lucide-react"

const quickLinks = [
  { label: "Noticias", href: "/noticias" },
  { label: "Clubes", href: "/clubes" },
  { label: "Buscador", href: "/buscador" },
  { label: "Valoraciones", href: "/valoraciones" },
  { label: "Tienda", href: "/tienda" },
]

const competitions = [
  { label: "Mad League 1", href: "#" },
  { label: "Mad League 2", href: "#" },
  { label: "Mad Cup", href: "#" },
  { label: "Champions League", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">TM</span>
              </div>
              <span className="font-bold text-xl">TransferMad</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El mercado de todos. Tu portal oficial para seguir la Mad League, 
              fichajes, estadísticas y mucho más.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/torneopesof"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Tiktok"
              >
                <Music2 className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@TorneoPes-tr9ni"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Competiciones</h3>
            <ul className="space-y-2">
              {competitions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@transfermad.com</li>
              <li>Comunidad Mad League</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 TransferMad. Todos los derechos reservados. Mad League.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Política de privacidad
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
