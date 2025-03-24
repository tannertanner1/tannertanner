export function Component({
  data
}: {
  data: { name: string; title: string; paragraphs: string[] }
}) {
  return (
    <>
      <h1 className='mb-8 text-4xl font-bold md:text-5xl'>{data.name}</h1>

      <div className='flex flex-col gap-8 md:flex-row md:items-start md:gap-12'>
        <div className='space-y-6 md:max-w-[60%]'>
          <h2 className='text-muted-foreground text-xl md:text-2xl'>
            {data.title}
          </h2>

          {data.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className='text-muted-foreground text-lg leading-relaxed'
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className='border-border inset-ring-primary/20 mx-auto h-48 w-48 rounded-full border inset-ring-2 md:mx-0 md:ml-auto md:h-64 md:w-64'></div>
      </div>
    </>
  )
}
