type ChessKnightProps = {
  size?: number
  className?: string
}

export default function ChessKnight({ size = 40, className = '' }: ChessKnightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-label="CHEGGIE TRADE chess knight logo"
      className={className}
    >
      <path d="M30 85 L70 85 L68 75 L32 75 Z" />
      <path d="M35 75 L65 75 L62 65 L38 65 Z" />
      <path d="M25 65 Q20 55 22 45 Q24 35 30 28 Q36 22 40 20 Q38 25 42 28 Q50 20 58 22 Q65 24 68 30 Q72 38 70 48 Q68 58 62 65 Z" />
      <circle cx="45" cy="35" r="4" fill="var(--bg-base, #080f0b)" />
      <path d="M22 50 Q18 48 20 44 Q24 40 28 42 Q30 46 28 50 Z" />
    </svg>
  )
}
