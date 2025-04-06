import type { Metadata, Viewport } from 'next'
import { Slackside_One, LXGW_WenKai_Mono_TC } from 'next/font/google'
import '@/app/globals.css'
import Providers from '@/app/providers'
import { cn } from '@/lib/utils'
import { config } from '@/lib/config'

const fontSans = Slackside_One({
  variable: '--font-slackside-one',
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
const fontMono = LXGW_WenKai_Mono_TC({
  variable: '--font-lxgw-wenkai-mono-tc',
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' }
  ]
}

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
  metadataBase: new URL(config.url),
  authors: [
    {
      name: config.name,
      url: config.url
    }
  ],
  creator: config.username,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
    // icon: [{ rel: 'icon', type: 'image/svg+xml', url: '/icon.svg' }],
    // apple: [{ url: '/icon.svg', sizes: '180x180', type: 'icon/svg' }]
  },
  openGraph: {
    type: 'website',
    siteName: config.domain,
    url: config.url,
    title: config.name,
    description: config.description,
    images: [
      {
        url: config.og,
        width: 1600,
        height: 800
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: config.name,
    description: config.description,
    images: [config.og],
    creator: `@${config.username}`
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          // 'bg-background min-h-screen antialiased',
          'bg-background antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
