import type { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"
import { config } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { Providers } from "@/components/providers"
import { Container } from "@/components/container"
import "./globals.css"

const META_THEME_COLORS = { light: "#ffffff", dark: "#09090b" }

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
  metadataBase: new URL(config.url),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        </Providers>
      </body>
    </html>
  )
}

// import type { Metadata, Viewport } from "next"
// import { cookies } from "next/headers"
// import { cn } from "@/lib/utils"
// import { config } from "@/lib/config"
// import { fontVariables } from "@/lib/fonts"
// import { ThemeProvider } from "@/components/theme-provider"
// import { ActiveThemeProvider } from "@/components/active-theme"
// import { Toaster } from "@/components/ui/sonner"
// import { Container } from "@/components/container"
// import "./globals.css"

// const META_THEME_COLORS = { light: "#ffffff", dark: "#09090b" }

// export const metadata: Metadata = {
//   title: config.name,
//   description: config.description,
//   metadataBase: new URL(config.url),
//   authors: [
//     {
//       name: config.name,
//       url: config.url,
//     },
//   ],
//   creator: config.username,
//   // icons: { icon: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }] },
//   icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
//   openGraph: {
//     type: "website",
//     siteName: config.domain,
//     url: config.url,
//     title: config.name,
//     description: config.description,
//     images: [
//       {
//         url: config.og,
//         width: 1600,
//         height: 800,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: config.name,
//     description: config.description,
//     images: [config.og],
//     creator: `@${config.username}`,
//   },
// }

// export const viewport: Viewport = { themeColor: META_THEME_COLORS.light }

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const cookieStore = await cookies()
//   const activeThemeValue = cookieStore.get("active_theme")?.value || "default"
//   const isScaled = activeThemeValue?.endsWith("-scaled")

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               try {
//                 if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//                   document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
//                 }
//               } catch (_) {}
//             `,
//           }}
//         />
//       </head>
//       <body
//         className={cn(
//           "bg-background antialiased",
//           activeThemeValue ? `theme-${activeThemeValue}` : "",
//           isScaled ? "theme-scaled" : "",
//           fontVariables
//         )}
//         style={
//           {
//             "--container-padding": "0.5rem",
//             "--content-padding": "0",
//           } as React.CSSProperties
//         }
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//           enableColorScheme
//         >
//           <ActiveThemeProvider initialTheme={activeThemeValue}>
//             <Container>{children}</Container>
//             <Toaster />
//           </ActiveThemeProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
