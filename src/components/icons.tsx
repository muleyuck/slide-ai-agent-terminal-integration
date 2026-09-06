import type { ReactNode } from "react"

/**
 * 手書きの線画アイコン共通ラッパー。`viewBox`・`stroke`・`aria-hidden` 等の定型部分を
 * ここに集約し、各アイコンは中身の path/circle だけを渡す。`filled` は塗りつぶし系
 * （ドット等）用で、その場合 stroke 系属性は一切出さない。
 */
export function Icon({
  className = "",
  strokeWidth,
  strokeLinejoin,
  filled = false,
  children,
}: {
  className?: string
  strokeWidth?: number
  strokeLinejoin?: "round" | "miter" | "bevel" | "inherit"
  filled?: boolean
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? undefined : "currentColor"}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap={filled ? undefined : "round"}
      strokeLinejoin={filled ? undefined : strokeLinejoin}
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

/** 図中のユーザーアイコン */
export function UserIcon({ className = "" }: { className?: string }) {
  return (
    <Icon className={className} strokeWidth={1.8} strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  )
}

/** 図中のユーザー＋吹き出し */
export function AvatarBubble({
  size,
  iconSize,
  label,
}: {
  size: string
  iconSize: string
  label: string
}) {
  return (
    <div className="relative">
      <div className={`flex ${size} items-center justify-center rounded-full bg-accent text-surface`}>
        <UserIcon className={iconSize} />
      </div>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-base font-bold whitespace-nowrap text-muted">
        自分
      </span>
      {/* 吹き出し */}
      <span className="absolute top-full left-1/2 mt-4 -translate-x-1/2 rounded-sm border border-code bg-surface px-3 py-1 text-lg font-bold whitespace-nowrap text-code">
        <span className="absolute -top-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-t border-l border-code bg-surface" />
        {label}
      </span>
    </div>
  )
}
