import { type SlideProps, Title } from "flow-slide-engine"

import { CoverSlide } from "../components/media"

export function SummarySlide(props: SlideProps) {
  return (
    <CoverSlide {...props} cover="close" label="Takeaways ／ まとめ" iconSize="size-24">
      <Title className="mb-8 font-bold text-surface">求めたのは一覧性とカスタマイズ性</Title>
      <ul className="list-disc pl-6 text-xl leading-loose marker:text-surface/60">
        <li>AI以前: プロジェクトを束ねて、一発で飛んで、今どこにいるかが常に見える ／ 要求① </li>
        <li>AI以後: 動いているエージェントの状況が一覧で見える ／ 要求② </li>
      </ul>
      <span className="mt-4 text-base text-surface/60">
        「今どこにいるか」は多くのツールが標準で持っています。差が出るのは「どこに出すか」を選べるかでした
      </span>
      <div className="mt-8 mb-5 h-px w-72 bg-surface/40" />
      <p className="text-2xl leading-relaxed">
        AI時代において最も簡単な効率化は、
        <span className="font-bold">人が行う作業の無駄を削ること</span>
        です。
        <br />
        移り変わる開発スタイルに合わせて開発環境も臆さず改善していくことが大事だと考えています。
      </p>
    </CoverSlide>
  )
}
