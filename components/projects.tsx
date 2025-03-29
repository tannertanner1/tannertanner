import Link from 'next/link'
import { IconCode, IconBorderCorners } from '@tabler/icons-react'

const data = {
  heading: 'Selected Projects',
  items: [
    {
      title: 'omgbff.com',
      type: 'Invoices',
      url: 'https://omgbff.com',
      github: 'https://github.com/tannertanner1/omgbff'
    },
    {
      title: 'ilutoo.com',
      type: 'Products',
      url: 'https://ilutoo.com',
      github: 'https://github.com/tannertanner1/ilutoo'
    }
  ]
}

export function Projects() {
  return (
    <section id='projects'>
      <h2 className='text-4xl font-bold'>{data.heading}</h2>
      <div className='mt-8 grid grid-cols-1 gap-16 md:grid-cols-2'>
        {data.items.map(project => (
          <div key={project.title} className='space-y-4'>
            {/* Placeholder */}
            <div className='border-border inset-shadow-md flex h-48 w-full items-center justify-center rounded-lg border inset-shadow-black/10 md:h-56 dark:inset-shadow-white/5'>
              <IconBorderCorners
                className='text-accent h-16 w-16'
                aria-hidden='true'
              />
            </div>
            <div className='flex items-center justify-between'>
              <Link
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg'
              >
                {project.title}
              </Link>
              <Link
                href={project.github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View code for ${project.title}`}
              >
                <span
                  className='text-muted-foreground/40 cursor-not-allowed'
                  aria-disabled='true'
                >
                  <IconCode
                    className='pointer-events-none h-5 w-5'
                    aria-hidden='true'
                  />
                </span>
                {/* <IconCode
                  className='text-muted-foreground h-5 w-5'
                  aria-hidden='true'
                /> */}
              </Link>
            </div>
            {/* <p className='text-muted-foreground'>{project.type}</p> */}
          </div>
        ))}
      </div>
    </section>
  )
}
