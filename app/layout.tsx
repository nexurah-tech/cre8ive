import type { Metadata } from 'next'
import { DM_Sans, Bebas_Neue, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-sans' });
const _bebasNeue = Bebas_Neue({ weight: '400', subsets: ["latin"], variable: '--font-display' });
const _spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'CR8IVE | Engineering Digital Dominance',
  description: 'Something Legendary is Preparing for Launch. Cr8ive is a next-generation growth engine built to scale high-performance brands through data-led creative strategy.',
  keywords: ['Digital Agency', 'Performance Marketing', 'Growth Engineering', 'Creative Strategy', 'Data-Driven Marketing', 'Cr8ive'],
  authors: [{ name: 'Cr8ive Engineering' }],
  openGraph: {
    title: 'CR8IVE | Engineering Digital Dominance',
    description: 'Something Legendary is Preparing for Launch. The next generation of acquisition engines is arriving shortly.',
    url: 'https://cr8ive.in',
    siteName: 'Cr8ive',
    images: [
      {
        url: '/cre8ive-removebg-preview.png',
        width: 1200,
        height: 630,
        alt: 'CR8IVE Launch Sequence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CR8IVE | Engineering Digital Dominance',
    description: 'Something Legendary is Preparing for Launch. Sequence Initiated.',
    images: ['/cre8ive-removebg-preview.png'],
  },
  icons: {
    icon: '/cre8ive-removebg-preview.png',
    apple: '/cre8ive-removebg-preview.png',
  },
  robots: {
    index: true,
    follow: true,
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
