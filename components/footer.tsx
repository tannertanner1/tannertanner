'use client'

import { IconCopyright, IconAt } from '@tabler/icons-react'
import { toast } from 'sonner'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const email = 'tannertanner.me'

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast('Copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        toast.error('Failed to copy!')
      })
  }

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
        <button
          onClick={copyToClipboard}
          className='text-muted-foreground flex cursor-pointer items-center'
          aria-label='Copy email to clipboard'
        >
          <span className='inline-flex h-4 w-4 items-center justify-center rounded-full'>
            <IconAt className='h-2.5 w-2.5' aria-hidden='true' />
          </span>
          <span className='-ml-0.5 text-sm'>{email}</span>
        </button>
      </div>
    </footer>
  )
}
