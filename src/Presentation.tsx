import { Deck } from "flow-slide-engine"
import { AboutMeSlide } from "./slides/AboutMeSlide"
import { AgentDashboardSlide } from "./slides/AgentDashboardSlide"
import { ConclusionSlide } from "./slides/ConclusionSlide"
import { CurrentSetupSlide } from "./slides/CurrentSetupSlide"
import { HistorySlide } from "./slides/HistorySlide"
import { Requirement1Slide } from "./slides/Requirement1Slide"
import { Requirement2Slide } from "./slides/Requirement2Slide"
import { SummarySlide } from "./slides/SummarySlide"
import { TitleSlide } from "./slides/TitleSlide"

export function Presentation() {
  return (
    <Deck url>
      <TitleSlide />
      <AboutMeSlide />
      <ConclusionSlide />
      <Requirement1Slide />
      <HistorySlide />
      <CurrentSetupSlide />
      <Requirement2Slide />
      <AgentDashboardSlide />
      <SummarySlide />
    </Deck>
  )
}
