import type { Metadata, Viewport } from "next"
import { config } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { Container } from "@/components/container"
import { Providers } from "@/components/providers"
import "./globals.css"

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#343739", // "#09090b",
}

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  alternates: { canonical: config.url },
  title: config.name,
  description: config.description,
  authors: [
    {
      name: config.name,
      url: config.url,
    },
  ],
  creator: config.username,
  // icons: { icon: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }] },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: config.domain,
    url: config.url,
    title: config.name,
    description: config.description,
    images: [
      {
        url: config.og,
        width: 1600,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.name,
    description: config.description,
    images: [config.og],
    creator: `@${config.username}`,
  },
}

export const viewport: Viewport = { themeColor: META_THEME_COLORS.light }

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: `${config.name} | ${config.domain}`,
      url: config.url,
      description: config.description,
      keywords: [
        config.username,
        config.name,
        "React",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Frontend",
        "Fullstack",
        "Developer Portfolio",
        "Tokyo Dev",
      ],
      author: {
        "@type": "Person",
        name: config.username,
        url: config.url,
        identifier: config.username,
      },
      image: {
        "@type": "ImageObject",
        url: config.og,
        width: 1600,
        height: 800,
        alt: config.username,
      },
      creator: config.username,
      publisher: {
        "@type": "Person",
        name: config.username,
        url: config.url,
      },
    },
    {
      "@type": "Person",
      name: config.name,
      alternateName: config.username,
      identifier: config.username,
      url: config.url,
      description: "Frontend Developer & Designer / Full-stack Generalist",
      jobTitle: "Frontend Developer & Designer / Full-stack Generalist",
      image: config.og,
      sameAs: [
        config.github,
        "https://x.com/tannertanner404",
        "https://omgbff.com",
        "https://ilutoo.com",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "UI/UX Design",
        "GitHub",
        "shadcn/ui",
        "Stripe",
        "Resend",
        "Authentication",
      ],
    },
    {
      "@type": "SoftwareSourceCode",
      name: "tannertanner",
      description:
        "Portfolio site by tannertanner1 built with Next.js 15, React 19, TypeScript, and TailwindCSS — featuring GitHub activity and side projects.",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js",
      codeSampleType: "full-solution",
      codeRepository: "https://github.com/tannertanner1/tannertanner",
      creator: {
        "@type": "Person",
        name: config.username,
        url: config.url,
      },
      author: {
        "@type": "Person",
        name: config.username,
        url: config.url,
      },
      about: {
        "@type": "WebSite",
        name: config.domain,
        url: config.url,
      },
      isAccessibleForFree: true,
      creativeWorkStatus: "Published",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (systemPrefersDark) {
                  document.documentElement.classList.add('dark');
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.light}');
                }

                // Listen for system preference changes
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                  if (e.matches) {
                    document.documentElement.classList.add('dark');
                    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.light}');
                  }
                });
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn("bg-background antialiased", fontVariables)}
        style={
          {
            "--container-padding": "0.5rem",
            "--content-padding": "0",
          } as React.CSSProperties
        }
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          enableColorScheme
        >
          <Container>{children}</Container>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
