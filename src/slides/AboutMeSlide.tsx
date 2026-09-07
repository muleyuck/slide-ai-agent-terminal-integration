import { Slide, type SlideProps, Title } from "flow-slide-engine"
import type { ReactNode } from "react"

import { GitHubIcon } from "../components/icons"
import { Avatar } from "../components/media"
import { Kicker } from "../components/typography"

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-8 flex items-start last:mb-0">
      <dt className="w-32 shrink-0 font-bold text-accent text-lg tracking-wider">{label}</dt>
      <dd className="flex-1 text-xl">{children}</dd>
    </div>
  )
}

export function AboutMeSlide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>About me ／ 自己紹介</Kicker>
      <Title className="font-bold text-accent-strong">スピーカーについて</Title>
      <div className="flex gap-8">
        <dl className="flex-[7] rounded-sm border border-line bg-code-surface px-8 py-10">
          <Row label="名前">
            <span className="text-muted">大塚 拓人</span>
          </Row>
          <Row label="所属">
            <span className="text-muted">株式会社ラクス サーバーサイドエンジニア</span>
          </Row>
          <Row label="経歴">
            <ul className="list-disc space-y-2 pl-4 text-muted marker:text-accent">
              <li>SIerとして生産管理システム開発 - 要件定義〜保守までSI</li>
              <li>医用画像診断システム開発 - デスクトップからWebへのリプレイス</li>
              <li>Webアプリケーションの仕様設計とサーバーサイド開発</li>
            </ul>
          </Row>
          <Row label="Account">
            <a
              href="https://github.com/muleyuck"
              className="flex w-fit items-center gap-1 text-accent"
            >
              <GitHubIcon className="size-6 shrink-0" />
              <span className="underline decoration-2 decoration-accent/40 underline-offset-4">
                muleyuck
              </span>
            </a>
          </Row>
        </dl>
        <div className="flex flex-[3] items-center justify-center">
          <Avatar className="size-48" />
        </div>
      </div>
    </Slide>
  )
}
