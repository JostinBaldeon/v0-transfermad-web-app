export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: "premios" | "actualizacion" | "temporada" | "records" | "fichajes"
  publishedAt: string
  author: string
  relatedNews?: string[]
}

export const news: NewsArticle[] = [
  {
    id: "1",
    slug: "premios-temporada-35",
    title: "Premios de la Temporada 35: Los mejores del año",
    excerpt: "Descubre quiénes fueron los jugadores más destacados de esta temporada en todas las categorías.",
    content: `
La Temporada 35 de la Mad League ha llegado a su fin y es momento de reconocer a los mejores jugadores que han brillado durante todo el año.

## Mejor Jugador de la Temporada 35

El galardón más codiciado de la liga ha recaído en **Lionel Messi** del FC Madrid Central, quien a pesar de su edad sigue demostrando que es una leyenda viviente del fútbol. Con 28 goles y 22 asistencias, el argentino ha sido fundamental en el título de su equipo.

## Mejor Portero

**Carlos Méndez** del FC Madrid Central se ha llevado el premio al mejor guardameta, con un total de 18 porterías a cero durante la temporada.

## Mejor Defensor

**Pablo García** del Atlético Norte ha sido reconocido como el mejor defensor, destacando por su consistencia y liderazgo en la zaga.

## Mejor Centrocampista

**Diego Martínez** del Atlético Norte se ha alzado con este premio gracias a su visión de juego y capacidad para marcar goles importantes.

## Mejor Delantero

**Marco Santos** del Real Sur FC ha sido el máximo goleador de la temporada con 32 tantos, lo que le ha valido este reconocimiento.

## Mejor Jugador Joven

**Mateo Cruz** del Sporting Elite, con solo 22 años, ha demostrado un talento excepcional y se perfila como una de las futuras estrellas de la liga.

---

Felicitamos a todos los premiados y esperamos que la Temporada 36 nos traiga aún más emociones y grandes momentos de fútbol.
    `,
    image: "/news/premios-35.jpg",
    category: "premios",
    publishedAt: "2024-06-15",
    author: "Redacción TransferMad",
    relatedNews: ["premios-temporada-34", "records-goleadores-35"],
  },
  {
    id: "2",
    slug: "actualizacion-1-3",
    title: "Actualización 1.3: Nuevas funciones y mejoras",
    excerpt: "La nueva actualización trae importantes mejoras en el sistema de valoraciones y nuevas características.",
    content: `
Estamos emocionados de anunciar la **Actualización 1.3** de TransferMad, que incluye numerosas mejoras y nuevas funcionalidades.

## Nuevas Características

### Sistema de Valoraciones Mejorado
- Nuevo algoritmo de cálculo de valor de mercado más preciso
- Histórico de valoraciones por temporada
- Comparativas entre jugadores

### Perfil de Jugador Renovado
- Diseño más moderno y atractivo
- Estadísticas ampliadas
- Gráficos de rendimiento

### Tienda Actualizada
- Nueva ruleta de Íconos con jugadores legendarios
- Mejoras en la animación de las ruletas
- Sistema de recompensas

## Correcciones de Errores
- Solucionado problema con la búsqueda de jugadores
- Mejorado el rendimiento general de la aplicación
- Correcciones menores de interfaz

## Próximamente
- Sistema de logros y medallas
- Rankings en tiempo real
- Modo competitivo

---

Agradecemos a toda la comunidad por sus sugerencias y reportes que hacen de TransferMad una mejor plataforma cada día.
    `,
    image: "/news/actualizacion-1-3.jpg",
    category: "actualizacion",
    publishedAt: "2024-06-10",
    author: "Equipo Técnico",
    relatedNews: ["actualizacion-1-2"],
  },
  {
    id: "3",
    slug: "premios-temporada-34",
    title: "Premios de la Temporada 34: Resumen completo",
    excerpt: "Un repaso a los mejores jugadores de la temporada 34 y sus increíbles logros.",
    content: `
La Temporada 34 nos dejó momentos inolvidables. Aquí repasamos a los ganadores de cada categoría.

## Palmarés Completo

### MVP de la Temporada
**Cristiano Ronaldo** - Atlético Norte
El portugués demostró que la edad es solo un número con 35 goles en liga.

### Equipo del Año
- POR: Andrés Ruiz (Atlético Norte)
- DFC: Pablo García (Atlético Norte)
- DFC: Miguel Torres (FC Madrid Central)
- LI: Juan Ramírez (Real Sur FC)
- LD: Antonio Moreno (Deportivo Oeste)
- MC: Lucas Silva (FC Madrid Central)
- MC: Nicolás Fernández (Racing Capital)
- MCO: Diego Martínez (Atlético Norte)
- EI: Neymar Jr (Real Sur FC)
- ED: Lionel Messi (FC Madrid Central)
- DC: Cristiano Ronaldo (Atlético Norte)

### Revelación de la Temporada
**Alejandro Ríos** - Unión Este

### Mejor Entrenador
**Carlos Sánchez** - FC Madrid Central

---

Una temporada para el recuerdo que estableció nuevos récords en la historia de la Mad League.
    `,
    image: "/news/premios-34.jpg",
    category: "premios",
    publishedAt: "2024-01-20",
    author: "Redacción TransferMad",
    relatedNews: ["premios-temporada-35", "descarga-archivos-34"],
  },
  {
    id: "4",
    slug: "actualizacion-1-2",
    title: "Actualización 1.2: Hall de la Fama y Haaland",
    excerpt: "Nueva sección de Hall de la Fama y múltiples mejoras en la experiencia de usuario.",
    content: `
La **Actualización 1.2** ha llegado con una de las características más solicitadas por la comunidad: el Hall de la Fama.

## Hall de la Fama

La nueva sección reconoce a los jugadores más legendarios que han pasado por la Mad League:

- **Jugadores Leyenda**: Perfiles especiales para los más grandes
- **Técnicos Históricos**: Los entrenadores que marcaron época
- **Logros y Récords**: Todos los hitos importantes de la liga

## Mejoras en la Navegación

- Menú lateral rediseñado
- Búsqueda más rápida y precisa
- Filtros avanzados en tablas

## Optimización de Rendimiento

- Carga de páginas un 40% más rápida
- Mejor compresión de imágenes
- Caché inteligente

---

Continuamos trabajando para hacer de TransferMad la mejor plataforma para seguir la Mad League.
    `,
    image: "/news/actualizacion-1-2.jpg",
    category: "actualizacion",
    publishedAt: "2023-11-05",
    author: "Equipo Técnico",
    relatedNews: ["actualizacion-1-3"],
  },
  {
    id: "5",
    slug: "descarga-archivos-34",
    title: "Descarga de archivos de la Temporada 34",
    excerpt: "Ya están disponibles todos los archivos y estadísticas de la temporada 34 para descargar.",
    content: `
Ponemos a disposición de toda la comunidad los archivos completos de la **Temporada 34** de la Mad League.

## Contenido Disponible

### Estadísticas Completas
- Estadísticas de todos los jugadores
- Tablas de clasificación final
- Récords de la temporada

### Valoraciones
- Valoraciones de todos los equipos
- Evolución del valor de mercado
- Top 100 jugadores más valiosos

### Material Gráfico
- Fotos oficiales de plantillas
- Escudos en alta resolución
- Banners y wallpapers

## Cómo Descargar

1. Dirígete a la sección de Valoraciones
2. Selecciona la Temporada 34
3. Elige tu equipo
4. Haz clic en el botón de descarga

---

Recuerda que estos archivos son de uso exclusivo para la comunidad de la Mad League.
    `,
    image: "/news/descarga-34.jpg",
    category: "temporada",
    publishedAt: "2024-02-01",
    author: "Redacción TransferMad",
    relatedNews: ["premios-temporada-34"],
  },
  {
    id: "6",
    slug: "records-goleadores-35",
    title: "Récords de goleadores: Los números de la Temporada 35",
    excerpt: "Un análisis detallado de los máximos goleadores y los récords batidos esta temporada.",
    content: `
La Temporada 35 ha sido especialmente prolífica en cuanto a goles. Analizamos los números más impresionantes.

## Máximos Goleadores

| Pos | Jugador | Club | Goles |
|-----|---------|------|-------|
| 1 | Marco Santos | Real Sur FC | 32 |
| 2 | Cristiano Ronaldo | Atlético Norte | 28 |
| 3 | Lionel Messi | FC Madrid Central | 28 |
| 4 | Iván Gómez | Athletic City | 25 |
| 5 | Raúl Díaz | Racing Capital | 22 |

## Récords Batidos

### Nuevo Récord de Goles en una Temporada
**Marco Santos** ha superado el anterior récord de 30 goles, estableciendo la nueva marca en **32 tantos**.

### Mayor Número de Hat-tricks
**Cristiano Ronaldo** ha conseguido 5 hat-tricks esta temporada, igualando su propio récord.

### Goleadores Jóvenes
**Mateo Cruz** (22 años) se ha convertido en el goleador más joven en alcanzar los 20 goles en una temporada.

## Análisis por Equipos

El **Real Sur FC** ha sido el equipo más goleador con 85 goles en total, seguido del **FC Madrid Central** con 78.

---

Estos números demuestran el nivel competitivo y espectacular de nuestra liga.
    `,
    image: "/news/records-goleadores.jpg",
    category: "records",
    publishedAt: "2024-06-12",
    author: "Departamento de Estadísticas",
    relatedNews: ["premios-temporada-35"],
  },
  {
    id: "7",
    slug: "fichajes-verano-36",
    title: "Mercado de fichajes: Las operaciones del verano",
    excerpt: "Todas las altas y bajas de los clubes de la Mad League durante el mercado de verano.",
    content: `
El mercado de fichajes de verano ha cerrado con movimientos muy interesantes. Repasamos las operaciones más destacadas.

## Fichajes Estrella

### FC Madrid Central
- **ALTA**: Kevin De Bruyne (procedente de Europa)
- **BAJA**: Ninguna destacada

### Atlético Norte  
- **ALTA**: Erling Haaland (cesión)
- **BAJA**: Ninguna destacada

### Real Sur FC
- **ALTA**: Vinicius Jr (procedente de Europa)
- **BAJA**: Ninguna destacada

## Operaciones Más Caras

1. **Kevin De Bruyne** - 55 mill. €
2. **Vinicius Jr** - 48 mill. €
3. **Erling Haaland** (cesión) - 8 mill. € (ficha)

## Jóvenes Promesas

Varios clubes han apostado por el talento joven:
- Athletic Nuevo ficha a 3 canteranos del filial
- CD Progreso incorpora a dos joyas brasileñas
- Sporting Génesis apuesta por talento local

## Balance del Mercado

- **Total gastado**: 245 mill. €
- **Operaciones realizadas**: 47
- **Club más activo**: FC Madrid Central (8 fichajes)

---

La Temporada 36 promete ser la más competitiva de la historia de la Mad League.
    `,
    image: "/news/fichajes-verano.jpg",
    category: "fichajes",
    publishedAt: "2024-07-01",
    author: "Redacción TransferMad",
    relatedNews: ["premios-temporada-35"],
  },
]

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return news.find((article) => article.slug === slug)
}

export function getRelatedNews(articleId: string): NewsArticle[] {
  const article = news.find((a) => a.id === articleId)
  if (!article?.relatedNews) return []
  return news.filter((a) => article.relatedNews?.includes(a.slug))
}

export function getNewsByCategory(category: NewsArticle["category"]): NewsArticle[] {
  return news.filter((article) => article.category === category)
}

export function getCategoryName(category: NewsArticle["category"]): string {
  const categories: Record<NewsArticle["category"], string> = {
    premios: "Premios",
    actualizacion: "Actualización",
    temporada: "Temporada",
    records: "Récords",
    fichajes: "Fichajes",
  }
  return categories[category]
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
