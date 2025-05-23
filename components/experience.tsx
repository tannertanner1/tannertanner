const data = {
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
}

function Experience() {
  return (
    <section id="experience" className="pb-12">
      <h2 className="text-4xl font-bold">{data.heading}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8">
        {data.items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-[1fr_auto] items-baseline gap-2"
          >
            <div className="space-y-2">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="text-muted-foreground">{item.name}</p>
            </div>
            <p className="text-muted-foreground flex items-baseline justify-end text-[14px]">
              {item.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Experience }
