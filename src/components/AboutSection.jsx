import Image from 'next/image'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

export default function AboutSection({ lang }) {
  const t = i18n[lang].about

  return (
    <section id="about" className="relative overflow-hidden border-y border-white/10 bg-[#0d0a08] py-24 md:py-32">
      <div className="absolute inset-0 grain opacity-20" />
      <div className="mx-auto grid max-w-[1450px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.86fr] lg:items-center lg:gap-20 lg:px-12">
        <div>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} />
          <div className="mt-9 grid gap-6 text-base leading-8 text-white/55 sm:grid-cols-2">
            <p>{t.body1}</p>
            <p>{t.body2}</p>
          </div>
          <div className="mt-12 flex items-center gap-5 border-t border-white/15 pt-6">
            <span className="font-display text-4xl text-[#b88958]">SŞ</span>
            <div className="text-[10px] uppercase leading-5 tracking-[0.26em] text-white/35">
              Istanbul<br />Music · Live · Visuals
            </div>
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/editorial/portrait-studio.webp"
            alt="Sena Şener portrait"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover grayscale contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />
        </div>
      </div>
    </section>
  )
}
