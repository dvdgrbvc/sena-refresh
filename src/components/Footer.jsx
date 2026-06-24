import { Instagram, Music2, Youtube } from 'lucide-react'
import { i18n } from '../app/i18n'

export default function Footer({ lang, onNavigate }) {
  const t = i18n[lang].footer
  return (
    <footer className="border-t border-white/10 bg-[#070706] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1450px] flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="font-display text-3xl leading-none tracking-[0.04em] text-[#e6d5c0] transition hover:text-[#d8b487]"
          >
            SENA ŞENER
          </button>
          <p className="mt-3 text-xs text-white/30">© {new Date().getFullYear()} Sena Şener. {t.rights}</p>
        </div>

        <div className="flex items-center gap-5 text-white/45">
          <a href="https://www.instagram.com/sena.sener/" target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="transition hover:text-[#d8b487]"><Instagram className="h-5 w-5" /></a>
          <a href="https://open.spotify.com/artist/7CW2eGwAuElNq09rVtZYsM" target="_blank" rel="noreferrer noopener" aria-label="Spotify" className="transition hover:text-[#d8b487]"><Music2 className="h-5 w-5" /></a>
          <a href="https://www.youtube.com/c/Sena%C5%9Eenermusic" target="_blank" rel="noreferrer noopener" aria-label="YouTube" className="transition hover:text-[#d8b487]"><Youtube className="h-5 w-5" /></a>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="ml-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 transition hover:text-white"
          >
            {t.back} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
