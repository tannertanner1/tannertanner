import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <main className='mx-auto w-full max-w-5xl flex-grow px-6'>
        <div className='py-10'>
          <div className='space-y-32'>
            <Hero />
            <Projects />
            <Experience />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
