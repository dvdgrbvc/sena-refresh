'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button'
import { i18n } from '../app/i18n'

const tags = ['Istanbul', 'Alternative Pop', 'Rock']

export default function Hero({ lang, onNavigate }) {
  const t = i18n[lang].hero
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-[calc(100svh-74px)] overflow-hidden bg-[#070706]">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="mx-auto grid min-h-[calc(100svh-74px)] max-w-[1600px] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[66svh] overflow-hidden lg:min-h-0">
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { scale: 1.05, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Image
              src="/editorial/hero-stage.webp"
              alt="Sena Şener performing live"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-[52%_35%] grayscale contrast-[1.08]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070706] via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#070706]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,transparent_0,transparent_36%,rgba(0,0,0,.42)_100%)]" />
        </div>

        <div className="relative flex items-center px-6 pb-16 pt-5 sm:px-10 lg:px-14 lg:pb-20 lg:pt-0 xl:px-20">
          <div className="absolute right-[-8rem] top-[16%] hidden h-[28rem] w-[28rem] rounded-full bg-[#8b572c]/10 blur-[100px] lg:block" />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative z-10 w-full"
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b88958]">
              {t.eyebrow}
            </p>
            <h1 className="font-display text-[22vw] leading-[0.72] tracking-[-0.045em] text-[#f3ece3] sm:text-[8.5rem] lg:text-[7.4rem] xl:text-[9.5rem] 2xl:text-[11rem]">
              <span className="block">{t.titleTop}</span>
              <span className="block pl-[0.18em] text-[#b88958]">{t.titleBottom}</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href="https://open.spotify.com/artist/7CW2eGwAuElNq09rVtZYsM"
                external
                showArrow
              >
                {t.listen}
              </Button>
              <Button variant="outline" onClick={() => onNavigate('tour')}>
                {t.dates}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
