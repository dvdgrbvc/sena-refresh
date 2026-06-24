import { cn } from '../lib/utils'

export default function SectionHeader({ eyebrow, title, body, align = 'left', className }) {
  return (
    <header
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b88958]">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-4xl leading-[0.98] tracking-[-0.035em] text-[#f4eee6] sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      )}
      {body && (
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
          {body}
        </p>
      )}
    </header>
  )
}
