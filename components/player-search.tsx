"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, User, Shield, SortAsc, SortDesc, X } from "lucide-react"
import { players, formatMarketValue, getPositionName } from "@/lib/data/players"
import { clubs, getClubById } from "@/lib/data/clubs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SortField = "name" | "position" | "age" | "marketValue"
type SortDirection = "asc" | "desc"

export function PlayerSearch() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  
  const [query, setQuery] = useState(initialQuery)
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [clubFilter, setClubFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("marketValue")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredPlayers = useMemo(() => {
    let result = [...players]

    // Text search
    if (query) {
      const searchTerm = query.toLowerCase()
      result = result.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm) ||
          player.firstName.toLowerCase().includes(searchTerm) ||
          player.lastName.toLowerCase().includes(searchTerm) ||
          getClubById(player.clubId)?.name.toLowerCase().includes(searchTerm)
      )
    }

    // Position filter
    if (positionFilter !== "all") {
      result = result.filter((player) => player.position === positionFilter)
    }

    // Club filter
    if (clubFilter !== "all") {
      result = result.filter((player) => player.clubId === clubFilter)
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "position":
          comparison = a.position.localeCompare(b.position)
          break
        case "age":
          comparison = a.age - b.age
          break
        case "marketValue":
          comparison = a.marketValue - b.marketValue
          break
      }
      return sortDirection === "asc" ? comparison : -comparison
    })

    return result
  }, [query, positionFilter, clubFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const clearFilters = () => {
    setQuery("")
    setPositionFilter("all")
    setClubFilter("all")
  }

  const hasActiveFilters = query || positionFilter !== "all" || clubFilter !== "all"

  const positions = Array.from(new Set(players.map((p) => p.position))).sort()

  return (
    <div>
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre de jugador o club..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Posición" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {positions.map((pos) => (
              <SelectItem key={pos} value={pos}>
                {pos} - {getPositionName(pos)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={clubFilter} onValueChange={setClubFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Club" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los clubes</SelectItem>
            {clubs.map((club) => (
              <SelectItem key={club.id} value={club.id}>
                {club.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredPlayers.length} jugadores encontrados
        </p>
      </div>

      {/* Results table */}
      {filteredPlayers.length > 0 ? (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-card hover:bg-card">
                  <TableHead className="w-12"></TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Nombre
                      {sortField === "name" && (
                        sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("position")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Posición
                      {sortField === "position" && (
                        sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("age")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Edad
                      {sortField === "age" && (
                        sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>Nacionalidad</TableHead>
                  <TableHead className="text-right">
                    <button
                      onClick={() => handleSort("marketValue")}
                      className="flex items-center gap-1 hover:text-foreground ml-auto"
                    >
                      Valor de mercado
                      {sortField === "marketValue" && (
                        sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => {
                  const club = getClubById(player.clubId)
                  return (
                    <TableRow key={player.id} className="hover:bg-card/50">
                      <TableCell>
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/jugadores/${player.id}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {player.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded bg-secondary text-xs font-medium">
                          {player.position}
                        </span>
                      </TableCell>
                      <TableCell>
                        {club && (
                          <Link
                            href={`/clubes/${club.id}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Shield
                              className="h-4 w-4"
                              style={{ color: club.primaryColor }}
                            />
                            <span className="hidden sm:inline">{club.name}</span>
                            <span className="sm:hidden">{club.shortName}</span>
                          </Link>
                        )}
                      </TableCell>
                      <TableCell>{player.age}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          <span>{player.nationalityFlag}</span>
                          <span className="hidden md:inline">{player.nationality}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium text-primary">
                        {formatMarketValue(player.marketValue)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 rounded-xl bg-card border border-border">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-muted-foreground mb-4">
            No se encontraron resultados para {`"${query}"`}
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
