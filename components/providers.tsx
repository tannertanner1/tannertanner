"use client"

import * as React from "react"
import { unstable_ViewTransition as ViewTransition } from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

function Providers({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <ThemeProvider {...props}>
      <ViewTransition>
        {children}
        <Toaster />
      </ViewTransition>
    </ThemeProvider>
  )
}

export { Providers }
