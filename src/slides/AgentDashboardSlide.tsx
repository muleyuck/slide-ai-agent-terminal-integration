import { Slide, type SlideProps, Title } from "flow-slide-engine"

import { asset } from "../components/media"
import { Code, Key, Kicker, Takeaway } from "../components/typography"

export function AgentDashboardSlide(props: SlideProps) {
  return (
    <Slide {...props}>
      <Kicker>要求②への答え ／ Agent Dashboard</Kicker>
      <Title className="font-bold text-accent-strong">エージェントの状況を必要なときだけ出す</Title>
      <img
        src={asset("agents-dashboard.gif")}
        alt="cmd+p で開く自作のエージェントダッシュボード"
        className="mb-5 w-full rounded-sm border border-line"
      />
      <Takeaway>
        herdrのサイドバーにエージェントの状況が表示されますが、サイドバーは表示せず
        <span className="space-x-1 px-1">
          <Key symbol={true}>⌘</Key>
          <Key>P</Key>
        </span>
        のpopupに置き換えました。
        <br />
        <Code>herdr agent list</Code>をfzfに流す簡単なスクリプトで達成できました。
      </Takeaway>
    </Slide>
  )
}
