import { Slide, type SlideProps, Step, Title } from "flow-slide-engine"
import type { ReactNode } from "react"

import { AvatarBubble, Icon } from "../components/icons"
import { Kicker, Takeaway } from "../components/typography"

/** ターミナルを表現するアイコン */
function TerminalIcon({ className = "" }: { className?: string }) {
  return (
    <Icon className={className} strokeWidth={2} strokeLinejoin="round">
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </Icon>
  )
}

/** 図の中のセッション1つ。往復の相手になるエディタとAIだけ色を持つ。 */
function Session({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-sm border px-4 py-2.5 font-mono text-xl ${
        accent
          ? "border-accent bg-accent/10 font-bold text-accent-strong"
          : "border-line bg-surface text-ink"
      }`}
    >
      {children}
    </span>
  )
}

/**
 * セッション同士の往復を示す両端に矢じりを持つ線
 * エディタ ↔ AI が1日に何十回も通る辺なので、そこだけ色を持たせる。
 */
function Swap({ strong = false, label }: { strong?: boolean; label?: string }) {
  const color = strong ? "bg-accent" : "bg-muted/30"
  const head = strong ? "text-accent" : "text-muted/50"
  return (
    <div className="relative h-0.5 min-w-10 flex-1">
      <div className={`absolute inset-x-2.5 top-0 h-0.5 ${color}`} />
      <span className={`absolute top-1/2 left-0 -translate-y-1/2 text-sm leading-none ${head}`}>
        ◀
      </span>
      <span className={`absolute top-1/2 right-0 -translate-y-1/2 text-sm leading-none ${head}`}>
        ▶
      </span>
      {label && (
        <span className="absolute bottom-1/2 left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap bg-code-surface px-2 text-accent text-base">
          {label}
        </span>
      )}
    </div>
  )
}

/** 1 プロジェクト分の束。中で往復するセッションを横一列に持つ。 */
function Workspace({ name, sessions }: { name: string; sessions: [string, string, string] }) {
  return (
    <div className="relative rounded-sm border border-line bg-code-surface px-6 py-6">
      {/* 枠の角に載せて、この枠がひとまとまりであること自体を指すバッジにする。 */}
      <span className="absolute -top-[10px] -left-[6px] flex size-7 items-center justify-center rounded-sm bg-accent text-surface">
        <TerminalIcon className="size-4" />
      </span>
      <p className="mb-2.5 font-bold font-mono text-accent text-base tracking-wider">{name}</p>
      <div className="flex items-center gap-3">
        <Session>{sessions[0]}</Session>
        <Swap strong label="1日に何十回" />
        <Session accent>{sessions[1]}</Session>
        <Swap />
        <Session>{sessions[2]}</Session>
      </div>
    </div>
  )
}

const REQUIREMENT1_WANTS = [
  {
    no: "① ",
    title: "プロジェクト単位で束ねる",
    text: "ディレクトリを固定したセッションをまとめたい",
  },
  { no: "② ", title: "一発で飛ぶ", text: "エディタとAIを1日に何十回も往復する" },
  { no: "③ ", title: "今どこにいるかが一目で分かる", text: "束ねた分だけ、自分の居場所を見失う" },
]

export function Requirement1Slide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>要求① ／ AI以前から</Kicker>
      <Title className="font-bold text-accent-strong">ターミナル環境に欲しかったものは3つ</Title>

      <ul className="mt-10 flex gap-6">
        {REQUIREMENT1_WANTS.map((w) => (
          <li key={w.no} className="flex-1">
            <span className="font-bold text-accent">{w.no}</span>
            <span className="font-bold text-xl">{w.title}</span>
            <br />
            <span className="font-semibold text-base text-muted">{w.text}</span>
          </li>
        ))}
      </ul>

      <Step className="mt-10 flex gap-6">
        <div className="flex w-40 items-center justify-center">
          <AvatarBubble size="size-32" iconSize="size-16" label="今どこにいる？" />
        </div>

        {/* 自分 ⇔ 幹 ⇔ 枝 ⇔ Workspace のフロー図 */}
        <div className="relative flex w-32 flex-col gap-6">
          {[0, 1].map((row) => (
            <div key={row} className="relative flex-1">
              {/* 幹。上の枝は gap の分だけ下に伸ばして、下の枝の縦線と繋ぐ。 */}
              <div
                className={`absolute left-0 w-0.5 bg-accent ${row === 0 ? "top-1/2 -bottom-6" : "top-0 bottom-1/2"}`}
              />
              <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-accent" />
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-accent text-sm leading-none">
                ▶
              </span>
              <span className="absolute bottom-1/2 left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-muted px-2 py-0.5 font-mono text-inverted-ink text-sm">
                一発
              </span>
            </div>
          ))}
          {/* 自分から幹への引き込み。gap-6 を跨ぐので幅もそれに合わせる。 */}
          <span className="absolute top-1/2 -left-6 -translate-y-1/2 text-accent text-sm leading-none">
            ◀
          </span>
          <div className="absolute top-1/2 -left-6 h-0.5 w-6 -translate-y-1/2 bg-accent" />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <Workspace name="frontend" sessions={["neovim", "Claude Code", "Web Server"]} />
          <Workspace name="backend" sessions={["neovim", "Codex", "API Server"]} />
        </div>
      </Step>

      <Step>
        <Takeaway className="mt-8">
          ① ② は
          <span className="font-semibold text-muted">
            大抵のターミナルやマルチプレクサで実現でき、③も多くのツールが持ちますが、
          </span>
          <span className="font-bold text-accent-strong">どこに出すかはツールが決めます。</span>
        </Takeaway>
      </Step>
    </Slide>
  )
}
