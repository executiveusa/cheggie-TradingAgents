import { SVGProps } from 'react'

export function CTLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CheggieTrade logo"
      {...props}
    >
      {/* C stroke */}
      <path
        d="M26 8C22.5 6.5 18 6.5 14 9C10 11.5 8 15.5 8 20C8 24.5 10 28.5 14 31C18 33.5 22.5 33.5 26 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* T crossbar */}
      <path
        d="M24 14H36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* T stem */}
      <path
        d="M30 14V32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChessKnightSVG({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <CTLogo className={className} {...props} />
}
