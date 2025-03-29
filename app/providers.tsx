'use client'

import type React from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
// import { Toaster } from '@/components/ui/sonner'
import { unstable_ViewTransition as ViewTransition } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      <ViewTransition>{children}</ViewTransition>
      {/* {children} */}
      {/* <ToasterProvider /> */}
    </ThemeProvider>
  )
}

// function ToasterProvider() {
//   const { resolvedTheme } = useTheme()

//   return (
//     <Toaster
//       richColors
//       position='bottom-right'
//       theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
//     />
//   )
// }
