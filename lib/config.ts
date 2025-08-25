const config = {
  name: "Tanner",
  description:
    "Developer & Designer based in Tokyo, Japan. Building with React, TypeScript, and Next.js.",
  username: "tannertanner1",
  domain: "tannertanner.me",
  url: "https://tannertanner.me",
  og: "https://tannertanner.me/photo.png", // Must be an absolute URL
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
