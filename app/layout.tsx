import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono, Unbounded } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const _outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const _jetbrains = JetBrains_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
})

const _unbounded = Unbounded({
  subsets: ["latin"],
  variable: '--font-unbounded',
  weight: ['400', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CR8IVE - Digital Growth Agency',
  description: 'Data-driven creative strategy to grow your brand 8X faster. Performance marketing that delivers real results.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_jakarta.variable} ${_outfit.variable} ${_jetbrains.variable} ${_unbounded.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink cursor-none">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
