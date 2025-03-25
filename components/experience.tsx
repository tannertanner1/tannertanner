const data = {
  heading: 'Work Experience',
  items: [
    {
      title: 'Design Engineer',
      company: 'Freelance',
      period: '2023 — 2024'
    },
    {
      title: 'Frontend Developer',
      company: 'Freelance',
      period: '2022 — Present'
    }
  ]
}

export function Experience() {
  return (
    <section id='experience' className='pb-6'>
      <h2 className='text-4xl font-bold'>{data.heading}</h2>
      <div className='mt-8 grid grid-cols-1 gap-16'>
        {data.items.map(job => (
          <div
            key={job.title}
            className='grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]'
          >
            <div className='space-y-2'>
              <h3 className='text-2xl'>{job.title}</h3>
              <p className='text-muted-foreground'>{job.company}</p>
            </div>
            <p className='text-muted-foreground md:self-start md:text-right'>
              {job.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
