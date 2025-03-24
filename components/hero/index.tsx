import { Component } from './component'
import { hero } from '@/data/hero'

export function Hero() {
  return (
    <section id='hero' className='pt-0'>
      <Component data={hero} />
    </section>
  )
}
