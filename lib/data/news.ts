import { createClient } from "@/lib/supabase/server"

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

// Database row type (matches Supabase table structure)
interface NewsRow {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: "premios" | "actualizacion" | "temporada" | "records" | "fichajes"
  published_at: string
  author: string
  related_news: string[] | null
  created_at: string
  updated_at: string
}

// Transform database row to NewsArticle
function transformNewsRow(row: NewsRow): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    category: row.category,
    publishedAt: row.published_at,
    author: row.author,
    relatedNews: row.related_news || [],
  }
}

// Fetch all news articles from Supabase
export async function getNews(): Promise<NewsArticle[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching news:", error)
    return []
  }

  return (data as NewsRow[]).map(transformNewsRow)
}

// Fetch a single news article by slug
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching news article:", error)
    return null
  }

  return transformNewsRow(data as NewsRow)
}

// Fetch related news articles
export async function getRelatedNews(relatedSlugs: string[]): Promise<NewsArticle[]> {
  if (!relatedSlugs || relatedSlugs.length === 0) return []
  
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .in("slug", relatedSlugs)

  if (error) {
    console.error("Error fetching related news:", error)
    return []
  }

  return (data as NewsRow[]).map(transformNewsRow)
}

// Fetch news by category
export async function getNewsByCategory(category: NewsArticle["category"]): Promise<NewsArticle[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("category", category)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching news by category:", error)
    return []
  }

  return (data as NewsRow[]).map(transformNewsRow)
}

// Fetch all slugs (for generateStaticParams)
export async function getAllNewsSlugs(): Promise<string[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("news")
    .select("slug")

  if (error) {
    console.error("Error fetching news slugs:", error)
    return []
  }

  return data.map((row: { slug: string }) => row.slug)
}

// Helper functions (no database access needed)
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
