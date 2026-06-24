import Image from 'next/image'
import { Play } from 'lucide-react'
import Button from './Button'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

export default function VideoSection({ lang }) {
  const t = i18n[lang].videos

  return (
    <section id="videos" className="relative overflow-hidden border-y border-white/10 bg-[#110d09] py-24 md:py-32">
      <div className="absolute inset-0 grain opacity-20" />
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <SectionHeader eyebrow={t.eyebrow} title={t.title} body={t.body} />
            <Button
              href="https://www.youtube.com/c/Sena%C5%9Eenermusic"
              external
              showArrow
              className="mt-9"
            >
              {t.button}
            </Button>
          </div>

          <a
            href="https://www.youtube.com/c/Sena%C5%9Eenermusic"
            target="_blank"
            rel="noreferrer noopener"
            className="group relative block aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-black"
          >
            <Image
              src="/editorial/live-black-white.webp"
              alt="Sena Şener performing on stage"
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover object-[50%_32%] grayscale transition duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-[#d8b487]/70 bg-black/30 text-[#e0bd90] backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-[#b88958] group-hover:text-black sm:h-24 sm:w-24">
                <Play className="ml-1 h-7 w-7 fill-current" />
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8b487]">Official channel</p>
                <p className="mt-2 font-display text-3xl text-white sm:text-4xl">Sena Şener · Watch</p>
              </div>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-white/50 sm:block">YouTube ↗</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
