"use client"

import { useEffect, useRef, useState } from "react"
import {
  IconArrowUpRight,
  IconAt,
  IconCheck,
  IconCopy,
} from "@tabler/icons-react"
import { motion } from "motion/react"
import { config } from "@/lib/config"

function Footer() {
  return (
    <footer className="flex items-center justify-between py-4">
      <Github
        href={config.github}
        text={config.username}
        defaultIcon={<IconAt className="h-2.5 w-2.5" />}
        hoverIcon={<IconArrowUpRight className="h-2.5 w-2.5" />}
        ariaLabel={`Visit ${config.username}'s GitHub profile`}
      />
      <p
        className="sr-only"
        // className="text-muted-foreground text-sm"
      >
        Built by {config.username}. The source code is available on{" "}
        <a href={config.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
      <Email
        textToCopy={config.email}
        displayText={config.domain}
        ariaLabel={`Copy email address ${config.email} to clipboard`}
      />
    </footer>
  )
}

// Base component for animated icon transitions
function Icon({
  isVisible,
  children,
}: {
  isVisible: boolean
  children: React.ReactNode
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 0.2 }}
      className="absolute"
    >
      {children}
    </motion.span>
  )
}

// Reusable component for links with icon animations
function Github({
  href,
  text,
  defaultIcon,
  hoverIcon,
  ariaLabel,
}: {
  href: string
  text: string
  defaultIcon: React.ReactNode
  hoverIcon: React.ReactNode
  ariaLabel: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground group -ml-0.5 flex cursor-pointer items-center"
      aria-label={ariaLabel}
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full">
        <span className="absolute transition-all duration-200 group-hover:scale-50 group-hover:opacity-0">
          {defaultIcon}
        </span>
        <span className="absolute scale-50 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
          {hoverIcon}
        </span>
      </span>
      <span className="-ml-0.5 text-sm">{text}</span>
    </a>
  )
}

// Copy button with three states (default, hover, copied)
function Email({
  textToCopy,
  displayText,
  ariaLabel,
}: {
  textToCopy: string
  displayText: string
  ariaLabel: string
}) {
  const [state, setState] = useState<"default" | "hover" | "copied">("default")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up timeout on unmount or state change
  useEffect(() => {
    if (state === "copied") {
      timeoutRef.current = setTimeout(() => setState("default"), 1500)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [state])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setState("copied")
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <button
      className="text-muted-foreground flex cursor-pointer items-center"
      onClick={handleCopy}
      onMouseEnter={() => state !== "copied" && setState("hover")}
      onMouseLeave={() => state !== "copied" && setState("default")}
      aria-label={ariaLabel}
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full">
        <Icon isVisible={state === "default"}>
          <IconAt className="h-2.5 w-2.5" aria-hidden="true" />
        </Icon>
        <Icon isVisible={state === "hover"}>
          <IconCopy className="h-2.5 w-2.5" aria-hidden="true" />
        </Icon>
        <Icon isVisible={state === "copied"}>
          <IconCheck className="h-2.5 w-2.5" aria-hidden="true" />
        </Icon>
      </span>
      <span className="-ml-0.5 text-sm">{displayText}</span>
    </button>
  )
}

export { Footer }
