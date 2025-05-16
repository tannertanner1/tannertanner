"use client"

import { useState, useEffect, useRef } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Types for our component
type ActivityLevel = 0 | 1 | 2 | 3

interface ContributionDay {
  date: string
  count: number
  level: ActivityLevel
}

const data = {
  heading: "Contribution Activity",
}

function Activity() {
  const [contributionData, setContributionData] = useState<ContributionDay[][]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch("/api")
        if (!response.ok) throw new Error("API error")

        const result = await response.json()
        if (result.error) throw new Error(result.error)

        const processedData = processGitHubData(result.data || {})
        setContributionData(processedData)
      } catch (error) {
        console.error("Error:", error)
        setContributionData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  // Scroll to the end (most recent data) when data is loaded
  useEffect(() => {
    if (!isLoading && contributionData.length > 0 && scrollAreaRef.current) {
      setTimeout(() => {
        const viewport = scrollAreaRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]"
        )
        if (viewport) {
          viewport.scrollLeft = viewport.scrollWidth
        }
      }, 100)
    }
  }, [isLoading, contributionData])

  function processGitHubData(
    contributions: Record<string, number>
  ): ContributionDay[][] {
    const result: ContributionDay[][] = []
    const today = new Date()

    // Start from January 1, 2022
    const startDate = new Date(2022, 0, 1)

    // Find the first Sunday before or on startDate
    const firstSunday = new Date(startDate)
    while (firstSunday.getDay() !== 0) {
      firstSunday.setDate(firstSunday.getDate() - 1)
    }

    // Generate all weeks
    const currentDate = new Date(firstSunday)

    while (currentDate <= today) {
      const week: ContributionDay[] = []

      // Generate days for this week
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const date = new Date(currentDate)
        const dateString = date.toISOString().split("T")[0]
        const count = contributions[dateString] || 0

        // Map count to activity level
        let level: ActivityLevel = 0
        if (count === 0) level = 0
        else if (count === 1) level = 1
        else if (count <= 3) level = 2
        else level = 3

        week.push({
          date: dateString,
          count,
          level,
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }

      result.push(week)
    }

    return result
  }

  // Format date for tooltip
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
    <section id="activity">
      <h2 className="text-4xl font-bold">{data.heading}</h2>
      <div className="mt-8">
        {!isLoading && (
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
                          day.level === 2 && "bg-[var(--activity-3)]",
                          day.level === 3 && "bg-[var(--activity-5)]"
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
        )}
      </div>
    </section>
  )
}

export { Activity }

// @note

// "use client"

// import { useEffect, useState } from "react"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import { config } from "@/lib/config"
// import { cn } from "@/lib/utils"
// import type { GitHubContributions } from "@/lib/actions"

// function Activity() {
//   const [data, setData] = useState<GitHubContributions>({})
//   const [loading, setLoading] = useState(true)
//   const [totalContributions, setTotalContributions] = useState(0)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true)
//       try {
//         // Use the dedicated GitHub API route
//         const result = await fetch("/api").then((res) => {
//           if (!res.ok) {
//             throw new Error(`API returned ${res.status}: ${res.statusText}`)
//           }
//           return res.json()
//         })

//         if (result.error) {
//           console.error("GitHub API error:", result.error)
//           setError(result.error)
//           // Generate fallback data if there's an error
//           generateSampleData()
//           return
//         }

//         // Set the data from the API response
//         setData(result.data || {})
//         setTotalContributions(result.total || 0)

//         // If we got empty data, generate sample data
//         if (Object.keys(result.data || {}).length === 0) {
//           console.log("No GitHub data found, generating sample data")
//           generateSampleData()
//         }
//       } catch (err) {
//         console.error("GitHub fetch error:", err)
//         setError(err instanceof Error ? err.message : "Unknown error")
//         // Generate sample data as fallback
//         generateSampleData()
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   // Generate sample data as fallback
//   function generateSampleData() {
//     const sampleData: GitHubContributions = {}
//     let total = 0

//     // Generate data for the last 365 days
//     const now = new Date()
//     for (let i = 0; i < 365; i++) {
//       const date = new Date(now)
//       date.setDate(date.getDate() - i)
//       const dateStr = date.toISOString().split("T")[0]

//       // Generate more activity for more recent dates and weekends
//       const dayOfWeek = date.getDay()
//       const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
//       const recency = 1 - i / 365 // Higher for more recent dates

//       // Probability increases for weekends and more recent dates
//       const probability =
//         Math.random() * (isWeekend ? 1.5 : 1) * (recency * 1.5)

//       if (probability > 0.7) {
//         // More commits for more recent dates
//         const count = Math.floor(Math.random() * 5) + (recency > 0.8 ? 2 : 1)
//         sampleData[dateStr] = count
//         total += count
//       }
//     }

//     // Ensure we have at least some data
//     if (total < 50) {
//       // Add some more random contributions
//       for (let i = 0; i < 20; i++) {
//         const date = new Date(now)
//         date.setDate(date.getDate() - Math.floor(Math.random() * 365))
//         const dateStr = date.toISOString().split("T")[0]
//         const count = Math.floor(Math.random() * 4) + 1
//         sampleData[dateStr] = (sampleData[dateStr] || 0) + count
//         total += count
//       }
//     }

//     console.log(
//       `Generated sample data with ${total} contributions across ${Object.keys(sampleData).length} days`
//     )
//     setData(sampleData)
//     setTotalContributions(total)
//   }

//   // Function to determine cell color based on count
//   const getCellColor = (count: number) => {
//     if (count === 0) return "bg-zinc-800/50 dark:bg-zinc-800/50" // Dark background for zero contributions
//     if (count === 1) return "bg-emerald-900/80 dark:bg-emerald-900/80" // Lightest green
//     if (count <= 3) return "bg-emerald-800 dark:bg-emerald-700" // Medium green
//     if (count <= 6) return "bg-emerald-700 dark:bg-emerald-600" // Brighter green
//     return "bg-emerald-600 dark:bg-emerald-500" // Brightest green
//   }

//   // Generate dates for the last year
//   const generateYearDates = () => {
//     const dates = []
//     const now = new Date()
//     const oneYearAgo = new Date(now)
//     oneYearAgo.setFullYear(now.getFullYear() - 1)

//     // Start from the first Sunday before oneYearAgo
//     const startDate = new Date(oneYearAgo)
//     while (startDate.getDay() !== 0) {
//       startDate.setDate(startDate.getDate() - 1)
//     }

//     // Generate all dates
//     const current = new Date(startDate)
//     while (current <= now) {
//       dates.push(new Date(current))
//       current.setDate(current.getDate() + 1)
//     }

//     return dates
//   }

//   // Generate month labels
//   const generateMonthLabels = (dates: Date[]) => {
//     const months: { name: string; index: number }[] = []
//     let currentMonth = ""

//     dates.forEach((date, index) => {
//       if (date.getDay() === 0) {
//         // Sunday
//         const monthName = date.toLocaleString("default", { month: "short" })
//         if (monthName !== currentMonth) {
//           months.push({ name: monthName, index: Math.floor(index / 7) })
//           currentMonth = monthName
//         }
//       }
//     })

//     return months
//   }

//   // Organize dates into a 7x53 grid
//   const organizeGrid = (dates: Date[]) => {
//     const grid: Date[][] = Array(7)
//       .fill(0)
//       .map(() => [])

//     dates.forEach((date) => {
//       const dayOfWeek = date.getDay()
//       grid[dayOfWeek].push(date)
//     })

//     return grid
//   }

//   const dates = generateYearDates()
//   const months = generateMonthLabels(dates)
//   const grid = organizeGrid(dates)

//   return (
//     <section id="activity">
//       <h2 className="font-sans text-4xl font-bold">Contribution Activity</h2>

//       <div className="mt-8">
//         <a
//           href={config.github}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block w-full"
//         >
//           <div className="rounded-3xl border border-zinc-700 p-6">
//             {loading ? (
//               <div className="flex h-40 items-center justify-center">
//                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
//               </div>
//             ) : error ? (
//               <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
//                 <p className="text-zinc-300">Unable to load GitHub activity</p>
//                 <p className="text-xs text-zinc-500">{error}</p>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="mt-2 rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-700"
//                 >
//                   Retry
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <ScrollArea className="w-full pb-4">
//                   <div className="relative">
//                     {/* Month labels */}
//                     <div className="mb-2 flex">
//                       {months.map(({ name, index }, i) => (
//                         <div
//                           key={`${name}-${i}`}
//                           className="text-sm text-zinc-300"
//                           style={{
//                             position: "absolute",
//                             left: `${index * 16}px`,
//                             top: 0,
//                           }}
//                         >
//                           {name}
//                         </div>
//                       ))}
//                     </div>

//                     {/* Contribution grid */}
//                     <div className="mt-6 flex h-[120px]">
//                       {grid[0].map((_, colIndex) => (
//                         <div key={colIndex} className="flex flex-col gap-1">
//                           {Array.from({ length: 7 }).map((_, rowIndex) => {
//                             const date = grid[rowIndex]?.[colIndex]
//                             if (!date)
//                               return (
//                                 <div
//                                   key={`${colIndex}-${rowIndex}`}
//                                   className="h-3 w-3"
//                                 />
//                               )

//                             const dateKey = date.toISOString().split("T")[0]
//                             const count = data[dateKey] || 0

//                             return (
//                               <div
//                                 key={`${colIndex}-${rowIndex}`}
//                                 className={cn(
//                                   "h-3 w-3 rounded-sm",
//                                   getCellColor(count)
//                                 )}
//                                 title={`${count} contributions on ${date.toLocaleDateString()}`}
//                               />
//                             )
//                           })}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <ScrollBar orientation="horizontal" />
//                 </ScrollArea>

//                 {/* Stats and legend */}
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-zinc-300">
//                     {totalContributions} contributions in the last year
//                     <span className="ml-2 text-xs text-zinc-500">
//                       (Updated: {new Date().toLocaleDateString()})
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-1 text-xs">
//                     <span className="text-zinc-300">Less</span>
//                     {[0, 1, 2, 3, 4].map((level) => (
//                       <div
//                         key={level}
//                         className={cn(
//                           "h-3 w-3 rounded-sm",
//                           getCellColor(level)
//                         )}
//                       />
//                     ))}
//                     <span className="text-zinc-300">More</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </a>
//       </div>
//     </section>
//   )
// }

// export { Activity }
