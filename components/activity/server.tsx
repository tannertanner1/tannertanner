import { cache } from "react"

type ContributionGrid = Array<
  Array<{
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
    isInYear: boolean
  }>
>

type GitHubData = {
  data: Record<string, number>
}

// Helper functions
function getActivityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

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

function generateDaysGrid(
  contributions: Record<string, number>
): ContributionGrid {
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
  const grid: ContributionGrid = []

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
  const transposedGrid: ContributionGrid = []

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

// Cache the API call using React 19 cache function
const getGithubData = cache(async () => {
  try {
    // Only skip API calls during the build process specifically
    // This check is more precise than the previous one
    if (
      process.env.NODE_ENV === "production" &&
      typeof window === "undefined" &&
      process.env.NEXT_PHASE === "build"
    ) {
      console.log("Skipping GitHub API call during build phase")
      return { data: {} } as GitHubData
    }

    // In all other cases (development, runtime in production), fetch from the API
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      return { data: {} } as GitHubData
    }

    return (await response.json()) as GitHubData
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return { data: {} } as GitHubData
  }
})

// This is the server component that fetches and processes the data
async function getActivityData() {
  const result = await getGithubData()
  const contributionData = generateDaysGrid(result?.data || {})

  // Calculate total contributions
  const totalContributions = Object.entries(result?.data || {})
    .filter(([date]) => date.startsWith("2025-"))
    .reduce((sum, [, count]) => sum + (count as number), 0)

  // Return the processed data
  return {
    contributionData,
    totalContributions,
  }
}

export { formatDate, getActivityData }

// import { cache } from "react"

// type ContributionGrid = Array<
//   Array<{
//     date: string
//     count: number
//     level: 0 | 1 | 2 | 3 | 4
//     isInYear: boolean
//   }>
// >

// type GitHubData = {
//   data: Record<string, number>
// }

// // Helper functions
// function getActivityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
//   if (count === 0) return 0
//   if (count === 1) return 1
//   if (count <= 3) return 2
//   if (count <= 6) return 3
//   return 4
// }

// function formatDate(dateString: string): string {
//   if (!dateString) return ""
//   const [year, month, day] = dateString.split("-").map(Number)
//   const date = new Date(year, month - 1, day)
//   return date.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   })
// }

// function generateDaysGrid(
//   contributions: Record<string, number>
// ): ContributionGrid {
//   // Create an array of all dates in 2025
//   const days2025 = Array.from({ length: 12 }, (_, month) => {
//     const daysInMonth = new Date(2025, month + 1, 0).getDate()
//     return Array.from({ length: daysInMonth }, (_, day) => {
//       const date = `2025-${String(month + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`
//       const count = contributions[date] || 0
//       return {
//         date,
//         count,
//         level: getActivityLevel(count),
//         isInYear: true,
//       }
//     })
//   }).flat()

//   // Get the day of week for January 1, 2025
//   const jan1DayOfWeek = new Date(2025, 0, 1).getDay()

//   // Create grid with weeks as columns
//   const grid: ContributionGrid = []

//   // Create first week with empty spaces before January 1
//   let currentWeek = Array(jan1DayOfWeek).fill({
//     date: "",
//     count: 0,
//     level: 0,
//     isInYear: false,
//   })

//   // Add days to the grid
//   let dayIndex = 0
//   while (dayIndex < days2025.length) {
//     // Complete the current week
//     while (currentWeek.length < 7 && dayIndex < days2025.length) {
//       currentWeek.push(days2025[dayIndex++])
//     }

//     // Add the week to the grid
//     grid.push([...currentWeek])

//     // Start a new week
//     currentWeek = []

//     // Add days to the new week
//     while (currentWeek.length < 7 && dayIndex < days2025.length) {
//       currentWeek.push(days2025[dayIndex++])
//     }
//   }

//   // If the last week is incomplete, add empty cells
//   while (currentWeek.length < 7) {
//     currentWeek.push({
//       date: "",
//       count: 0,
//       level: 0,
//       isInYear: false,
//     })
//   }

//   // Add the last week if it's not empty
//   if (currentWeek.length > 0) {
//     grid.push([...currentWeek])
//   }

//   // Transpose the grid so weeks are columns
//   const transposedGrid: ContributionGrid = []

//   // Initialize columns
//   for (let weekIndex = 0; weekIndex < grid.length; weekIndex++) {
//     transposedGrid.push([])
//   }

//   // Fill columns
//   for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
//     for (let weekIndex = 0; weekIndex < grid.length; weekIndex++) {
//       if (grid[weekIndex][dayOfWeek]) {
//         transposedGrid[weekIndex].push(grid[weekIndex][dayOfWeek])
//       }
//     }
//   }

//   return transposedGrid.slice(0, Math.min(transposedGrid.length, 53)) // Limit to 53 weeks (full year)
// }

// // Cache the API call using React 19 cache function
// const getGithubData = cache(async () => {
//   try {
//     const response = await fetch(
//       `${process.env.VERCEL_URL || "http://localhost:3000"}/api`,
//       {
//         next: { revalidate: 3600 }, // Revalidate every hour
//       }
//     )

//     if (!response.ok) {
//       return { data: {} } as GitHubData
//     }

//     return (await response.json()) as GitHubData
//   } catch (error) {
//     console.error("Error fetching GitHub data:", error)
//     return { data: {} } as GitHubData
//   }
// })

// // This is the server component that fetches and processes the data
// async function getActivityData() {
//   const result = await getGithubData()
//   const contributionData = generateDaysGrid(result?.data || {})

//   // Calculate total contributions
//   const totalContributions = Object.entries(result?.data || {})
//     .filter(([date]) => date.startsWith("2025-"))
//     .reduce((sum, [, count]) => sum + (count as number), 0)

//   // Return the processed data
//   return {
//     contributionData,
//     totalContributions,
//   }
// }

// export { formatDate, getActivityData }
