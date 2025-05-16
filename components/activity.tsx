"use client"

import { Suspense, useRef } from "react"
import useSWR from "swr"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type ActivityLevel = 0 | 1 | 2 | 3 | 4

interface ContributionDay {
  date: string
  count: number
  level: ActivityLevel
}

interface GitHubApiResponse {
  data: Record<string, number>
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    })
    .catch(() => ({ data: {} }))

function ActivityContent() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { data: result } = useSWR<GitHubApiResponse>("/api", fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    fallbackData: { data: {} },
  })

  const contributionData = processGitHubData(result?.data || {})

  // Scroll to most recent column once loaded
  if (contributionData.length > 0 && scrollAreaRef.current) {
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      )
      if (viewport) {
        viewport.scrollLeft = viewport.scrollWidth
      }
    }, 100)
  }

  function processGitHubData(
    contributions: Record<string, number>
  ): ContributionDay[][] {
    const result: ContributionDay[][] = []
    const today = new Date()

    const startDate = new Date(2025, 0, 1)

    // Find the first Sunday before or on startDate
    const firstSunday = new Date(startDate)
    while (firstSunday.getDay() !== 0) {
      firstSunday.setDate(firstSunday.getDate() - 1)
    }

    const currentDate = new Date(firstSunday)

    while (currentDate <= today) {
      const week: ContributionDay[] = []

      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate)
        const dateString = date.toISOString().split("T")[0]
        const count = contributions[dateString] || 0

        // Map count to GitHub-style activity level (0-4)
        let level: ActivityLevel = 0
        if (count === 0) level = 0
        else if (count === 1) level = 1
        else if (count <= 3) level = 2
        else if (count <= 6) level = 3
        else level = 4

        week.push({ date: dateString, count, level })
        currentDate.setDate(currentDate.getDate() + 1)
      }

      result.push(week)
    }

    return result
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="border-border overflow-hidden rounded-2xl border">
      <ScrollArea
        ref={scrollAreaRef}
        className="w-full [&_[data-slot=scroll-area-thumb]]:bg-transparent"
      >
        <div className="flex gap-1 p-4">
          {contributionData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    "h-3.5 w-3.5 rounded-sm",
                    day.level === 0 && "bg-[var(--activity-0)]",
                    day.level === 1 && "bg-[var(--activity-1)]",
                    day.level === 2 && "bg-[var(--activity-2)]",
                    day.level === 3 && "bg-[var(--activity-3)]",
                    day.level === 4 && "bg-[var(--activity-5)]"
                  )}
                  title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDate(day.date)}`}
                />
              ))}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function ActivitySkeleton() {
  return (
    <div className="border-border overflow-hidden rounded-2xl border p-4">
      <div className="flex gap-1">
        {Array.from({ length: 20 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <Skeleton
                key={`${weekIndex}-${dayIndex}`}
                className="h-3.5 w-3.5 rounded-sm opacity-30"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Activity() {
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
