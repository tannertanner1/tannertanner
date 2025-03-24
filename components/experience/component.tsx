export function Component({
  job
}: {
  job: { title: string; company: string; period: string }
}) {
  return (
    <div className='flex flex-col py-2 md:flex-row md:items-start md:justify-between'>
      <div>
        <h3 className='text-2xl'>{job.title}</h3>
        <p className='text-muted-foreground mt-2'>{job.company}</p>
      </div>
      <p className='text-muted-foreground mt-2 md:mt-0 md:text-right'>
        {job.period}
      </p>
    </div>
  )
}
