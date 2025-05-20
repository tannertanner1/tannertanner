import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { config } from "@/lib/config"
import { formatDate, getActivityData } from "./server"

const SIZE = "1.0625rem"
const GAP = "0.0625rem"

async function Activity() {
  // Fetch GitHub data at build/request time inside component
  const { contributionData, totalContributions } = await getActivityData()

  return (
    <section id="activity">
      <h2 className="text-4xl font-bold">Contribution Activity</h2>
      <div className="mt-8 flex flex-col">
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
                style={{ gap: GAP }}
              >
                {contributionData.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="flex flex-col"
                    style={{ gap: GAP }}
                  >
                    {week.map((day, dayIndex) => {
                      // Don't render cells for dates outside 2025
                      if (!day.isInYear) {
                        return (
                          <div
                            key={`empty-${weekIndex}-${dayIndex}`}
                            style={{
                              width: SIZE,
                              height: SIZE,
                            }}
                          />
                        )
                      }

                      return (
                        <div
                          key={day.date || `empty-${weekIndex}-${dayIndex}`}
                          className="rounded-sm"
                          style={{
                            width: SIZE,
                            height: SIZE,
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
    </section>
  )
}

export { Activity }
