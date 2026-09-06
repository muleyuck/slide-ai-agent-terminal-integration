import { Slide, type SlideProps, Step, Title } from "flow-slide-engine"

import { Kicker, Takeaway } from "../components/typography"

type Stop = {
  /** そのときのターミナル構成 */
  tool: string
  /** 使い始めた時期 */
  date: string
  /** 本流に残らなかったツール */
  abandoned?: boolean
}

// TODO: MOVESをここにまとめて1回のループに
const HISTORY: Stop[] = [
  { tool: "ghostty + tmux", date: "〜2026.03" },
  { tool: "cmux", date: "2026.03", abandoned: true },
  { tool: "ghostty + tmux", date: "に戻る" },
  { tool: "WezTerm", date: "2026.07", abandoned: true },
  { tool: "ghostty + herdr", date: "2026.08〜" },
]

/**
 * 変更点の間に記載する乗り換えた理由。
 * 自動折り返しに任せると「プロジェ / クト」のように語の途中で割れるので、
 * 意味の切れ目で 2 行に分けて持つ。
 */
const MOVES: [string, string][] = [
  ["cmuxで全部できると", "期待して移行した"],
  ["サイドバー固定で", "自分好みのUI/UXにできない"],
  ["tmux無しで", "プロジェクトを束ねたい"],
  ["複数セッションが動き", "エージェントの一覧が欲しい"],
]

export function HistorySlide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>History ／ 乗り換えの履歴</Kicker>
      <Title className="font-bold text-accent-strong">
        より良いターミナル環境を求めて
      </Title>

      {/* 理由は線の上。5 点を 10% ずつ内側に寄せると、4 つの区間の中心に並ぶ。 */}
      <div className="flex items-end px-[9%] pt-14">
        {MOVES.map(([head, tail]) => (
          <div key={head} className="flex flex-1 flex-col items-center">
            <p className="text-center text-lg leading-snug font-bold text-accent-strong">
              {head}
              <br />
              {tail}
            </p>
            <div className="mt-3 h-14 w-0.5 bg-accent/50" />
          </div>
        ))}
      </div>

      {/* 履歴の本流。連結線は size-7 の丸の中心 (top-3.5) に -translate-y-1/2 で乗せる。 */}
      <div className="relative mt-1">
        {/* TODO: 右向きの矢じりをつける */}
        <div className="absolute inset-x-0 top-3.5 h-1.5 -translate-y-1/2 bg-accent" />
        <div className="flex items-start">
          {HISTORY.map((s, i) => (
            <div key={`${s.tool}${i}`} className="flex flex-1 flex-col items-center">
              <div
                className={`relative size-7 rounded-full border-3 ${s.abandoned ? "border-muted/80 bg-surface" : "border-accent bg-accent"}`}
              />
              <div className="pt-6 text-center">
                <p className={`text-xl leading-tight font-bold ${s.abandoned ? "text-muted" : ""}`}>
                  {s.tool}
                </p>
                <p className="text-lg text-muted">{s.date}</p>
                {s.abandoned && <p className="mt-1 text-lg font-bold text-code">一時的な利用に留まる</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Step>
        <Takeaway className="mt-16">
          乗り換えた理由は毎回違いますが、要求は常に同じでした。構成のシンプルさを追い求め紆余曲折しました。
          <br />
          ③の「今どこにいるか」は、tmuxもcmuxも標準で持っていました。違ったのは
          <span className="font-bold text-accent-strong">
            どこに出すかを自分で決められるか
          </span>
          です。
        </Takeaway>
      </Step>
    </Slide>
  )
}
