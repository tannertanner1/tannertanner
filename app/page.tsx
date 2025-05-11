import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <div className="inset-ring-background relative flex min-h-screen flex-col px-4 inset-ring">
        <main className="mx-auto w-full max-w-5xl grow pt-10">
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
