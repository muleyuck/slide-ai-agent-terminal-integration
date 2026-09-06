import { Slide, type SlideProps, Step, Title } from "flow-slide-engine"

import { asset } from "../components/media"
import { Kicker, Takeaway } from "../components/typography"

/**  現在のスタック. 結論として先に見せる */
const STACK = [
  { file: "icon-ghostty.png", name: "ghostty", role: "ターミナル" },
  { file: "icon-herdr.svg", name: "herdr", role: "マルチプレクサ" },
  { file: "icon-neovim.png", name: "neovim", role: "エディタ" },
]

/** この資料で触れていくターミナル環境の要求事項 */
const WANTS = [
  { label: "要求①", text: "プロジェクトごとに束ねて、迷わず行き来したい" },
  { label: "要求②", text: "動いているエージェントの状況が一覧で見えてほしい" },
]

export function ConclusionSlide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>Environment ／ 今の構成</Kicker>
      <Title className="font-bold text-accent-strong">【結論】見直したターミナル環境</Title>

      <div className="flex items-start justify-center gap-6 pt-10">
        {STACK.map((s, i) => (
          <div key={s.name} className="flex items-start gap-6">
            {i > 0 && <p className="pt-8 font-bold text-3xl text-muted">+</p>}
            <div className="w-64 text-center">
              <img src={asset(s.file)} alt={s.name} className="mx-auto size-24 object-contain" />
              <p className="mt-3 font-bold text-2xl text-ink">{s.name}</p>
              <p className="mt-1 font-semibold text-base text-muted leading-snug">{s.role}</p>
            </div>
          </div>
        ))}
      </div>

      <Step className="mt-6">
        {/* 下の 2 つが原因で、上の構成がその結果だと矢印の向きで示す。 */}
        <p className="flex items-center justify-center gap-2 font-bold text-accent text-lg leading-none">
          <span className="text-base">▲</span>
          この2つを満たすための構成
        </p>
        <div className="mt-3 flex items-center gap-3">
          {WANTS.map((w) => (
            <div
              key={w.label}
              className="flex flex-1 flex-col items-center gap-4 rounded-sm border border-line px-6 py-4"
            >
              <p className="shrink-0 font-bold text-2xl text-accent">{w.label}</p>
              <p className="font-bold text-ink text-xl leading-snug">{w.text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step>
        <Takeaway className="mt-16">
          <span className="font-semibold text-accent-strong">
            2つの要求を達成するために行った対応とその変遷をこれから話します。
          </span>
        </Takeaway>
      </Step>

      {/* CC BY 3.0 の Neovim ロゴはクレジットが必須。本文とは無関係のためスライド左下端で視線から外す。 */}
      <p className="absolute right-32 bottom-5 left-12 text-muted/60 text-xs">
        ghostty (MIT, © Mitchell Hashimoto and Ghostty contributors) ／ herdr (© Herdr, Inc.) ／
        Neovim logo by Jason Long, CC BY 3.0 ／ 各ロゴは各権利者に帰属します
      </p>
    </Slide>
  )
}
