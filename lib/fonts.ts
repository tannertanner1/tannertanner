import { LXGW_WenKai_Mono_TC, Slackside_One } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = Slackside_One({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})
const fontMono = LXGW_WenKai_Mono_TC({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "700"],
})

export const fontVariables = cn(fontSans.variable, fontMono.variable)
