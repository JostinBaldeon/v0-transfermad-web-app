"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Instagram, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { SearchBar } from "@/components/search-bar"

const navItems = [
  { label: "Noticias", href: "/noticias" },
  { label: "Hall de la Fama", href: "/hall-de-la-fama" },
  { label: "Valoraciones", href: "/valoraciones" },
  { label: "Tienda", href: "/tienda" },
]

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TM</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline">TransferMad</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            
            <a
              href="https://www.instagram.com/torneopesof"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <User className="h-4 w-4" />
              <span>Iniciar sesión</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-border">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="md:hidden">
                    <SearchBar />
                  </div>
                  <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="border-t border-border pt-4">
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      <span>Iniciar sesión</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
