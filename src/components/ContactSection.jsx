import Image from 'next/image'
import Button from './Button'
import { i18n } from '../app/i18n'

export default function ContactSection({ lang }) {
  const t = i18n[lang].contact

  return (
    <section id="contact" className="bg-[#070706] py-24 md:py-32">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#15110d] p-7 sm:p-10 lg:p-14">
          <div className="absolute inset-0 grain opacity-20" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b88958]">{t.eyebrow}</p>
              <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.035em] text-[#f4eee6] sm:text-6xl lg:text-8xl">
                {t.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/50 md:text-lg">{t.body}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="mailto:management@senasener.com" showArrow>{t.email}</Button>
              <Button href="tel:+905547388339" variant="outline">{t.call}</Button>
            </div>
          </div>

          <div className="relative mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15">
                <Image src="/asli-eren.jpg" alt="Aslı Eren" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="font-display text-xl text-white">{t.manager}</p>
                <a href="mailto:management@senasener.com" className="mt-1 block text-sm text-white/40 transition hover:text-[#d8b487]">
                  management@senasener.com
                </a>
              </div>
            </div>
            <a href="tel:+905547388339" className="text-sm tracking-[0.12em] text-white/45 transition hover:text-white">
              +90 554 738 83 39
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
