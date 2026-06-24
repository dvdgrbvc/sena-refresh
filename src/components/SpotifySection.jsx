import Image from 'next/image'
import { Music2 } from 'lucide-react'
import Button from './Button'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

export default function SpotifySection({ lang }) {
  const t = i18n[lang].music

  return (
    <section id="music" className="relative overflow-hidden border-y border-white/10 bg-[#0d0b09] py-24 md:py-32">
      <div className="absolute inset-0 grain opacity-20" />
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <SectionHeader eyebrow={t.eyebrow} body={t.body} />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-black sm:min-h-[720px]">
            <Image
              src="/editorial/hero-profile.webp"
              alt="Sena Şener live portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-center sepia-[0.28] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4ad7b]">
                {t.featured}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {t.songs.map((song, index) => (
                  <div
                    key={song}
                    className="flex items-center justify-between border-t border-white/25 py-3"
                  >
                    <span className="font-display text-xl text-white">{song}</span>
                    <span className="text-[10px] tracking-[0.24em] text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[#15110d] p-5 sm:p-8 lg:p-10">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[#b88958]">
                <Music2 className="h-5 w-5" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Sena Şener</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                <iframe
                  src="https://open.spotify.com/embed/artist/7CW2eGwAuElNq09rVtZYsM?utm_source=generator&theme=0"
                  width="100%"
                  height="590"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify — Sena Şener"
                  className="block"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="https://open.spotify.com/artist/7CW2eGwAuElNq09rVtZYsM"
                external
                showArrow
              >
                {t.spotify}
              </Button>
              <Button
                href="https://music.apple.com/us/artist/sena-%C5%9Fener/992280338"
                external
                variant="ghost"
                showArrow
              >
                {t.apple}
              </Button>
              <Button
                href="https://www.youtube.com/c/Sena%C5%9Eenermusic"
                external
                variant="ghost"
                showArrow
              >
                {t.youtube}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
