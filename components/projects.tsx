import { IconCode } from "@tabler/icons-react"
import { config } from "@/lib/config"

function Projects() {
  return (
    <section id="projects">
      <h2 className="text-4xl font-bold">{config.projects.heading}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 @3xl:grid-cols-2">
        {config.projects.items.map(({ domain, github, preview, open }) => (
          <div key={domain} className="space-y-4">
            <div className="border-border relative aspect-[830/499] w-full overflow-hidden rounded-[0.625rem] border">
              <img
                src={preview.light}
                alt={`${domain} preview`}
                className="absolute inset-0 block origin-center scale-[101%] object-cover pb-0.5 dark:hidden"
              />
              <img
                src={preview.dark}
                alt={`${domain} dark preview`}
                className="absolute inset-0 hidden origin-center scale-[101%] object-cover pb-0.5 dark:block"
              />
            </div>
            <div className="flex items-center justify-between">
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg"
              >
                {domain}
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${domain}`}
              >
                <span
                  className={open ? "cursor-pointer" : "cursor-not-allowed"}
                  aria-disabled={!open}
                >
                  <IconCode
                    className="text-muted-foreground/40 h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Projects }
