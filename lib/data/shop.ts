export interface RouletteItem {
  id: string
  name: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  image: string
  description: string
}

export interface RouletteType {
  id: string
  name: string
  description: string
  image: string
  items: RouletteItem[]
}

const rarityColors: Record<RouletteItem["rarity"], string> = {
  common: "#9ca3af",
  uncommon: "#22c55e",
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#f59e0b",
}

export const rouletteTypes: RouletteType[] = [
  {
    id: "libres",
    name: "Ruleta de Libres",
    description: "Jugadores libres y sin contrato disponibles para fichar",
    image: "/shop/ruleta-libres.jpg",
    items: [
      { id: "l1", name: "Jugador Común 1", rarity: "common", image: "/items/player-common-1.jpg", description: "Un jugador sólido para tu plantilla" },
      { id: "l2", name: "Jugador Común 2", rarity: "common", image: "/items/player-common-2.jpg", description: "Un jugador sólido para tu plantilla" },
      { id: "l3", name: "Jugador Común 3", rarity: "common", image: "/items/player-common-3.jpg", description: "Un jugador sólido para tu plantilla" },
      { id: "l4", name: "Jugador Infrecuente 1", rarity: "uncommon", image: "/items/player-uncommon-1.jpg", description: "Un jugador con potencial" },
      { id: "l5", name: "Jugador Infrecuente 2", rarity: "uncommon", image: "/items/player-uncommon-2.jpg", description: "Un jugador con potencial" },
      { id: "l6", name: "Jugador Raro", rarity: "rare", image: "/items/player-rare-1.jpg", description: "Un jugador de calidad superior" },
      { id: "l7", name: "Pack de Monedas", rarity: "common", image: "/items/coins-pack.jpg", description: "1.000 monedas para tu cuenta" },
      { id: "l8", name: "Boost de XP", rarity: "uncommon", image: "/items/xp-boost.jpg", description: "Duplica tu experiencia por 24h" },
    ],
  },
  {
    id: "heroes",
    name: "Ruleta de Héroes",
    description: "Jugadores destacados de las últimas temporadas",
    image: "/shop/ruleta-heroes.jpg",
    items: [
      { id: "h1", name: "Diego Martínez", rarity: "epic", image: "/items/hero-martinez.jpg", description: "Héroe del Atlético Norte" },
      { id: "h2", name: "Marco Santos", rarity: "epic", image: "/items/hero-santos.jpg", description: "Héroe del Real Sur FC" },
      { id: "h3", name: "Lucas Silva", rarity: "rare", image: "/items/hero-silva.jpg", description: "Héroe del FC Madrid Central" },
      { id: "h4", name: "Mateo Cruz", rarity: "rare", image: "/items/hero-cruz.jpg", description: "Héroe del Sporting Elite" },
      { id: "h5", name: "Alejandro Ríos", rarity: "rare", image: "/items/hero-rios.jpg", description: "Héroe de Unión Este" },
      { id: "h6", name: "Pack Premium", rarity: "epic", image: "/items/premium-pack.jpg", description: "5.000 monedas + items exclusivos" },
      { id: "h7", name: "Jugador Épico Random", rarity: "epic", image: "/items/random-epic.jpg", description: "Un jugador épico aleatorio" },
      { id: "h8", name: "Consumible Raro", rarity: "rare", image: "/items/consumable-rare.jpg", description: "Item consumible especial" },
    ],
  },
  {
    id: "iconos",
    name: "Ruleta de Íconos",
    description: "Las leyendas más grandes del fútbol mundial",
    image: "/shop/ruleta-iconos.jpg",
    items: [
      { id: "i1", name: "Lionel Messi", rarity: "legendary", image: "/items/icon-messi.jpg", description: "Leyenda viviente del fútbol" },
      { id: "i2", name: "Cristiano Ronaldo", rarity: "legendary", image: "/items/icon-ronaldo.jpg", description: "La máquina de goles" },
      { id: "i3", name: "Neymar Jr", rarity: "legendary", image: "/items/icon-neymar.jpg", description: "El mago brasileño" },
      { id: "i4", name: "Zinedine Zidane", rarity: "legendary", image: "/items/icon-zidane.jpg", description: "Elegancia pura" },
      { id: "i5", name: "Ronaldinho", rarity: "legendary", image: "/items/icon-ronaldinho.jpg", description: "El fútbol alegre" },
      { id: "i6", name: "Ronaldo Nazário", rarity: "legendary", image: "/items/icon-r9.jpg", description: "El Fenómeno" },
      { id: "i7", name: "Pack Legendario", rarity: "legendary", image: "/items/legendary-pack.jpg", description: "10.000 monedas + ícono garantizado" },
      { id: "i8", name: "Ícono Aleatorio", rarity: "legendary", image: "/items/random-legend.jpg", description: "Un ícono sorpresa" },
    ],
  },
]

export function getRouletteTypeById(id: string): RouletteType | undefined {
  return rouletteTypes.find((type) => type.id === id)
}

export function getRarityColor(rarity: RouletteItem["rarity"]): string {
  return rarityColors[rarity]
}

export function getRarityName(rarity: RouletteItem["rarity"]): string {
  const names: Record<RouletteItem["rarity"], string> = {
    common: "Común",
    uncommon: "Infrecuente",
    rare: "Raro",
    epic: "Épico",
    legendary: "Legendario",
  }
  return names[rarity]
}

export function spinRoulette(items: RouletteItem[]): RouletteItem {
  // Weighted random selection based on rarity
  const weights: Record<RouletteItem["rarity"], number> = {
    common: 40,
    uncommon: 30,
    rare: 18,
    epic: 9,
    legendary: 3,
  }
  
  const weightedItems = items.flatMap((item) => 
    Array(weights[item.rarity]).fill(item)
  )
  
  const randomIndex = Math.floor(Math.random() * weightedItems.length)
  return weightedItems[randomIndex]
}
