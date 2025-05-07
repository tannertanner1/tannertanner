'use client'

import type * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import './styles.css'

const DAYS_PER_WEEK = 7

export type DataOptions = {
  date: Date
  label: React.ReactNode
  value: number
}

export interface ActivityCalendarProps<T extends DataOptions> {
  /**
   * Data to render
   */
  data: T[]
  /**
   * Container size of the cells
   */
  size?: number
  /**
   * Gap between the cells
   */
  gap?: number
  /**
   * Colors for each value
   */
  colors: Record<T['value'], string>
  /**
   * Days of the week to show - 0 = Sunday, 1 = Monday, ..., 6 = Saturday
   * @default [1, 3, 5]
   */
  weekDays?: number[]
}

export function Activity<T extends DataOptions>({
  size = 14,
  gap = 2,
  colors,
  weekDays = [1, 3, 5],
  data
}: ActivityCalendarProps<T>) {
  // Check if data is empty
  if (!data || data.length === 0) {
    return null
  }

  const startDate = data[0]?.date as Date | undefined
  const startDay = startDate?.getDay()

  // Add empty boxes at the beginning if startDate is not a Monday
  const paddingDays = startDay === 0 ? 6 : startDay
  const paddedDays = Array(paddingDays).fill(null).concat(data)

  // Group days into weeks (columns)
  const weeks: (T | null)[][] = []
  for (let i = 0; i < paddedDays.length; i += DAYS_PER_WEEK) {
    weeks.push(paddedDays.slice(i, i + DAYS_PER_WEEK))
  }

  // Calculate month spans
  const monthHeaders: { name: string; span: number }[] = []
  let currentMonth: string | null = null
  let monthStartIndex = 0

  weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = week.find(option => option?.date)
    if (firstDayOfWeek) {
      const monthName = new Date(firstDayOfWeek.date).toLocaleString(
        'default',
        {
          month: 'short'
        }
      )
      if (monthName !== currentMonth) {
        if (currentMonth) {
          monthHeaders.push({
            name: currentMonth,
            span: weekIndex - monthStartIndex
          })
        }
        currentMonth = monthName
        monthStartIndex = weekIndex
      }
    }
  })

  if (currentMonth) {
    monthHeaders.push({
      name: currentMonth,
      span: weeks.length - monthStartIndex
    })
  }

  return (
    <div
      className='w-full space-y-3'
      style={
        {
          '--activity-grid-size': `${size}px`,
          '--activity-grid-gap': `${gap}px`
        } as React.CSSProperties
      }
    >
      <div className='w-full overflow-x-auto'>
        <table className='w-max border-separate border-spacing-(--activity-grid-gap)'>
          <thead>
            <tr>
              <th />
              {monthHeaders.map((header, index) => (
                <th
                  key={index}
                  colSpan={header.span}
                  className='text-left text-(length:--activity-grid-size) leading-none font-normal'
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render rows for each day of the week */}
            {Array.from({ length: DAYS_PER_WEEK }).map((_, dayIndex) => {
              return (
                <tr key={dayIndex}>
                  {weekDays.includes(dayIndex) ? (
                    <td className='p-0 text-(length:--activity-grid-size) leading-none font-normal'>
                      {new Date(2024, 0, dayIndex).toLocaleString('default', {
                        weekday: 'short'
                      })}
                    </td>
                  ) : (
                    <td />
                  )}
                  {/* Render each day of the week */}
                  {weeks.map((week, weekIndex) => {
                    if (!week[dayIndex]) {
                      return (
                        <td
                          key={weekIndex}
                          className='size-(--activity-grid-size)'
                        />
                      )
                    }
                    const { value, label } = week[dayIndex] as T

                    return (
                      <TooltipProvider key={`${weekIndex}-${dayIndex}`}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger
                            style={{
                              backgroundColor:
                                colors[value as keyof typeof colors]
                            }}
                            asChild
                            suppressHydrationWarning
                          >
                            <td className='border-border size-(--activity-grid-size) rounded border'>
                              <span className='sr-only'>{label}</span>
                            </td>
                          </TooltipTrigger>
                          <TooltipContent>{label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end gap-(--activity-grid-gap)'>
        <div className='text-muted-foreground/70 mr-1 text-(length:--activity-grid-size) leading-none font-light tracking-tighter'>
          Less
        </div>
        {Object.entries(colors).map(([key, color]) => (
          <div
            key={key}
            className='border-border size-(--activity-grid-size) rounded border'
            style={{ backgroundColor: color as string }}
          />
        ))}
        <div className='text-muted-foreground/70 ml-1 text-(length:--activity-grid-size) leading-none font-light tracking-tighter'>
          More
        </div>
      </div>
    </div>
  )
}
