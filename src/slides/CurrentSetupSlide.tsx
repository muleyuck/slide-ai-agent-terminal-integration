import { Slide, type SlideProps, Step, Title } from "flow-slide-engine"

import { asset } from "../components/media"
import { Kicker, Takeaway } from "../components/typography"

export function CurrentSetupSlide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>要求①への答え ／ 常時表示</Kicker>
      <Title className="font-bold text-accent-strong">「どこに出すか」を自分で決める</Title>

      <img
        src={asset("tab-bar.png")}
        alt="herdr のタブバー。左に workspace 内のタブ、右端に workspace の一覧が常に出ている。"
        className="w-full rounded-sm border border-line"
      />

      <div className="mt-5 flex gap-10 rounded-md border border-line px-2 pt-1 pb-8 text-lg leading-relaxed">
        <p className="flex-1 font-semibold">
          <span className="font-bold text-accent">左 — タブ一覧</span>
          <br />
          <span className="font-semibold text-base">
            今いるworkspaceの中身。エディタやAIエージェントなどのタブが並ぶ
          </span>
        </p>
        <p className="flex-1 text-end">
          <span className="font-bold text-accent">右 — workspace一覧</span>
          <br />
          <span className="font-semibold text-base">どのプロジェクトを開いているかを常時表示</span>
        </p>
      </div>

      <Step>
        <Takeaway className="mt-5">
          herdrはworkspaceの表示機能を持ちません。ただ、タブバーに任意の文字列を差し込めるので、cmuxで欲しかった場所に
          <br />
          <span className="font-bold text-accent-strong">シェルスクリプト</span>
          でworkspace一覧を表示しました。
        </Takeaway>
      </Step>
    </Slide>
  )
}
