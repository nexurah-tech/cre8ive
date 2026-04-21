import type { Metadata } from 'next'
import { DM_Sans, Bebas_Neue, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-sans' });
const _bebasNeue = Bebas_Neue({ weight: '400', subsets: ["latin"], variable: '--font-display' });
const _spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-mono' });

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
    <html lang="en" className={`${_dmSans.variable} ${_bebasNeue.variable} ${_spaceMono.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink cursor-none">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
