import { unstable_ViewTransition as ViewTransition } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

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
      { name: "postgres", url: "https://www.postgresql.org/" },
    ],
  ],
}

function Hero() {
  return (
    <section id="hero" className="pt-16">
      <div className="relative pb-64 @3xl:grid @3xl:grid-cols-2 @3xl:gap-8 @3xl:pb-0">
        <div className="mb-16 max-w-md @3xl:mb-0">
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
          {/* <h1 className="text-4xl font-bold">{data.name}</h1> */}
          <h2 className="text-muted-foreground mt-2 text-xl">{data.title}</h2>
          <p className="text-muted-foreground mt-2 flex items-center text-lg">
            {data.location}
          </p>
          <div className="mt-6">
            <div className={cn("flex flex-col gap-2")}>
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
                      <Badge variant="secondary">{tech.name}</Badge>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 flex h-64 w-64 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[var(--activity-0)] @3xl:relative @3xl:bottom-auto @3xl:left-auto @3xl:translate-x-0 @3xl:justify-self-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo.png"
            alt={data.username}
            // width={2048}
            // height={1664}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export { Hero }
