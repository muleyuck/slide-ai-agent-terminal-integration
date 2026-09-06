import { Slide, type SlideProps, Title } from "flow-slide-engine"
import type { ReactNode } from "react"

import { Avatar } from "../components/media"
import { Code, Kicker } from "../components/typography"

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-8 flex last:mb-0">
      <dt className="w-32 shrink-0 text-lg font-bold tracking-wider text-accent">{label}</dt>
      <dd className="flex-1 text-xl leading-relaxed">{children}</dd>
    </div>
  )
}

export function AboutMeSlide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>About me ／ 自己紹介</Kicker>
      <Title className="font-bold text-accent-strong">名前</Title>
      <div className="flex gap-8">
        <dl className="flex-[7] rounded-sm border border-line bg-code-surface px-8 py-10">
          <Row label="所属">
            <span className="text-muted">TODO</span>
          </Row>
          <Row label="経歴">
            <span className="text-muted">TODO</span>
          </Row>
          <Row label="作ったもの">
            <span className="ml-4 text-lg text-muted">
              GitHub <Code>@muleyuck</Code>
            </span>
            <Code>conflux.nvim</Code> <Code>jqc</Code> <Code>edio</Code>
            <br />
            <span className="text-lg text-muted">足りないものを作っているうちに増えた</span>
          </Row>
        </dl>
        <div className="flex flex-[3] items-center justify-center">
          <Avatar className="size-48" />
        </div>
      </div>
    </Slide>
  )
}
