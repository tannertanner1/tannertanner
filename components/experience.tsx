const data = {
  heading: "Work Experience",
  items: [
    {
      title: "Design Engineer",
      company: "Freelance",
      period: "2023 — 2024",
    },
    {
      title: "Frontend Developer",
      company: "Freelance",
      period: "2022 — Present",
    },
  ],
}

function Experience() {
  return (
    <section id="experience" className="pb-10">
      <h2 className="text-4xl font-bold">{data.heading}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8">
        {data.items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-1 gap-2 @3xl:grid-cols-[1fr_auto] @3xl:items-baseline"
          >
            <div className="space-y-2">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="text-muted-foreground">{item.company}</p>
            </div>
            <p className="text-muted-foreground text-sm @3xl:flex @3xl:items-baseline @3xl:justify-end @3xl:text-base">
              {item.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Experience }
