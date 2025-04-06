'use client'

import * as React from 'react'
import { format, isEqual } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Activity } from './activity'
import { colors, generateDateRange, getActivityLevel } from './utils'
import { defaultData } from './data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const WEEK_DAY_INDEXES = [0, 1, 2, 3, 4, 5, 6]
const START_DATE = new Date(2025, 0, 2)
const END_DATE = new Date(2025, 5, 17)

export const FormSchema = z.object({
  size: z.coerce.number().min(8).max(30),
  color: z.string(),
  date: z.object({
    from: z.date(),
    to: z.date().optional()
  }),
  gap: z.coerce.number().min(0).max(10),
  weekDays: z.array(z.number())
})

function renderLabel({ value, date }: { value: number; date: Date }) {
  const activity = value > 1 ? 'activities' : 'activity'
  return (
    <span>
      <span className='font-medium'>
        {value} {activity}
      </span>{' '}
      -{' '}
      <span className='font-mono tracking-tighter'>
        {format(date, 'LLL dd, y')}
      </span>
    </span>
  )
}

export function Component() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      size: 14,
      color: 'vercel',
      date: {
        from: START_DATE,
        to: END_DATE
      },
      gap: 2,
      weekDays: [1, 3, 5]
    }
  })

  // Extract the watched values to fix the ESLint warning
  const dateFrom = form.watch('date')?.from
  const dateTo = form.watch('date')?.to

  const data = React.useMemo(() => {
    // Default values to avoid hydration errors
    if (isEqual(dateFrom, START_DATE) && dateTo && isEqual(dateTo, END_DATE)) {
      return defaultData.map(({ value, date }) => ({
        date,
        value,
        label: renderLabel({ value, date })
      }))
    }

    const dateRange = generateDateRange(dateFrom, dateTo)

    return dateRange.map(date => {
      const value = getActivityLevel()
      return {
        date,
        value,
        label: renderLabel({ value, date })
      }
    })
  }, [dateFrom, dateTo])

  return (
    <Card className='mx-auto w-full max-w-4xl'>
      <CardHeader>
        <CardTitle>Activity Calendar</CardTitle>
        <div className='text-muted-foreground text-sm'>
          January 2025 · 1 min read · 1,837 views
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Activity
          data={data}
          size={form.watch('size')}
          colors={colors[form.watch('color') as keyof typeof colors]}
          weekDays={form.watch('weekDays')}
          gap={form.watch('gap')}
        />
        <Form {...form}>
          <form className='space-y-6'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Range</FormLabel>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-full justify-start pl-3 font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='range'
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    The date range to display the grid for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a color' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(colors).map(color => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Grid theme</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gap'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gap</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormDescription>Gap between cells</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormDescription>Cell size</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='weekDays'
              render={() => (
                <FormItem>
                  <div className='mb-3'>
                    <FormLabel className='text-base'>Week Days</FormLabel>
                    <FormDescription>
                      Select the days of the week you want to display in the
                      grid.
                    </FormDescription>
                  </div>
                  <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                    {WEEK_DAY_INDEXES.map(item => (
                      <FormField
                        key={item}
                        control={form.control}
                        name='weekDays'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className='flex flex-row items-start space-y-0 space-x-3'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                {new Date(2024, 0, item).toLocaleString(
                                  'default',
                                  {
                                    weekday: 'long'
                                  }
                                )}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
