import type { ReactNode } from "react"

import { Column, Columns, Deck, Slide, Step, slideHorizontal, Title } from "flow-slide-engine"

/** スライド本文のインラインコード。 */
function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-code-surface px-2 py-0.5 font-mono text-xl text-code">{children}</code>
  )
}

/** キーの割り当てを示すキートップ。 */
function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-block min-w-10 rounded-sm bg-inverted px-2 py-0.5 text-center font-mono text-xl text-inverted-ink">
      {children}
    </kbd>
  )
}

export function Presentation() {
  return (
    <Deck>
      <Slide className="flex flex-col justify-center bg-linear-135 from-accent to-accent-alt text-surface">
        <Title className="font-bold text-surface">スライドを React で書く</Title>
        <p className="mb-6 text-3xl leading-relaxed opacity-90">flow-slide-engine を試す</p>
        <p className="mt-12 mb-6 text-xl leading-relaxed opacity-70">muleyuck / 2026-08-10</p>
      </Slide>

      <Slide>
        <Title className="font-bold text-accent-strong">今日話すこと</Title>
        <ul className="list-disc pl-7 leading-loose marker:text-accent">
          <Step as="li">スライドは React コンポーネント</Step>
          <Step as="li">ステージは固定サイズ、画面に合わせて拡大縮小</Step>
          <Step as="li">ステップ・トランジション・モードはエンジンの担当</Step>
        </ul>
      </Slide>

      <Slide>
        <Title className="font-bold text-accent-strong">役割分担</Title>
        <Columns>
          <Column>
            <h2 className="mb-3 border-l-4 border-accent pl-3 text-3xl font-bold text-ink">エンジン</h2>
            <p className="mb-6 leading-relaxed">レイアウト、スケーリング、遷移、キーボード、URL。</p>
            <p className="mb-6 leading-relaxed">スライド番号やプログレスバーもエンジンが描く。</p>
          </Column>
          <Column>
            <h2 className="mb-3 border-l-4 border-accent pl-3 text-3xl font-bold text-ink">デッキ</h2>
            <p className="mb-6 leading-relaxed">
              色・タイポグラフィ・余白は <Code>--color-*</Code> で決め、Tailwind のユーティリティで書く。
            </p>
            <p className="mb-6 leading-relaxed">ロゴのような talk 固有のものは自前のコンポーネントで。</p>
          </Column>
        </Columns>
      </Slide>

      <Slide transition={slideHorizontal}>
        <Title className="font-bold text-accent-strong">4 つのモード</Title>
        <ul className="mb-6 list-disc pl-7 leading-loose marker:text-accent">
          <li>
            <Key>O</Key> overview — 全スライドをサムネイルで
          </li>
          <li>
            <Key>B</Key> browse — 一覧を横に置いて見る
          </li>
          <li>
            <Key>P</Key> print — 1 ページ 1 スライドで印刷
          </li>
          <li>
            <Key>Esc</Key> どこからでも present に戻る
          </li>
        </ul>
        <p className="mb-6 leading-relaxed">このスライドだけ横からスライドインしてくる。</p>
      </Slide>

      <Slide className="flex flex-col justify-center bg-linear-135 from-accent to-accent-alt text-surface">
        <Title className="font-bold text-surface">ここから作っていく</Title>
        <p className="mb-6 text-3xl leading-relaxed opacity-90">
          <code className="rounded-sm bg-surface/20 px-2 py-0.5 font-mono text-xl">src/Presentation.tsx</code>{" "}
          にスライドを足すだけ
        </p>
      </Slide>
    </Deck>
  )
}
