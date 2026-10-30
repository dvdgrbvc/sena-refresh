# Sena Şener — new era

A non-scrolling artist homepage with the existing espresso, cream and orange palette, Volina font, monogram and film. Three original single covers open into a single full-screen experience: Music, Live and Booking. Every page load starts in Turkish; English can be selected for the current visit.

## Update the next release

1. Put the original cover in `assets/releases/`.
2. Add an entry to `releases` in `content.mjs` (chronological order): title, two title lines, date, cover, Turkish/English note and direct Spotify/Apple Music/YouTube URLs.
3. Change `site.featuredRelease` to that entry's ID.
4. Run `npm run build` and commit the generated `index.html` along with the content and asset changes.

The build updates the initial hero, release shelf, page title, description, social preview and structured data. The browser uses the same content for release switching and the music overlay. Contact details and persistent external links also live in `content.mjs`.

The Live overlay links to Sena's current Bubilet artist listings and Instagram. There are no local concert dates to maintain and no embedded ticket widgets to go stale. No album-release date or full-album availability is claimed.

## Run and check

Requires Node.js 18 or newer. There are no npm dependencies or API keys.

```sh
npm run build
npm run check
npm run dev
```

The preview listens on port 3000, or `PORT` / `--port` when supplied. Production is plain static hosting. `npm run build` generates `dist/` with only the HTML, CSS, browser JavaScript and assets. `vercel.json` sets framework **Other**, build command `npm run build`, and output directory `dist`; Vercel's existing Git integration can build the branch preview. The committed root index also works on static hosts that do not run a build.

## Interaction and accessibility

- Release selection is manual; nothing automatically changes the featured song while reading.
- Full-screen native dialogs contain keyboard focus, support Escape, restore focus, and integrate with browser Back/Forward. `#music`, `#live`, `#booking` also work as direct links.
- The homepage stays within the viewport; overlays can scroll when needed on small screens or at browser zoom.
- The film autoplays muted behind the page. The first click/tap (or Enter/Space interaction) enables its sound; mouse movement alone cannot unlock browser audio. Explicit mute and pause choices take priority over subsequent interactions. Audio is labelled **Aşkından Ölmemeli**, independent of the selected single. The film pauses behind overlays and in background tabs, then resumes with the chosen sound state. Reduced-motion and data-saving preferences keep the poster until a media control is used. Set `site.film.autoplay` to `false` to disable both autoplay and sound on general page interactions.
- Artwork, typography and video are served locally. No third-party players, tracking scripts, API credentials or forms are added. Streaming links open the official platforms.
- A JavaScript-disabled fallback retains the featured release, artwork, streaming, Live and Booking links.

## Media and content provenance

- Original logo, Volina, poster and `teaser.mp4`: retained from `dvdgrbvc/sena-refresh`.
- Aşkından Ölmemeli cover and direct links: existing artist-owned `dvdgrbvc/links-sena` page. Apple Music: https://music.apple.com/tr/album/a%C5%9Fk%C4%B1ndan-%C3%B6lmemeli-single/1832119467
- Alışılır mı Aşka: https://music.apple.com/us/album/al%C4%B1%C5%9F%C4%B1l%C4%B1r-m%C4%B1-a%C5%9Fka-single/6802358846 ; Spotify artist embed confirmed track `7fjvSBdeQlJW3eN0wc1IeQ`.
- Sev Diyeydi: https://music.apple.com/us/album/sev-diyeydi-single/6816207370 ; Spotify official playlist embed confirmed track `2Zsr7YRskWBBX7ndWpxflo`.
- YouTube oEmbed confirmed the Sena Şener channel and titles for the Alışılır mı Aşka visualizer and Sev Diyeydi official audio.
- Press portrait: https://mediakit.senasener.com/press-photos/SenaSener_press_02_redstudio.jpg ; credit: Courtesy of Sena Şener / Sena Şener arşivi.
- Management contact: the existing https://mediakit.senasener.com/ page.
- Live listings: https://www.bubilet.com.tr/sanatci/sena-sener

Verified during the 30 October 2026 refresh. Rights to the supplied artist assets remain with their respective owners.
