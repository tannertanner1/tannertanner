import { Component } from './component'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <section id='experience' className='space-y-10'>
      <h2 className='text-3xl font-bold'>{experience.heading}</h2>
      <div className='space-y-8'>
        {experience.items.map(job => (
          <Component key={job.title} job={job} />
        ))}
      </div>
    </section>
  )
}
