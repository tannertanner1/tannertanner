import Link from 'next/link'
import { IconCode } from '@tabler/icons-react'

export function Component({
  project
}: {
  project: { title: string; type: string; url: string; github: string }
}) {
  return (
    <div className='space-y-4'>
      <div className='border-border inset-shadow-md h-48 w-full rounded-lg border inset-shadow-black/10 md:h-56 dark:inset-shadow-white/5'></div>
      <div className='flex items-center justify-between'>
        <Link
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-primary text-lg transition-colors'
        >
          {project.title}
        </Link>
        <Link
          href={project.github}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`View code for ${project.title}`}
        >
          <IconCode
            className='text-muted-foreground hover:text-primary h-5 w-5 transition-colors'
            aria-hidden='true'
          />
        </Link>
      </div>
      <p className='text-muted-foreground'>{project.type}</p>
    </div>
  )
}
