import { unstable_ViewTransition as ViewTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { IconCircleDashed } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

function Name() {
  return (
    <ViewTransition>
      <h1 className="text-4xl font-bold">
        <span className="sr-only">{data.name}</span>
        <span
          aria-hidden="true"
          className="group relative block overflow-hidden"
        >
          <span className="inline-block whitespace-nowrap transition-all duration-300 ease-in-out group-hover:-translate-y-full">
            {data.name.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>
          <span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
            {data.username.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block"
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

const data = {
  name: "Tanner",
  username: "tannertanner1",
  title: "Developer & Designer",
  location: "Tokyo, Japan",
  items: [
    [
      { name: "react", url: "https://react.dev/" },
      { name: "typescript", url: "https://www.typescriptlang.org/" },
      { name: "nextjs", url: "https://nextjs.org/" },
      { name: "tailwind", url: "https://tailwindcss.com/" },
    ],
    [
      { name: "motion", url: "https://motion.dev/" },
      { name: "shadcn", url: "https://ui.shadcn.com/" },
      { name: "drizzle", url: "https://orm.drizzle.team/" },
      { name: "postgres", url: "https://neon.tech/" },
    ],
  ],
}

function Tech({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {data.items.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-wrap gap-2">
          {row.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <Badge
                variant="secondary"
                // "className="bg-[#e8eaed] text-[#3c4043] transition-colors duration-300 group-hover:bg-[#3c4043] group-hover:text-[#e8eaed] "dark:bg-[#3c4043] dark:text-[#e8eaed] dark:group-hover:bg-[#e8eaed] dark:group-hover:text-[#3c4043]"
                className="text-primary bg-[#e8eaed] dark:bg-[#e8eaed]/50"
              >
                {tech.name}
              </Badge>
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section id="hero" className="pt-16">
      <div className="relative pb-64 @3xl:grid @3xl:grid-cols-2 @3xl:gap-8 @3xl:pb-0">
        <div className="mb-16 max-w-md @3xl:mb-0">
          <Name />
          {/* <h1 className="text-4xl font-bold">{data.name}</h1> */}
          <h2 className="text-muted-foreground mt-2 text-xl">{data.title}</h2>
          <p className="text-muted-foreground mt-2 flex items-center text-lg">
            {data.location}
          </p>
          <div className="mt-6">
            <Tech />
          </div>
        </div>
        {/* Placeholder */}
        <div className="border-border inset-shadow-md absolute bottom-0 left-1/2 flex h-64 w-64 -translate-x-1/2 items-center justify-center rounded-full border inset-shadow-black/10 @3xl:relative @3xl:bottom-auto @3xl:left-auto @3xl:translate-x-0 @3xl:justify-self-end dark:inset-shadow-white/5">
          <IconCircleDashed
            className="text-accent dark:text-primary/50 h-16 w-16"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}

export { Hero }
