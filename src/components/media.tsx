import { Slide, type SlideProps } from "flow-slide-engine"
import type { ReactNode } from "react"

const COVER = "flex flex-col justify-center bg-linear-135 from-accent to-accent-alt text-surface"

/** `base` 配信パス配下の静的アセットを指す URL を組み立てる。 */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

export function Avatar({ className = "" }: { className?: string }) {
  return <img src={asset("muleyuck.png")} alt="muleyuck" className={className} />
}

export function AppIcon({ className = "" }: { className?: string }) {
  return <img src={asset("terminal-agents-icon.png")} alt="アプリケーションアイコン" className={className} />
}

/**
 * 表紙系スライド（先頭・末尾）の骨格
 * アクセントの斜めグラデーション地に、上部ラベルと右下固定のAppIconを敷く。本文はchildrenで差し替える。
 */
export function CoverSlide({
  cover,
  label,
  iconSize,
  children,
  ...props
}: Omit<SlideProps, "children" | "className"> & {
  cover: string
  label: ReactNode
  iconSize: string
  children: ReactNode
}) {
  return (
    <Slide {...props} data-cover={cover} className={COVER}>
      <p className="mb-4 text-base font-bold tracking-widest text-surface/70 uppercase">{label}</p>
      {children}
      <AppIcon className={`absolute right-12 bottom-12 ${iconSize}`} />
    </Slide>
  )
}
