import { ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/utils'

export default function Button({
  href,
  onClick,
  children,
  variant = 'solid',
  disabled = false,
  ariaLabel,
  className,
  external = false,
  showArrow = false,
  type = 'button',
}) {
  const base =
    'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88958] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-40'

  const styles = {
    solid:
      'border border-[#b88958] bg-[#b88958] text-[#0a0908] hover:bg-[#d1a36e] hover:border-[#d1a36e]',
    outline:
      'border border-[#b88958]/70 bg-transparent text-[#d8b487] hover:bg-[#b88958] hover:text-black',
    ghost:
      'border border-white/15 bg-white/[0.02] text-white/80 hover:border-white/35 hover:text-white',
  }

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        aria-label={ariaLabel}
        href={href}
        className={cn(base, styles[variant], className)}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(base, styles[variant], className)}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
