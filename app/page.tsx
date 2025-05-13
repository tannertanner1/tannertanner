import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative mx-auto w-full max-w-5xl grow px-4">
      <div className="space-y-16">
        <Hero />
        <Projects />
        <Experience />
      </div>
      <Footer />
    </main>
  )
}
