import { Slide, type SlideProps, Step, Title } from "flow-slide-engine"

import { AvatarBubble, Icon } from "../components/icons"
import { Kicker, Takeaway } from "../components/typography"

/** エージェント状態アイコン */
function DotIcon({ className = "" }: { className?: string }) {
  return (
    <Icon className={className} filled>
      <circle cx="12" cy="12" r="6" />
    </Icon>
  )
}

function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <Icon className={className} strokeWidth={2.4}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6" />
      <path d="M12 16.5v.01" />
    </Icon>
  )
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <Icon className={className} strokeWidth={2.6} strokeLinejoin="round">
      <path d="m5 13 4 4L19 7" />
    </Icon>
  )
}

/**
 * エージェントの3つの状態とラベル
 * 止まっているのに気づけない、が言いたいことなので「承認待ち」だけaccent
 */
const STATE = {
  running: { icon: DotIcon, label: "実行中", tone: "text-accent" },
  blocked: { icon: AlertIcon, label: "承認待ち", tone: "text-code" },
  done: { icon: CheckIcon, label: "完了", tone: "text-muted" },
} as const

type Agent = { name: string; state: keyof typeof STATE }

function AgentBox({ name, state }: Agent) {
  const { icon: Icon, label, tone } = STATE[state]
  const strong = state === "blocked"
  return (
    <span
      className={`flex shrink-0 items-center rounded-sm border px-4 py-2 whitespace-nowrap ${strong ? "border-code bg-code/10" : "border-line bg-surface"
        }`}
    >
      <span className="font-mono text-lg text-ink pr-2.5">{name}</span>
      <Icon className={`size-4 ${tone}`} />
      <span className={`text-base font-bold ${tone}`}>{label}</span>
    </span>
  )
}

/** 1 プロジェクト分の束。4 枚目の Workspace と同じ見え方に揃えてある。 */
function Project({ name, agents }: { name: string; agents: Agent[] }) {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-line bg-code-surface px-5 py-3">
      <p className="w-28 shrink-0 font-mono text-base font-bold tracking-wider text-accent">{name}</p>
      <div className="flex gap-3">
        {agents.map((a) => (
          <AgentBox key={a.name + a.state} {...a} />
        ))}
      </div>
    </div>
  )
}

/** 3 プロジェクトに 5 セッション。承認待ちの 1 つは、わざと画面の外に置いてある。 */
const ON_SCREEN = { name: "frontend", agents: [{ name: "Claude Code", state: "running" }] } as const
const BEHIND = [
  {
    name: "backend",
    agents: [
      { name: "Codex", state: "running" },
      { name: "Codex", state: "blocked" },
    ],
  },
  {
    name: "infra",
    agents: [
      { name: "Claude Code", state: "done" },
      { name: "Codex", state: "running" },
    ],
  },
] as const satisfies readonly { name: string; agents: readonly Agent[] }[]

export function Requirement2Slide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>要求② ／ AI以後</Kicker>
      <Title className="font-bold text-accent-strong">AI時代の到来で要求がもう1つ増えた</Title>

      <div className="flex gap-6 mt-12">
        <div className="flex w-40 shrink-0 items-start justify-center pt-10">
          <AvatarBubble size="size-28" iconSize="size-14" label="どれが待ってる？" />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {/* 自分が画面上で見えているプロセスを表現 */}
          <div className="relative rounded-sm border-2 border-accent px-4 pt-5 pb-4">
            <span className="absolute -top-3 left-4 bg-surface px-2 text-base font-bold text-accent">
              画面で同時に見えるものは限られる
            </span>
            <Project name={ON_SCREEN.name} agents={[...ON_SCREEN.agents]} />
          </div>

          {/* バックグラウンドで動いているプロセスを表現 */}
          <div className="relative rounded-sm border border-dashed border-muted/40 px-4 pt-5 pb-4">
            <span className="absolute -top-3 left-4 bg-surface px-2 text-base font-bold text-muted">
              残りは裏で動いている
            </span>
            <div className="flex flex-col gap-3 opacity-55">
              {BEHIND.map((p) => (
                <Project key={p.name} name={p.name} agents={[...p.agents]} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Step className="mt-12">
        <Takeaway className="mt-6">
          <span className="font-bold text-code">承認待ちのセッションは見ている画面上には描画されず気づきにくい。通知も見逃しがち。</span>
          <br />
          ここで
          <span className="font-bold text-accent-strong">
            要求② 「動いているエージェントの状況が一覧で見えること」
          </span>
          が新たに必要になりました。
        </Takeaway>
      </Step>
    </Slide>
  )
}
