import type { ReactNode } from "react"

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-code-surface px-2 py-0.5 font-mono text-code text-xl">
      {children}
    </code>
  )
}

/**
 * キーキャップ。箱の中心は大文字の字面 (ベースライン〜キャップハイト) の中心に合う。
 * ⌘ などの修飾キー記号は同じ font-size でも大文字より 2 割背が高く、そのまま入れると
 * 記号だけ上に寄って見えるので、字面を大文字に揃える `symbol` を渡す。
 */
export function Key({ children, symbol = false }: { children: ReactNode; symbol?: boolean }) {
  return (
    <kbd className="inline-block min-w-10 rounded-sm bg-muted px-2 py-0.5 text-center font-mono text-inverted-ink text-xl">
      {symbol ? <span className="text-[0.84em]">{children}</span> : children}
    </kbd>
  )
}

/**
 * 見出しの上に置くラベル。英字を大文字・字間広めにして日本語をスラッシュで繋ぐ。
 * 見出し自体は濃色に落としてあるので、面の中で色を持つのはここだけになる。
 */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1 font-bold text-accent text-base uppercase tracking-widest">{children}</p>
  )
}

/**
 * そのスライドの主張を 1 つだけ置くカード。
 * コードの面 (code-surface) は無彩色なので、主張の面はアクセント色を薄く敷いて役割を分ける。
 */
export function Takeaway({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-sm border-accent border-l-4 bg-accent/10 px-6 py-4 text-ink text-xl leading-relaxed ${className}`}
    >
      {children}
    </div>
  )
}
