import { Component } from './component'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id='projects' className='space-y-10'>
      <h2 className='text-3xl font-bold'>{projects.heading}</h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10'>
        {projects.items.map(project => (
          <Component key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
