import { unstable_ViewTransition as ViewTransition } from "react"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function Hero() {
  return (
    <section id="hero" className="pt-16">
      <div className="relative pb-64 @3xl:grid @3xl:grid-cols-2 @3xl:gap-8 @3xl:pb-0">
        <div className="mb-16 max-w-md @3xl:mb-0">
          <ViewTransition>
            <h1 className="text-4xl font-bold">
              <span className="sr-only">{config.name}</span>
              <span
                aria-hidden="true"
                className="group relative block overflow-hidden"
              >
                <span className="inline-block whitespace-nowrap transition-all duration-300 ease-in-out group-hover:-translate-y-full">
                  {config.name.split("").map((letter, index) => (
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
                  {config.username.split("").map((letter, index) => (
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
          {/* <h1 className="text-4xl font-bold">{config.name}</h1> */}
          <p className="sr-only">{config.description}</p>
          <h2 className="text-muted-foreground mt-2 text-xl">{config.title}</h2>
          <div className="mt-8">
            <div className={cn("flex flex-wrap gap-2")}>
              {config.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <Badge variant="secondary">{item.name}</Badge>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 flex h-64 w-64 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[var(--activity-0)] @3xl:relative @3xl:bottom-auto @3xl:left-auto @3xl:translate-x-0 @3xl:justify-self-end">
          <img
            src="/photo.png"
            alt={config.username}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export { Hero }
