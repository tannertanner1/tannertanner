import * as React from 'react'
import { useTheme } from 'next-themes'

const META_THEME_COLORS = { light: '#fbfbfb', dark: '#171717' }

export function useMetaColor() {
  const { resolvedTheme } = useTheme()

  const metaColor = React.useMemo(() => {
    return resolvedTheme !== 'dark'
      ? META_THEME_COLORS.light
      : META_THEME_COLORS.dark
  }, [resolvedTheme])

  const setMetaColor = React.useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color)
  }, [])

  return {
    metaColor,
    setMetaColor
  }
}
