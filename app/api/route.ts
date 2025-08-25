import { NextResponse } from "next/server"
import { config } from "@/lib/config"

type GitHubCommit = {
  commit: {
    author: {
      date: string
    }
  }
  sha: string
}

type GitHubEvent = {
  type: string
  created_at: string
  payload?: {
    commits?: { sha: string; message: string }[]
  }
}

export async function GET() {
  const token = process.env.TOKEN
  const contributions: Record<string, number> = {}

  // Only process if we have a token
  if (!token) {
    return NextResponse.json({ data: {} })
  }

  try {
    // Repos
    const repos = config.repos

    // Dates
    const since = "2025-01-01T00:00:00Z"
    const until = "2025-12-31T23:59:59Z"

    // Helper function
    async function fetchAllCommits(repo: string): Promise<GitHubCommit[]> {
      let allCommits: GitHubCommit[] = []
      let page = 1
      let hasMore = true

      while (hasMore) {
        try {
          const url = `https://api.github.com/repos/${repo}/commits?since=${since}&until=${until}&per_page=100&page=${page}`
          const response = await fetch(url, {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github+json",
            },
            cache: "no-store",
          })

          if (!response.ok) break

          const commits = (await response.json()) as GitHubCommit[]
          if (commits.length === 0) {
            hasMore = false
          } else {
            allCommits = [...allCommits, ...commits]
            page++
          }
        } catch (error) {
          console.error(`Error fetching page ${page} for ${repo}:`, error)
          hasMore = false
        }
      }

      return allCommits
    }

    // Fetch commits from each repo with pagination
    await Promise.all(
      repos.map(async (repo) => {
        try {
          const commits = await fetchAllCommits(repo)

          // Process each commit
          commits.forEach((commit) => {
            if (commit.commit?.author?.date) {
              const date = new Date(commit.commit.author.date)
                .toISOString()
                .split("T")[0]

              // Only count 2025 dates
              if (date.startsWith("2025-")) {
                contributions[date] = (contributions[date] || 0) + 1
              }
            }
          })
        } catch (error) {
          console.error(`Error processing ${repo}:`, error)
        }
      })
    )

    // Also fetch user events as a backup with pagination
    try {
      // Inlined function for events
      const fetchEvents = async (): Promise<GitHubEvent[]> => {
        let allEvents: GitHubEvent[] = []
        let page = 1
        let hasMore = true

        while (hasMore && page <= 10) {
          try {
            const eventsUrl = `https://api.github.com/users/${config.username}/events?per_page=100&page=${page}`
            const eventsResponse = await fetch(eventsUrl, {
              headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github+json",
              },
              cache: "no-store",
            })

            if (!eventsResponse.ok) break

            const events = (await eventsResponse.json()) as GitHubEvent[]
            if (events.length === 0) {
              hasMore = false
            } else {
              allEvents = [...allEvents, ...events]
              page++
            }
          } catch (error) {
            console.error(`Error fetching events page ${page}:`, error)
            hasMore = false
          }
        }

        return allEvents
      }

      const events = await fetchEvents()

      events.forEach((event) => {
        if (event.type === "PushEvent" && event.payload?.commits) {
          const date = new Date(event.created_at).toISOString().split("T")[0]

          // Only count 2025 dates
          if (date.startsWith("2025-")) {
            const count = event.payload.commits.length
            contributions[date] = (contributions[date] || 0) + count
          }
        }
      })
    } catch (error) {
      console.error("Error fetching events:", error)
    }

    return NextResponse.json({ data: contributions })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "API error" }, { status: 500 })
  }
}
