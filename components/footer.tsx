'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { IconCopyright, IconCopy, IconCheck, IconAt } from '@tabler/icons-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const email = 'tannertanner.me'

  return (
    <footer className='w-full py-4'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6'>
        <div className='text-muted-foreground flex items-center'>
          <IconCopyright
            className='mr-1 h-3 w-3 flex-shrink-0 self-center'
            aria-hidden='true'
          />
          <span className='text-sm'>{currentYear}</span>
        </div>
        <Copy textToCopy={email} displayText={email} />
      </div>
    </footer>
  )
}

function Copy({
  textToCopy,
  displayText
}: {
  textToCopy: string
  displayText: string
}) {
  const [state, setState] = useState<'default' | 'hover' | 'copied'>('default')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (state === 'copied') {
      timeoutRef.current = setTimeout(() => {
        setState('default')
      }, 1500)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state])

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setState('copied')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  const handleMouseEnter = () => {
    if (state !== 'copied') {
      setState('hover')
    }
  }

  const handleMouseLeave = () => {
    if (state !== 'copied') {
      setState('default')
    }
  }

  return (
    <button
      className='text-muted-foreground flex cursor-pointer items-center'
      onClick={handleCopy}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Copy ${textToCopy} to clipboard`}
    >
      <span className='relative inline-flex h-4 w-4 items-center justify-center rounded-full'>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: state === 'default' ? 1 : 0,
            scale: state === 'default' ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
          className='absolute'
        >
          <IconAt className='h-2.5 w-2.5' aria-hidden='true' />
        </motion.span>

        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: state === 'hover' ? 1 : 0,
            scale: state === 'hover' ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
          className='absolute'
        >
          <IconCopy className='h-2.5 w-2.5' aria-hidden='true' />
        </motion.span>

        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: state === 'copied' ? 1 : 0,
            scale: state === 'copied' ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
          className='absolute'
        >
          <IconCheck className='h-2.5 w-2.5' aria-hidden='true' />
        </motion.span>
      </span>
      <span className='-ml-0.5 text-sm'>{displayText}</span>
    </button>
  )
}
