import type { Metadata } from 'next'
import { Slackside_One, LXGW_WenKai_Mono_TC } from 'next/font/google'
import '@/app/globals.css'
import Providers from '@/app/providers'
import { cn } from '@/lib/utils'

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

export const metadata: Metadata = {
  title: 'tannertanner.me',
  description: '@tannertanner1',
  icons: { icon: [{ rel: 'icon', type: 'image/svg+xml', url: '/icon.svg' }] },
  openGraph: {
    title: 'tannertanner.me',
    description: '@tannertanner1',
    images: {
      url: 'https://tannertanner.me/image.png', // Must be an absolute URL
      alt: '',
      width: 800,
      height: 400
    },
    url: 'https://tannertanner.me',
    siteName: 'tannertanner.me',
    type: 'website'
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
          'bg-background min-h-screen antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
