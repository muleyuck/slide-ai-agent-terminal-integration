import { Deck } from "flow-slide-engine"

import { TitleSlide } from "./slides/TitleSlide"
import { AboutMeSlide } from "./slides/AboutMeSlide"
import { ConclusionSlide } from "./slides/ConclusionSlide"
import { Requirement1Slide } from "./slides/Requirement1Slide"
import { HistorySlide } from "./slides/HistorySlide"
import { CurrentSetupSlide } from "./slides/CurrentSetupSlide"
import { Requirement2Slide } from "./slides/Requirement2Slide"
import { AgentDashboardSlide } from "./slides/AgentDashboardSlide"
import { SummarySlide } from "./slides/SummarySlide"

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
