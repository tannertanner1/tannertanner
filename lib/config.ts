const config = {
  domain: "tannertanner.me",
  url: "https://tannertanner.me",
  name: "Tanner",
  username: "tannertanner1",
  title: "Developer & Designer",
  description:
    "Developer & Designer. Building with React, TypeScript, Tailwind, Shadcn, Drizzle, and Postgres.",
  og: "https://tannertanner.me/photo.png",
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
  repos: [
    "tannertanner1/tannertanner",
    "tannertanner1/omgbff",
    "tannertanner1/ilutoo",
  ],
  github: "https://github.com/tannertanner1",
  projects: {
    heading: "Selected Projects",
    items: [
      {
        domain: "omgbff.com",
        github: "https://github.com/tannertanner1/omgbff",
        preview: { light: "/omgbff.webp", dark: "/omgbff-dark.webp" },
        open: true,
      },
      {
        domain: "ilutoo.com",
        github: "https://github.com/tannertanner1/ilutoo",
        preview: { light: "/ilutoo.png", dark: "/ilutoo-dark.png" },
        open: false,
      },
    ],
  },
  experience: {
    heading: "Work Experience",
    items: [
      {
        title: "Design Engineer",
        name: "Freelance",
        period: "2023 – 2024",
      },
      {
        title: "Frontend Developer",
        name: "Freelance",
        period: "2022 – Present",
      },
    ],
  },
  email: "tanner@tannertanner.me",
}

type Config = typeof config

export { config, type Config }
