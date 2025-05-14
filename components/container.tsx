"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [viewportHeight, setViewportHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if device is mobile and get viewport height
  useEffect(() => {
    const checkMobileAndViewport = () => {
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)

      // Capture the viewport height
      const vh = window.innerHeight
      setViewportHeight(vh)

      // Apply fixed height to main container on mobile
      if (containerRef.current) {
        containerRef.current.style.height = isMobileDevice ? `${vh}px` : "100vh"
      }

      // Set CSS variable for viewport height
      document.documentElement.style.setProperty(
        "--viewport-height",
        isMobileDevice ? `${vh}px` : "100vh"
      )

      // Prevent body scrolling
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    }

    checkMobileAndViewport()
    window.addEventListener("resize", checkMobileAndViewport)
    return () => window.removeEventListener("resize", checkMobileAndViewport)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col overflow-hidden", className)}
      style={{
        height: isMobile ? `${viewportHeight}px` : "100vh",
        maxHeight: isMobile ? `${viewportHeight}px` : "100vh",
      }}
    >
      <div className="content-wrapper">
        <div className="content-container @container">
          <div className="scrollable-content">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { Container }
