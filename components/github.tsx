"use client"

import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

function Github() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const maskImage = useScrollOverflowMask(scrollXProgress)

  const [data] = useState(() => {
    const { contributions, months, totalColumns } = generateContributionData()
    return { contributions, months, totalColumns }
  })
  const visibleColumns = 12

  const monthsX = useTransform(
    scrollXProgress,
    [0, 1],
    ["0%", `-${((data.totalColumns - visibleColumns) * 100) / visibleColumns}%`]
  )

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth
    }
  }, [])

  return (
    <div className="w-full max-w-[480px]">
      <div className="relative overflow-hidden rounded-3xl p-6">
        <div className="relative mb-2 h-6 overflow-hidden">
          <motion.div className="absolute flex w-full" style={{ x: monthsX }}>
            {data.months.map(({ name, startColumn }, i) => (
              <div
                key={`${name}-${i}`}
                className="text-primary absolute text-sm font-medium"
                style={{
                  left: `${(startColumn * 100) / visibleColumns}%`,
                  width: "100px",
                  marginLeft: "-50px",
                  textAlign: "center",
                }}
              >
                {name}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          ref={containerRef}
          className="scrollbar-none overflow-x-scroll"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <div
            className="grid grid-rows-7 gap-1"
            style={{
              gridTemplateColumns: `repeat(${data.totalColumns}, 1fr)`,
              width: `${(data.totalColumns / visibleColumns) * 100}%`,
            }}
          >
            {data.contributions.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={cn(
                    "aspect-square rounded-sm",
                    value === null && "bg-transparent",
                    value === 0 && "bg-zinc-950/10 dark:bg-zinc-50/10",
                    value === 1 && "bg-zinc-950/25 dark:bg-zinc-50/25",
                    value === 2 && "bg-zinc-950/50 dark:bg-zinc-50/50",
                    value === 3 && "bg-zinc-950/75 dark:bg-zinc-50/75"
                  )}
                />
              ))
            )}
          </div>
        </motion.div>

        <div className="mt-4 flex items-center justify-end gap-2 text-sm">
          <span className="text-primary">Less</span>
          {[0, 1, 2, 3].map((level) => (
            <div
              key={level}
              className={cn(
                "h-3 w-3 rounded-sm",
                level === 0 && "bg-zinc-950/10 dark:bg-zinc-50/10",
                level === 1 && "bg-zinc-950/25 dark:bg-zinc-50/25",
                level === 2 && "bg-zinc-950/50 dark:bg-zinc-50/50",
                level === 3 && "bg-zinc-950/75 dark:bg-zinc-50/75"
              )}
            />
          ))}
          <span className="text-primary">More</span>
        </div>
      </div>
    </div>
  )
}

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, #000, #000 0%, #000 80%, #0000)`
  )

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, #000, #000 0%, #000 80%, #0000)`
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, #0000, #000 20%, #000 100%, #000)`
      )
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, #0000, #000 20%, #000 80%, #0000)`
      )
    }
  })

  return maskImage
}

function generateContributionData() {
  const now = new Date()
  const pst = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  )
  const startDate = new Date(pst)
  startDate.setFullYear(startDate.getFullYear() - 1)

  const firstSunday = new Date(startDate)
  while (firstSunday.getDay() !== 0) {
    firstSunday.setDate(firstSunday.getDate() - 1)
  }

  const contributions: (number | null)[][] = Array(7)
    .fill(0)
    .map(() => [])
  const months: { name: string; startColumn: number }[] = []

  const currentDate = new Date(firstSunday)
  let weekIndex = 0
  let lastMonth = -1

  const currentMonth = pst.getMonth()
  const currentYear = pst.getFullYear()

  while (currentDate <= pst) {
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const isNewMonth = month !== lastMonth

    if (
      isNewMonth &&
      currentDate <= pst &&
      !(month === currentMonth && year === currentYear - 1)
    ) {
      months.push({
        name: currentDate.toLocaleString("default", { month: "short" }),
        startColumn: weekIndex,
      })
      lastMonth = month
    }

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const cellDate = new Date(currentDate)
      cellDate.setDate(currentDate.getDate() + dayOfWeek)

      if (cellDate >= startDate && cellDate <= pst) {
        contributions[dayOfWeek][weekIndex] =
          (cellDate.getDate() + cellDate.getMonth()) % 4
      } else {
        contributions[dayOfWeek][weekIndex] = null
      }
    }

    currentDate.setDate(currentDate.getDate() + 7)
    weekIndex++
  }

  return { contributions, months, totalColumns: weekIndex }
}

export { Github }
