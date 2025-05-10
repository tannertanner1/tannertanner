import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <div className="inset-ring-background relative flex min-h-screen flex-col inset-ring">
        <main className="mx-auto w-full max-w-5xl grow px-6 pt-10">
          <div className="py-10">
            <div className="@container space-y-32">
              <Hero />
              <Projects />
              <Experience />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
