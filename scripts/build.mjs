import { readFile, writeFile, access, cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { site, releases, copy } from '../content.mjs';
import { icons } from '../icons.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = (value) => new Intl.DateTimeFormat('tr-TR', {day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${value}T12:00:00Z`));
const featured = releases.find((release) => release.id === site.featuredRelease);
if (!featured || new Set(releases.map((release) => release.id)).size !== releases.length) throw new Error('A unique featured release and unique release IDs are required.');
if (Object.keys(copy.tr).sort().join() !== Object.keys(copy.en).sort().join()) throw new Error('Translations must have matching keys.');
for (const release of releases) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(release.date) || !Number.isFinite(Date.parse(release.date))) throw new Error(`Invalid release date: ${release.id}`);
  for (const key of ['spotify','apple','youtube']) if (new URL(release[key]).protocol !== 'https:') throw new Error(`HTTPS required: ${release.id}.${key}`);
  await access(resolve(root, release.cover));
}
for (const url of Object.values(site.links)) if (new URL(url).protocol !== 'https:') throw new Error('HTTPS required for site links.');
const values = {
  ICON_ARROW_UP_RIGHT: icons.arrowUpRight,
  ICON_ARROW_LEFT: icons.arrowLeft, ICON_ARROW_RIGHT: icons.arrowRight,
  ICON_PLAY: icons.play,
  POSTER_SRC: esc(site.film.poster), FILM_SRC: esc(site.film.src),
  PAGE_TITLE: esc(`${site.artist} — ${featured.title} · Resmî web sitesi`),
  DESCRIPTION: esc(`${site.artist}. ${releases.map((release) => release.title).join(', ')}. Yeni müzikler, konserler ve booking.`),
  COVER_URL: esc(new URL(featured.cover, site.url).href),
  RELEASE_TITLE: esc(featured.title),
  TITLE_LINES: featured.lines.map((line) => `<span>${esc(line)}</span>`).join(''),
  RELEASE_NOTE: esc(featured.note.tr), RELEASE_DATE: featured.date, DATE_LABEL: date(featured.date),
  RELEASE_NUMBER: String(releases.indexOf(featured) + 1).padStart(2,'0'), RELEASE_TOTAL: String(releases.length).padStart(2,'0'),
  YOUTUBE_URL: esc(featured.youtube), SPOTIFY_URL: esc(featured.spotify), WATCH_LABEL: esc(featured.videoType.tr),
  RELEASE_RAIL: releases.map((release, i) => `<button type="button" class="release-button" data-release="${esc(release.id)}" aria-pressed="${release.id === featured.id}" aria-controls="hero-copy" aria-label="${esc(release.title)} — Şarkıyı keşfet"><img src="${esc(release.cover)}" alt="" width="64" height="64"><span class="release-button-copy"><span class="release-button-top">${String(i+1).padStart(2,'0')} / ${release.id === featured.id ? 'Yeni tekli' : 'Şimdi yayında'}</span><span class="release-button-title">${esc(release.title)}</span><span class="release-button-date">${date(release.date)}</span></span><span class="track-indicator" aria-hidden="true"><i></i><i></i><i></i></span></button>`).join('\n'),
  STRUCTURED_DATA: JSON.stringify({'@context':'https://schema.org','@graph':[
    {'@type':'Person','@id':`${site.url}#artist`,name:site.artist,url:site.url,jobTitle:'Singer, songwriter and producer',sameAs:[site.links.spotify,site.links.apple,site.links.youtube,site.links.instagram]},
    ...releases.map((release) => ({'@type':'MusicRecording',name:release.title,datePublished:release.date,byArtist:{'@id':`${site.url}#artist`},image:new URL(release.cover,site.url).href,sameAs:[release.spotify,release.apple,release.youtube]}))
  ]}).replace(/</g,'\\u003c'),
};
const template = await readFile(resolve(root,'index.template.html'),'utf8');
const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => { if (!(key in values)) throw new Error(`Unknown template key: ${key}`); return values[key]; });
for (const [,key] of template.matchAll(/data-i18n="([^"]+)"/g)) if (!copy.tr[key]) throw new Error(`Missing translation: ${key}`);
if (process.argv.includes('--check')) {
  if (html !== await readFile(resolve(root,'index.html'),'utf8')) throw new Error('index.html is stale. Run npm run build.');
  console.log(`Validated ${releases.length} releases, translations, links, assets and generated HTML.`);
} else {
  await writeFile(resolve(root,'index.html'),html);
  const output = resolve(root, 'dist');
  await rm(output, { recursive:true, force:true });
  await mkdir(output, { recursive:true });
  for (const file of ['index.html','styles.css','site.js','content.mjs','icons.mjs','assets']) {
    await cp(resolve(root,file),resolve(output,file),{recursive:true});
  }
  console.log(`Built index.html with ${featured.title} as the featured release.`);
}
