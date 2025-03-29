import { unstable_ViewTransition as ViewTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import { IconCircleDashed } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

function Name() {
  return (
    <ViewTransition>
      <h1 className='text-4xl font-bold'>
        <span className='sr-only'>Tanner</span>
        <span
          aria-hidden='true'
          className='group relative block overflow-hidden'
        >
          <span className='inline-block whitespace-nowrap transition-all duration-300 ease-in-out group-hover:-translate-y-full'>
            {'Tanner'.split('').map((letter, index) => (
              <span
                key={index}
                className='inline-block'
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
          <span className='absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0'>
            {'tannertanner1'.split('').map((letter, index) => (
              <span
                key={index}
                className='inline-block'
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </span>
      </h1>
    </ViewTransition>
  )
}

const rows = [
  ['react', 'typescript', 'nextjs', 'tailwindcss'],
  ['motion', 'shadcn', 'drizzle', 'postgres']
]
const data = {
  name: 'Tanner',
  title: 'Developer & Designer',
  location: 'Tokyo, Japan'
}

function Tech({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex flex-wrap gap-2'>
          {row.map(tech => (
            <Badge key={tech} variant='secondary' className='font-mono'>
              {tech}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section id='hero' className='pt-6'>
      <div className='relative pb-64 md:grid md:grid-cols-2 md:gap-8 md:pb-0'>
        <div className='mb-16 max-w-md md:mb-0'>
          <Name />
          {/* <h1 className='text-4xl font-bold'>{data.name}</h1> */}
          <h2 className='text-muted-foreground mt-2 text-xl'>{data.title}</h2>
          <p className='text-muted-foreground mt-2 flex items-center text-lg'>
            {data.location}
          </p>
          <div className='mt-6'>
            <Tech />
          </div>
        </div>
        {/* Placeholder */}
        <div className='border-border inset-shadow-md absolute bottom-0 left-1/2 flex h-64 w-64 -translate-x-1/2 items-center justify-center rounded-full border inset-shadow-black/10 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:justify-self-end dark:inset-shadow-white/5'>
          <IconCircleDashed
            className='text-accent h-16 w-16'
            aria-hidden='true'
          />
        </div>
      </div>
    </section>
  )
}

/**
 * @see https://github.com/leerob/site/blob/main/app/name.tsx
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition
 * @see https://motion.dev/blog/reacts-experimental-view-transition-api
 */
