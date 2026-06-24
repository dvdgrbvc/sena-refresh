'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import Button from './Button'
import SectionHeader from './SectionHeader'
import { i18n } from '../app/i18n'

export default function TourSection({ lang }) {
  const t = i18n[lang].tour
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [modalShow, setModalShow] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function loadShows() {
      try {
        const response = await fetch('/api/tour')
        if (!response.ok) throw new Error('Tour request failed')
        const data = await response.json()
        if (!cancelled) setShows(data.shows || [])
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadShows()
    return () => {
      cancelled = true
    }
  }, [])

  const formatDate = (iso) => {
    const date = new Date(`${iso}T12:00:00`)
    if (Number.isNaN(date.getTime())) return { day: '—', month: '', year: '' }
    const locale = lang === 'tr' ? 'tr-TR' : 'en-GB'
    return {
      day: date.toLocaleDateString(locale, { day: '2-digit' }),
      month: date.toLocaleDateString(locale, { month: 'short' }).replace('.', ''),
      year: date.toLocaleDateString(locale, { year: 'numeric' }),
    }
  }

  const openTickets = useCallback((show) => {
    if (show.status === 'soldout') return

    if (show.ticketUrl) {
      window.open(show.ticketUrl, '_blank', 'noopener,noreferrer')
      return
    }

    const providers = [
      show.bubilet && { label: 'Bubilet', url: show.bubilet },
      show.biletix && { label: 'Biletix', url: show.biletix },
    ].filter(Boolean)

    if (providers.length === 1) {
      window.open(providers[0].url, '_blank', 'noopener,noreferrer')
    } else if (providers.length > 1) {
      setModalShow(show)
    }
  }, [])

  return (
    <section id="tour" className="relative bg-[#080706] py-24 md:py-32">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeader eyebrow={t.eyebrow} title={t.title} body={t.subtitle} />

          <div className="border-t border-white/20">
            {loading && <p className="py-8 text-sm text-white/45">{t.loading}</p>}
            {error && <p className="py-8 text-sm text-[#d1a36e]">{t.error}</p>}
            {!loading && !error && shows.length === 0 && (
              <p className="py-8 font-display text-2xl text-white/55">{t.empty}</p>
            )}

            {!loading && !error && shows.map((show, index) => {
              const date = formatDate(show.date)
              const soldOut = show.status === 'soldout'
              return (
                <article
                  key={`${show.date}-${show.city}-${index}`}
                  className="group grid gap-5 border-b border-white/15 py-6 transition hover:border-[#b88958]/60 sm:grid-cols-[104px_1fr_auto] sm:items-center"
                >
                  <div className="flex items-baseline gap-3 sm:block">
                    <span className="font-display text-4xl leading-none text-[#d8b487]">{date.day}</span>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                      {date.month} {date.year}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-[#f2ebe2] sm:text-3xl">{show.city}</h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.15em] text-white/42">{show.venue}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openTickets(show)}
                    disabled={soldOut || (!show.bubilet && !show.biletix && !show.ticketUrl)}
                    className="flex items-center justify-between gap-5 rounded-full border border-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-[#b88958] hover:text-[#d8b487] disabled:cursor-not-allowed disabled:opacity-35 sm:justify-center"
                  >
                    {soldOut ? t.soldout : t.tickets}
                    {!soldOut && <ArrowUpRight className="h-4 w-4" />}
                  </button>
                </article>
              )
            })}

            <p className="mt-5 text-xs leading-5 text-white/30">{t.note}</p>
          </div>
        </div>
      </div>

      {modalShow && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 px-5 backdrop-blur-md"
          onClick={() => setModalShow(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-[2rem] border border-white/15 bg-[#12100d] p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalShow(null)}
              aria-label={t.close}
              className="absolute right-5 top-5 text-white/45 transition hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#b88958]">{modalShow.city}</p>
            <h3 className="mt-3 font-display text-3xl text-white">{t.choose}</h3>
            <div className="mt-7 grid gap-3">
              {modalShow.bubilet && (
                <Button href={modalShow.bubilet} external showArrow>Bubilet</Button>
              )}
              {modalShow.biletix && (
                <Button href={modalShow.biletix} external variant="outline" showArrow>Biletix</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
