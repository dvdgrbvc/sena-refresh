import { site, releases, copy } from './content.mjs';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const number = (i) => String(i + 1).padStart(2, '0');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const video = $('#bgvid');
const dialog = $('#overlay');
const panelNames = ['music', 'live', 'booking'];
let language = 'tr';
let selected = Math.max(0, releases.findIndex((release) => release.id === site.featuredRelease));
let currentPanel = null;
let returnFocus = null;
let closeTimer;
let resumeAfterOverlay = false;
let resumeAfterVisibility = false;
let mediaFailed = false;
let playAttempt = 0;
let userPaused = false;
let firstInteractionSound = true;
let heroAnimation;
const t = (key) => copy[language][key];
const dateLabel = (value) => new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-GB', { day:'2-digit', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(`${value}T12:00:00Z`));
const externalLabel = (label) => `${label} — ${t('newTab')}`;

function renderReleases() {
  $('#release-rail').innerHTML = releases.map((release, index) => `<button type="button" class="release-button" data-release="${escape(release.id)}" aria-pressed="${index === selected}" aria-controls="hero-copy" aria-label="${escape(`${release.title} — ${t('chooseRelease')}`)}"><img src="${escape(release.cover)}" alt="" width="64" height="64"><span class="release-button-copy"><span class="release-button-top">${number(index)} / ${release.id === site.featuredRelease ? t('latest') : t('out')}</span><span class="release-button-title">${escape(release.title)}</span><span class="release-button-date">${dateLabel(release.date)}</span></span><span class="track-indicator" aria-hidden="true"><i></i><i></i><i></i></span></button>`).join('');
  $('#release-total').textContent = String(releases.length).padStart(2, '0');
  $('#music-grid').innerHTML = releases.map((release, index) => `<article class="music-card${release.id === site.featuredRelease ? ' featured' : ''}" data-card="${escape(release.id)}"><a class="cover-link" href="${escape(release.spotify)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(externalLabel(`${release.title} — Spotify`))}"><img src="${escape(release.cover)}" alt="${escape(release.title)}" width="600" height="600" loading="lazy"><span class="cover-arrow" aria-hidden="true">↗</span></a><div class="music-card-meta"><span>${number(index)} / ${release.id === site.featuredRelease ? t('latest') : t('out')}</span><time datetime="${release.date}">${dateLabel(release.date)}</time></div><h3>${escape(release.title)}</h3><div class="platform-links">${[['spotify','Spotify'],['apple','Apple Music'],['youtube','YouTube']].map(([key,label]) => `<a href="${escape(release[key])}" target="_blank" rel="noopener noreferrer" aria-label="${escape(externalLabel(`${release.title} — ${label}`))}">${label}<span aria-hidden="true">↗</span></a>`).join('')}</div></article>`).join('');
}
function selectRelease(index, animate = false) {
  selected = (index + releases.length) % releases.length;
  const release = releases[selected];
  const title = $('#release-title');
  title.replaceChildren(...release.lines.map((line) => { const span = document.createElement('span'); span.textContent = line; return span; }));
  title.classList.toggle('long-title', release.title.length > 13);
  $('#release-note').textContent = release.note[language];
  $('#release-date').dateTime = release.date;
  $('#release-date').textContent = dateLabel(release.date);
  $('#watch-link').href = release.youtube;
  $('#watch-label').textContent = release.videoType[language];
  $('#watch-link').setAttribute('aria-label', externalLabel(`${release.title} — ${release.videoType[language]}`));
  $('#current-number').textContent = number(selected);
  $$('[data-release]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.release === release.id)));
  if (animate) {
    $('#release-announcement').textContent = `${release.title} · ${t('out')}`;
    if (!motion.matches) {
      heroAnimation?.cancel();
      heroAnimation = $('#hero-copy').animate([{ opacity:0, transform:'translateY(10px)' }, { opacity:1, transform:'translateY(0)' }], { duration:500, easing:'cubic-bezier(.2,.7,.2,1)' });
    }
  }
}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  $$('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === next)));
  $$('[data-nav-label]').forEach((nav) => nav.setAttribute('aria-label', t('nav')));
  $$('.brand').forEach((brand) => brand.setAttribute('aria-label', `${site.artist} — ${t('home')}`));
  $('#previous-release').setAttribute('aria-label', t('previous'));
  $('#next-release').setAttribute('aria-label', t('next'));
  $$('[data-site-link]').forEach((link) => {
    link.href = site.links[link.dataset.siteLink];
    link.setAttribute('aria-label', externalLabel(link.textContent.trim().replace('↗','').trim()));
  });
  renderReleases();
  selectRelease(selected);
  syncMedia();
  if (mediaFailed) $('#media-status').textContent = t('mediaError');
}

// Native modal dialog provides focus containment and makes the stage inert.
// One history entry per overlay session: switching panels does not stack pages.
function openPanel(name) {
  if (!panelNames.includes(name)) return;
  clearTimeout(closeTimer);
  dialog.classList.remove('is-closing');
  if (!dialog.open) {
    returnFocus = document.activeElement;
    resumeAfterOverlay = !video.paused || (canAutoplay() && !userPaused);
    pauseVideo();
  }
  currentPanel = name;
  $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
  $$('[data-open]').forEach((link) => {
    if (link.dataset.open === name) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  dialog.setAttribute('aria-labelledby', `${name}-title`);
  if (!dialog.open) dialog.showModal();
  $('#overlay-scroll').scrollTop = 0;
  $(`#${name}-title`).focus({ preventScroll:true });
}
function hidePanel() {
  if (!dialog.open) return;
  currentPanel = null;
  dialog.classList.add('is-closing');
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    dialog.close();
    dialog.classList.remove('is-closing');
    $$('[data-open]').forEach((link) => link.removeAttribute('aria-current'));
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll:true });
    if (resumeAfterOverlay && !motion.matches && !document.hidden && !userPaused) playVideo();
    resumeAfterOverlay = false;
  }, motion.matches ? 0 : 350);
}
function route() {
  const name = location.hash.slice(1);
  if (panelNames.includes(name)) openPanel(name);
  else hidePanel();
}
function navigate(name) {
  const method = dialog.open && !dialog.classList.contains('is-closing') ? 'replaceState' : 'pushState';
  history[method]({ ...history.state, senaOverlay:true }, '', `#${name}`);
  openPanel(name);
}
function closePanel() {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  if (history.state?.senaOverlay) history.back();
  else {
    history.replaceState(null, '', location.pathname + location.search);
    hidePanel();
  }
}
$$('[data-open]').forEach((link) => link.addEventListener('click', (event) => {
  // Preserve open-in-new-tab and deep-link behavior.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate(link.dataset.open);
}));
$$('[data-close]').forEach((button) => button.addEventListener('click', (event) => { event.preventDefault(); closePanel(); }));
dialog.addEventListener('cancel', (event) => { event.preventDefault(); closePanel(); });
window.addEventListener('popstate', route);
window.addEventListener('hashchange', route);
$('#release-rail').addEventListener('click', (event) => {
  const button = event.target.closest('[data-release]');
  if (button) selectRelease(releases.findIndex((release) => release.id === button.dataset.release), true);
});
$('#previous-release').addEventListener('click', () => selectRelease(selected - 1, true));
$('#next-release').addEventListener('click', () => selectRelease(selected + 1, true));
$$('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));

// The film is from Aşkından Ölmemeli, independent of the selected single.
// Start muted, then enable sound synchronously in the first real click/tap.
// Reduced motion and data saving leave the poster until a media control is used.
function canAutoplay() { return site.film.autoplay && !motion.matches && !navigator.connection?.saveData; }
function syncMedia() {
  const playing = !video.paused && !video.ended;
  const audible = playing && !video.muted;
  $('#motion-toggle').setAttribute('aria-pressed', String(playing));
  $('#motion-toggle').setAttribute('aria-label', playing ? t('pause') : t('play'));
  $('#motion-label').textContent = playing ? t('pause') : t('play');
  $('#motion-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('#sound-toggle').setAttribute('aria-pressed', String(audible));
  $('#sound-toggle').setAttribute('aria-label', `${audible ? t('soundOff') : t('soundOn')} — ${site.film.title}`);
  $('#sound-label').textContent = audible ? t('soundOff') : t('soundOn');
  $('#sound-wave').setAttribute('d', audible ? 'M15 8c2 2 2 6 0 8m3-11c4 4 4 10 0 14' : 'm16 9 6 6m0-6-6 6');
}
async function playVideo() {
  const attempt = ++playAttempt;
  if (mediaFailed || document.hidden || dialog.open) return;
  try {
    await video.play();
    if (attempt !== playAttempt) return;
    $('#media-status').textContent = '';
  } catch {
    if (attempt !== playAttempt) return;
    const retryMuted = !video.muted;
    video.muted = true;
    // Keep the film moving if a browser rejects audible playback.
    if (retryMuted && !document.hidden && !dialog.open) {
      try { await video.play(); } catch { /* The play control remains available. */ }
      if (attempt !== playAttempt) return;
    }
  }
  syncMedia();
}
function pauseVideo() { ++playAttempt; video.pause(); syncMedia(); }
$('#motion-toggle').addEventListener('click', () => {
  userPaused = !video.paused;
  if (!userPaused && firstInteractionSound) video.muted = false;
  firstInteractionSound = false;
  if (video.paused) playVideo(); else pauseVideo();
});
$('#sound-toggle').addEventListener('click', () => {
  firstInteractionSound = false;
  if (!video.muted && !video.paused) { video.muted = true; syncMedia(); }
  else { video.muted = false; userPaused = false; playVideo(); }
});
function enableSoundOnInteraction(event) {
  if (!firstInteractionSound || !event.isTrusted || mediaFailed || userPaused || document.hidden || !canAutoplay()) return;
  // Explicit media controls own their action; never turn a mute/pause click into sound.
  if (event.target instanceof Element && event.target.closest('#sound-toggle, #motion-toggle')) return;
  if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
  if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
  firstInteractionSound = false;
  video.muted = false;
  if (dialog.open) {
    // Overlays stay quiet; continue with sound when returning to the stage.
    resumeAfterOverlay = true;
    syncMedia();
  } else playVideo();
}
document.addEventListener('click', enableSoundOnInteraction, { capture:true });
document.addEventListener('keydown', enableSoundOnInteraction, { capture:true });
['playing','pause','volumechange','ended'].forEach((event) => video.addEventListener(event, syncMedia));
video.addEventListener('playing', () => video.classList.add('ready'));
function mediaError() {
  mediaFailed = true;
  pauseVideo();
  video.muted = true;
  video.classList.remove('ready');
  $('#film-controls').hidden = true;
  $('#media-status').textContent = t('mediaError');
}
video.addEventListener('error', mediaError);
$('source', video).addEventListener('error', mediaError);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    resumeAfterVisibility = !video.paused;
    pauseVideo();
  } else {
    if (resumeAfterVisibility && !motion.matches && !dialog.open && !userPaused) playVideo();
    resumeAfterVisibility = false;
  }
});
motion.addEventListener('change', () => {
  if (motion.matches) { resumeAfterOverlay = false; resumeAfterVisibility = false; heroAnimation?.cancel(); pauseVideo(); }
});
window.addEventListener('pagehide', () => { video.muted = true; pauseVideo(); });
window.addEventListener('pageshow', (event) => { if (event.persisted) { route(); syncMedia(); } });

$('#contact-email').href = `mailto:${site.email}`;
$('#contact-email > span').textContent = site.email;
$$('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
video.muted = true;
$('#film-controls').hidden = false;
setLanguage(language);
route();
if (canAutoplay() && !document.hidden && !dialog.open) playVideo();
