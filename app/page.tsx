import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className='inset-ring-primary/10 relative flex min-h-screen flex-col inset-ring'>
      <Header />
      <main className='mx-auto w-full max-w-5xl flex-grow px-6 pb-12'>
        <div className='space-y-24 pt-12'>
          {/* Hero Section */}
          <Hero />
          {/* Selected Projects */}
          <Projects />
          {/* Work Experience */}
          <Experience />
        </div>
      </main>
      <Footer />
    </div>
  )
}

/**
<Link href={siteConfig.github}className="flex items-center text-muted-foreground hover:text-primary transition-colors">
  <IconAt className="h-3 w-3" aria-hidden="true" />
  <span className="text-sm">{siteConfig.author}</span>
</Link>

// {
//   title: "tannertanner.me",
//   type: "Portfolio",
//   url: "https://tannertanner.me",
//   github: "https://github.com/tannertanner1/tannertanner",
// },
*/
