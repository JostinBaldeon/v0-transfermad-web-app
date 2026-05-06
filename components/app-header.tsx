"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Instagram, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { SearchBar } from "@/components/search-bar"
import { useAuth } from "@/components/auth-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "Noticias", href: "/noticias" },
  { label: "Hall de la Fama", href: "/hall-de-la-fama" },
  { label: "Valoraciones", href: "/valoraciones" },
  { label: "Tienda", href: "/tienda" },
]

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TM</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline">TransferMad</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>

            <a href="https://www.instagram.com/torneopesof" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                    <User className="h-4 w-4" />
                    <span>{user.coins} monedas</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>¡Hola, {user.user}!</DropdownMenuLabel>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Panel admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2" asChild>
                <Link href="/login">
                  <User className="h-4 w-4" />
                  <span>Iniciar sesión</span>
                </Link>
              </Button>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-border">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="md:hidden"><SearchBar /></div>
                  <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className="px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors" onClick={() => setIsOpen(false)}>{item.label}</Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="border-t border-border pt-4">
                    {user ? <p className="text-sm px-1">¡Hola, {user.user}! ({user.coins} monedas)</p> : <Button variant="outline" className="w-full" asChild><Link href="/login">Iniciar sesión</Link></Button>}
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
