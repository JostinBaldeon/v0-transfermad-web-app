import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Tag } from "lucide-react"
import { news, formatDate, getCategoryName } from "@/lib/data/news"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Noticias | TransferMad",
  description: "Todas las noticias de la Mad League. Fichajes, premios, actualizaciones y más.",
}

export default function NoticiasPage() {
  // Sort news by date (newest first)
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Todas las noticias
          </h1>
          <p className="text-lg text-muted-foreground">
            Mantente al día con las últimas novedades de la Mad League, 
            fichajes, premios y actualizaciones.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNews.map((article, index) => (
            <Link
              key={article.id}
              href={`/noticias/${article.slug}`}
              className={`group block ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <article className="h-full rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
                {/* Image placeholder */}
                <div 
                  className={`relative bg-gradient-to-br from-primary/20 to-accent/20 ${
                    index === 0 ? "h-64 md:h-80" : "h-48"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Tag className="h-8 w-8 text-primary/60" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {getCategoryName(article.category)}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>

                  <h2 className={`font-bold text-foreground mb-2 group-hover:text-primary transition-colors ${
                    index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}>
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    Leer más
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
