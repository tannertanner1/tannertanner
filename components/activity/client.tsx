"use client"

import { Suspense } from "react"
import useSWR from "swr"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { config } from "@/lib/config"

const CELL_SIZE = "1.0625rem"
const CELL_GAP = "0.0625rem"

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => (res.ok ? res.json() : { data: {} }))
    .catch(() => ({ data: {} }))

function getActivityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function ActivityContent() {
  const { data: result } = useSWR<{ data: Record<string, number> }>(
    "/api",
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      fallbackData: { data: {} },
    }
  )

  // Generate days grid for 2025
  const contributionData = generateDaysGrid(result?.data || {})

  // Calculate total contributions
  const totalContributions = Object.entries(result?.data || {})
    .filter(([date]) => date.startsWith("2025-"))
    .reduce((sum, [, count]) => sum + count, 0)

  return (
    <div className="flex flex-col">
      <a
        href={config.github}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:ring-ring block rounded-2xl transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label="View GitHub profile"
      >
        <div className="border-border overflow-hidden rounded-2xl border">
          <ScrollArea className="w-full [&_[data-slot=scroll-area-thumb]]:bg-transparent">
            <div
              className="flex w-full justify-center p-6"
              style={{ gap: CELL_GAP }}
            >
              {contributionData.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col"
                  style={{ gap: CELL_GAP }}
                >
                  {week.map((day, dayIndex) => {
                    // Don't render cells for dates outside 2025
                    if (!day.isInYear) {
                      return (
                        <div
                          key={`empty-${weekIndex}-${dayIndex}`}
                          style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                          }}
                        />
                      )
                    }

                    return (
                      <div
                        key={day.date || `empty-${weekIndex}-${dayIndex}`}
                        className="rounded-sm"
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          backgroundColor: `var(--activity-${day.level})`,
                        }}
                        title={
                          day.date
                            ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDate(day.date)}`
                            : ""
                        }
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </a>

      <div className="mt-2 flex items-baseline justify-between text-sm">
        <div>{totalContributions} contributions in 2025</div>
        <div className="text-muted-foreground hidden items-center gap-2 @xl:flex">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="rounded-sm"
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: `var(--activity-${level})`,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

function ActivitySkeleton() {
  return (
    <div className="flex flex-col">
      <div className="border-border overflow-hidden rounded-2xl border p-6">
        <div className="flex justify-center gap-1">
          {Array.from({ length: 20 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <Skeleton
                  key={`${weekIndex}-${dayIndex}`}
                  className="rounded-sm opacity-30"
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="hidden h-4 w-32 @xl:block" />
      </div>
    </div>
  )
}

function Component() {
  return (
    <section id="activity">
      <h2 className="text-4xl font-bold">Contribution Activity</h2>
      <div className="mt-8">
        <Suspense fallback={<ActivitySkeleton />}>
          <ActivityContent />
        </Suspense>
      </div>
    </section>
  )
}

// Helper functions
function formatDate(dateString: string): string {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function generateDaysGrid(contributions: Record<string, number>) {
  // Create an array of all dates in 2025
  const days2025 = Array.from({ length: 12 }, (_, month) => {
    const daysInMonth = new Date(2025, month + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, day) => {
      const date = `2025-${String(month + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`
      const count = contributions[date] || 0
      return {
        date,
        count,
        level: getActivityLevel(count),
        isInYear: true,
      }
    })
  }).flat()

  // Get the day of week for January 1, 2025
  const jan1DayOfWeek = new Date(2025, 0, 1).getDay()

  // Create grid with weeks as columns
  const grid: Array<
    Array<{
      date: string
      count: number
      level: 0 | 1 | 2 | 3 | 4
      isInYear: boolean
    }>
  > = []

  // Create first week with empty spaces before January 1
  let currentWeek = Array(jan1DayOfWeek).fill({
    date: "",
    count: 0,
    level: 0,
    isInYear: false,
  })

  // Add days to the grid
  let dayIndex = 0
  while (dayIndex < days2025.length) {
    // Complete the current week
    while (currentWeek.length < 7 && dayIndex < days2025.length) {
      currentWeek.push(days2025[dayIndex++])
    }

    // Add the week to the grid
    grid.push([...currentWeek])

    // Start a new week
    currentWeek = []

    // Add days to the new week
    while (currentWeek.length < 7 && dayIndex < days2025.length) {
      currentWeek.push(days2025[dayIndex++])
    }
  }

  // If the last week is incomplete, add empty cells
  while (currentWeek.length < 7) {
    currentWeek.push({
      date: "",
      count: 0,
      level: 0,
      isInYear: false,
    })
  }

  // Add the last week if it's not empty
  if (currentWeek.length > 0) {
    grid.push([...currentWeek])
  }

  // Transpose the grid so weeks are columns
  const transposedGrid: Array<
    Array<{
      date: string
      count: number
      level: 0 | 1 | 2 | 3 | 4
      isInYear: boolean
    }>
  > = []

  // Initialize columns
  for (let weekIndex = 0; weekIndex < grid.length; weekIndex++) {
    transposedGrid.push([])
  }

  // Fill columns
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    for (let weekIndex = 0; weekIndex < grid.length; weekIndex++) {
      if (grid[weekIndex][dayOfWeek]) {
        transposedGrid[weekIndex].push(grid[weekIndex][dayOfWeek])
      }
    }
  }

  return transposedGrid.slice(0, Math.min(transposedGrid.length, 53)) // Limit to 53 weeks (full year)
}

export { Component }
