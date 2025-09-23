const config = {
  domain: "tannertanner.me",
  url: "https://tannertanner.me",
  name: "Tanner",
  username: "tannertanner1",
  title: "Web Developer",
  description:
    "Freelance Web Developer. Building with React, TypeScript, Tailwind, Shadcn, Drizzle, and Postgres.",
  og: "https://tannertanner.me/photo.png",
  items: [
    { name: "react", url: "https://react.dev/" },
    { name: "typescript", url: "https://www.typescriptlang.org/" },
    { name: "tailwind", url: "https://tailwindcss.com/" },
    { name: "postgres", url: "https://www.postgresql.org/" },
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
        title: "Full Stack Developer",
        name: "Freelance",
        period: "2024 – Present",
      },
      {
        title: "Front End Developer",
        name: "Freelance",
        period: "2022 – 2023",
      },
    ],
  },
  email: "tanner@tannertanner.me",
}

type Config = typeof config

export { config, type Config }
