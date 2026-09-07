import { type SlideProps, Title } from "flow-slide-engine"

import { CoverSlide } from "../components/media"

export function TitleSlide(props: SlideProps) {
  return (
    <CoverSlide {...props} cover="lead" label="Terminal × AI Agents" iconSize="size-[6.625rem]">
      <Title className="font-bold text-surface">
        AIエージェントと快適に開発するために、
        <br />
        ターミナル環境を見直した話
      </Title>
      <p className="mt-8 text-xl leading-relaxed opacity-90">大塚 拓人 ／ 2026-09-08</p>
    </CoverSlide>
  )
}
