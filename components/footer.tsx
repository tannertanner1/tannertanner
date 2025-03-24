import Link from 'next/link'
import { IconCopyright } from '@tabler/icons-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full py-6'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6'>
        <div className='text-muted-foreground flex items-center'>
          <IconCopyright className='mr-1 h-3 w-3' aria-hidden='true' />
          <span className='text-sm'>{currentYear}</span>
        </div>
        <Link
          // href='/contact'
          href='/'
          className='text-muted-foreground hover:text-primary flex items-center transition-colors'
        >
          <span className='text-sm'>tanner@tannertanner.me</span>
        </Link>
      </div>
    </footer>
  )
}
