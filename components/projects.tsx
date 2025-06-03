import { IconCode } from "@tabler/icons-react"

const data = {
  heading: "Selected Projects",
  items: [
    {
      domain: "omgbff.com",
      github: "https://github.com/tannertanner1/omgbff",
      preview: {
        light: "/omgbff.webp",
        dark: "/omgbff-dark.webp",
      },
      open: true,
    },
    {
      domain: "ilutoo.com",
      github: "https://github.com/tannertanner1/ilutoo",
      preview: {
        light: "/ilutoo.png",
        dark: "/ilutoo-dark.png",
      },
      open: false,
    },
  ],
}

function Projects() {
  return (
    <section id="projects">
      <h2 className="text-4xl font-bold">{data.heading}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 @3xl:grid-cols-2">
        {data.items.map(({ domain, github, preview, open }) => (
          <div key={domain} className="space-y-4">
            <div className="border-border relative aspect-[830/499] w-full overflow-hidden rounded-[1rem] border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.light}
                alt={`${domain} preview`}
                className="absolute inset-0 block h-[101%] w-[101%] origin-center rounded-[1rem] object-cover pb-0.5 dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.dark}
                alt={`${domain} dark preview`}
                className="absolute inset-0 hidden h-[101%] w-[101%] origin-center rounded-[1rem] object-cover pb-0.5 dark:block"
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
