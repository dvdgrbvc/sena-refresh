// Shared by the HTML build and browser-rendered controls. SVG paths cannot
// switch to emoji presentation on iOS and inherit each control's text color.
const svg = (paths) => `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

export const icons = {
  arrowUpRight: svg('<path d="M5 19 19 5M5 5h14v14"/>'),
  arrowLeft: svg('<path d="M20 12H4m6-6-6 6 6 6"/>'),
  arrowRight: svg('<path d="M4 12h16m-6-6 6 6-6 6"/>'),
  play: svg('<path d="m7 4 14 8-14 8Z" fill="currentColor" stroke="none"/>'),
  pause: svg('<path d="M8 5v14M16 5v14"/>'),
};
