import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppHeader } from '@/components/app-header'
import { Footer } from '@/components/footer'
import { AuthProvider } from '@/components/auth-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TransferMad | El Mercado de Todos',
  description: 'El portal oficial de la Mad League. Explora clubes, jugadores, noticias y más del mercado de fichajes más emocionante.',
  generator: 'v0.app',
  keywords: ['fútbol', 'Mad League', 'fichajes', 'transferencias', 'clubes', 'jugadores'],
  openGraph: {
    title: 'TransferMad | El Mercado de Todos',
    description: 'El portal oficial de la Mad League',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <AppHeader />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
