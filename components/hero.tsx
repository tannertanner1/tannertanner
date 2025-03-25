import { IconAt } from '@tabler/icons-react'
import Link from 'next/link'

const data = {
  name: 'Tanner',
  title: 'Developer & Designer',
  location: 'Tokyo, Japan',
  username: 'tannertanner1',
  github: 'https://github.com/tannertanner1'
}

export function Hero() {
  return (
    <section id='hero' className='pt-6'>
      <div className='relative pb-64 md:h-64 md:pb-0'>
        <div className='mb-16 max-w-md md:mb-0'>
          <h1 className='text-4xl font-bold'>{data.name}</h1>
          <h2 className='text-muted-foreground mt-2 text-xl'>{data.title}</h2>
          <p className='text-muted-foreground mt-2 flex items-center text-lg'>
            {data.location}
            <Link
              href={data.github}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center'
            >
              <span className='ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full'>
                <IconAt className='h-3 w-3' aria-hidden='true' />
              </span>
              <span className='-ml-0.5'>{data.username}</span>
            </Link>
          </p>
        </div>

        <div className='border-border inset-shadow-md absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border inset-shadow-black/10 md:top-0 md:right-0 md:left-auto md:translate-x-0 dark:inset-shadow-white/5'></div>
      </div>
    </section>
  )
}
