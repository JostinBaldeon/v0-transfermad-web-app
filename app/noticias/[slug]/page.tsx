import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from "lucide-react"
import { formatDate, getCategoryName } from "@/lib/data/news"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const revalidate = 3600 // Revalidate every hour

interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: "premios" | "actualizacion" | "temporada" | "records" | "fichajes"
  published_at: string
  author: string
  related_news?: string[]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const { supabase } = await import("@/lib/supabase/client")
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return null
  }
}

async function getRelatedArticles(relatedSlugs: string[]): Promise<NewsArticle[]> {
  if (!relatedSlugs || relatedSlugs.length === 0) return []

  try {
    const { supabase } = await import("@/lib/supabase/client")
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .in("slug", relatedSlugs)

    if (error) {
      console.error("[v0] Error fetching related:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("[v0] Error fetching related articles:", error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: "Noticia no encontrada | TransferMad" }
  }

  return {
    title: `${article.title} | TransferMad`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      authors: [article.author],
    },
  }
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = article.related_news
    ? await getRelatedArticles(article.related_news)
    : []

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button asChild variant="ghost" className="mb-8 -ml-4">
            <Link href="/noticias" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a noticias
            </Link>
          </Button>

          {/* Hero image placeholder */}
          <div className="relative h-64 md:h-96 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-8 overflow-hidden">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <Tag className="h-12 w-12 text-primary/60" />
              </div>
            </div>
          </div>

          {/* Article header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {getCategoryName(article.category)}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.published_at}>
                  {formatDate(article.published_at)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </header>

          {/* Article content */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            {article.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {paragraph.replace("### ", "")}
                  </h3>
                )
              }
              if (paragraph.startsWith("---")) {
                return <hr key={index} className="my-8 border-border" />
              }
              if (paragraph.startsWith("| ")) {
                // Simple table rendering
                return (
                  <div key={index} className="overflow-x-auto my-4">
                    <pre className="text-sm text-muted-foreground">{paragraph}</pre>
                  </div>
                )
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="text-muted-foreground ml-4">
                    {paragraph.replace("- ", "")}
                  </li>
                )
              }
              if (paragraph.trim() === "") {
                return null
              }
              // Handle bold text
              const formattedParagraph = paragraph.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="text-foreground">$1</strong>'
              )
              return (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                />
              )
            })}
          </div>

          {/* Related news */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-border pt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Noticias relacionadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/noticias/${related.slug}`}
                    className="group block"
                  >
                    <article className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                      <Badge variant="secondary" className="mb-3">
                        {getCategoryName(related.category)}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        Leer más
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  )
}
