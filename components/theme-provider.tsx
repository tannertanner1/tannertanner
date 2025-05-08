"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { unstable_ViewTransition as ViewTransition } from "react"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ViewTransition>{children}</ViewTransition>
    </NextThemesProvider>
  )
}
