'use client'

import { useState } from 'react'
import { Instagram, Menu, Music2, X, Youtube } from 'lucide-react'
import { i18n } from '../app/i18n'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sena.sener/',
    icon: Instagram,
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/artist/7CW2eGwAuElNq09rVtZYsM',
    icon: Music2,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/c/Sena%C5%9Eenermusic',
    icon: Youtube,
  },
]

export default function Nav({ lang, setLang, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false)
  const t = i18n[lang].nav

  const links = [
    ['music', t.music],
    ['tour', t.tour],
    ['videos', t.videos],
    ['photos', t.photos],
    ['about', t.about],
  ]

  const navigate = (section) => {
    onNavigate(section)
    setOpen(false)
  }

  const toggleLanguage = () => setLang(lang === 'en' ? 'tr' : 'en')

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090806]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="relative z-50 flex flex-col font-display text-[19px] leading-[0.82] tracking-[0.08em] text-[#ead8c2] transition hover:text-[#d8b487]"
        >
          <span>SENA</span>
          <span>ŞENER</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([section, label]) => (
            <button
              key={section}
              type="button"
              onClick={() => navigate(section)}
              className={`text-[10px] font-semibold uppercase tracking-[0.24em] transition hover:text-[#d8b487] ${
                activeSection === section ? 'text-[#d8b487]' : 'text-white/65'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate('contact')}
            className={`rounded-full border border-[#b88958]/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:bg-[#b88958] hover:text-black ${
              activeSection === 'contact'
                ? 'bg-[#b88958] text-black'
                : 'text-[#d8b487]'
            }`}
          >
            {t.contact}
          </button>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="text-white/45 transition hover:text-[#d8b487]"
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="ml-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 transition hover:text-white"
          >
            {t.toggle}
          </button>
        </div>

        <div className="relative z-50 flex items-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65"
          >
            {t.toggle}
          </button>
          <button
            type="button"
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-[#090806] px-6 pb-8 pt-28 transition duration-500 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0'
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {links.map(([section, label], index) => (
            <button
              key={section}
              type="button"
              onClick={() => navigate(section)}
              className={`border-b border-white/10 py-5 text-left font-display text-4xl transition ${
                activeSection === section ? 'text-[#d8b487]' : 'text-[#f0e8de]'
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate('contact')}
            className="border-b border-white/10 py-5 text-left font-display text-4xl text-[#b88958]"
          >
            {t.contact}
          </button>
        </nav>
        <div className="mt-10 flex items-center gap-6">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="text-white/60"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
