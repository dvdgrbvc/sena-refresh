'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

const images = [
  { src: '/editorial/portrait-close.webp', alt: 'Sena Şener portrait', span: 'md:col-span-5 md:row-span-2' },
  { src: '/editorial/stage-amber.webp', alt: 'Sena Şener performing under amber lights', span: 'md:col-span-7' },
  { src: '/editorial/crowd.webp', alt: 'Sena Şener facing a live audience', span: 'md:col-span-4' },
  { src: '/editorial/studio-chair.webp', alt: 'Sena Şener studio portrait', span: 'md:col-span-3' },
  { src: '/editorial/acoustic.webp', alt: 'Sena Şener acoustic performance', span: 'md:col-span-5' },
  { src: '/editorial/portrait-studio.webp', alt: 'Black and white studio portrait of Sena Şener', span: 'md:col-span-7' },
  { src: '/editorial/stage-red.webp', alt: 'Sena Şener on a red-lit stage', span: 'md:col-span-5' },
]

export default function GallerySection({ lang }) {
  const t = i18n[lang].gallery
  const [active, setActive] = useState(null)

  const close = () => setActive(null)
  const next = useCallback(() => {
    setActive((current) => (current === null ? 0 : (current + 1) % images.length))
  }, [])
  const previous = useCallback(() => {
    setActive((current) => (current === null ? 0 : (current - 1 + images.length) % images.length))
  }, [])

  useEffect(() => {
    if (active === null) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [active, next, previous])

  return (
    <section id="photos" className="bg-[#070706] py-24 md:py-32">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-14 grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[330px]">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${t.open}: ${image.alt}`}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" />
              <span className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.25em] text-white/55 opacity-0 transition group-hover:opacity-100">
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={close}
        >
          <button
            type="button"
            aria-label={t.close}
            onClick={close}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/70 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t.previous}
            onClick={(event) => { event.stopPropagation(); previous() }}
            className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white/70 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div
            className="relative h-[82vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            type="button"
            aria-label={t.next}
            onClick={(event) => { event.stopPropagation(); next() }}
            className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white/70 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 text-[10px] uppercase tracking-[0.24em] text-white/45">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
