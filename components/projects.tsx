import { IconCode, IconBorderCorners } from "@tabler/icons-react"

const data = {
  heading: "Selected Projects",
  items: [
    {
      title: "omgbff.com",
      type: "Invoices",
      url: "https://omgbff.com",
      github: "https://github.com/tannertanner1/omgbff",
    },
    {
      title: "ilutoo.com",
      type: "Products",
      url: "https://ilutoo.com",
      github: "https://github.com/tannertanner1/ilutoo",
    },
  ],
}

function Projects() {
  return (
    <section id="projects">
      <h2 className="text-4xl font-bold">Selected Projects</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 @xl:grid-cols-2">
        {/* {data.items.map((project) => (
          <div key={project.title} className="space-y-4">
            <div className="border-border inset-shadow-md flex h-48 w-full items-center justify-center rounded-lg border inset-shadow-black/10 @xl:h-56 dark:inset-shadow-white/5">
              <IconBorderCorners
                // className="text-accent dark:text-primary/50 h-16 w-16"
                className="text-secondary/90 h-16 w-16"
                aria-hidden="true"
              />
            </div>
            <div className="flex items-center justify-between">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg"
              >
                {project.title}
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${project.title}`}
              >
                <span className="cursor-not-allowed" aria-disabled="true">
                  <IconCode
                    className="text-muted-foreground/40 pointer-events-none h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
            <p className='text-muted-foreground'>{project.type}</p>
          </div>
        ))} */}

        {/* omgbff */}
        <div className="space-y-4">
          <div className="border-border inset-shadow-md flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border inset-shadow-black/10 @xl:h-56 dark:inset-shadow-white/5">
            {/* TODO: replace with screen recording GIF */}
            <IconBorderCorners className="text-secondary/90 h-16 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <a
              href={data.items[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
            >
              {data.items[0].title}
            </a>
            <a
              href={data.items[0].github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${data.items[0].title}`}
            >
              <span className="cursor-not-allowed" aria-disabled="true">
                <IconCode
                  className="text-muted-foreground/40 pointer-events-none h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>

        {/* ilutoo */}
        <div className="space-y-4">
          <div className="border-border inset-shadow-md flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border inset-shadow-black/10 @xl:h-56 dark:inset-shadow-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ilutoo.png"
              alt="ilutoo"
              className="block h-full w-full object-cover dark:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ilutoo-dark.png"
              alt="ilutoo dark"
              className="hidden h-full w-full object-cover dark:block"
            />
          </div>
          <div className="flex items-center justify-between">
            <a
              href={data.items[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
            >
              {data.items[1].title}
            </a>
            <a
              href={data.items[1].github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${data.items[1].title}`}
            >
              <span className="cursor-not-allowed" aria-disabled="true">
                <IconCode
                  className="text-muted-foreground/40 pointer-events-none h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Projects }
