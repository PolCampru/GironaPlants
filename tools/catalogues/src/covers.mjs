// Covers. Every dimension is in `rem`, and 1rem is a fraction of the cover's
// width, so the same markup composes correctly as an A4 page inside the PDF
// and as the 1200x1600 web cover the site's CoverFrame expects.

import { T } from "./style.mjs";

const coverCSS = (w, h, ground) => `
*, *::before, *::after { box-sizing: border-box; }
/* One rem is a fraction of the smaller dimension, so the same composition
   holds on a 3:4 cover and on a wide card. */
html { font-size: ${Math.min(w / 44, h / 25)}px; }
html, body { margin: 0; padding: 0; }
body {
  width: ${w}px; height: ${h}px;
  font-family: ${T.body};
  background: ${ground};
  color: ${T.paper};
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.cover {
  position: relative; width: ${w}px; height: ${h}px;
  display: flex; flex-direction: column;
  /* the ground lives on the cover itself, not on the page body: the same
     markup is also dropped into a printed page */
  background: ${ground}; color: ${T.paper};
}
.photo { position: absolute; inset: 0 0 auto 0; height: 58%; overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.photo::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to bottom,
    rgba(11,59,34,0.30) 0%, rgba(11,59,34,0.16) 34%,
    rgba(11,59,34,0.72) 78%, ${T.forest} 100%);
}
.body { position: relative; margin-top: auto; padding: 0 2.6rem 3.6rem; }
.kicker {
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.26em;
  text-transform: uppercase; color: ${T.lime}; margin-bottom: 1.05rem;
}
.title {
  font-family: ${T.display}; font-weight: 400; font-size: 3.15rem;
  line-height: 0.94; letter-spacing: -0.012em; color: ${T.white};
  text-wrap: balance;
}
.title em { font-style: italic; color: ${T.lightGreen}; }
.sub {
  margin-top: 0.95rem; display: flex; flex-direction: column; gap: 0.16rem;
  font-size: 0.7rem; line-height: 1.45; letter-spacing: 0.01em;
  color: rgba(250,247,240,0.80);
}
.sub .alt { color: rgba(250,247,240,0.52); font-style: italic; font-family: ${T.display}; font-size: 0.74rem; }
.figs {
  margin-top: 1.5rem; display: flex; gap: 1.9rem;
  padding-top: 0.85rem; border-top: 1px solid rgba(228,246,142,0.34);
}
.figs .f { display: flex; flex-direction: column; gap: 0.16rem; }
.figs .v { font-family: ${T.display}; font-size: 1.32rem; line-height: 1; color: ${T.lime}; }
.figs .l {
  font-size: 0.44rem; font-weight: 600; letter-spacing: 0.17em;
  text-transform: uppercase; color: rgba(250,247,240,0.62);
}
.foot {
  position: absolute; left: 2.6rem; right: 2.6rem; bottom: 1.15rem;
  display: flex; align-items: baseline; justify-content: space-between; gap: 1rem;
  font-size: 0.46rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(250,247,240,0.60);
}
.foot .site { color: ${T.lime}; }

/* --- typographic (photo-free) cover --- */
.grid {
  position: absolute; inset: 0; overflow: hidden;
  display: flex; flex-direction: column; justify-content: flex-start;
  padding: 2.6rem 2.6rem 0; gap: 0.1rem;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 22%, rgba(0,0,0,0) 40%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 22%, rgba(0,0,0,0) 40%);
}
.grid .l {
  font-family: ${T.display}; font-style: italic; font-weight: 300;
  font-size: 0.98rem; line-height: 1.5; letter-spacing: 0.01em;
  color: rgba(220,240,223,0.19); white-space: nowrap;
}
.wordmark {
  position: absolute; top: 1.15rem; left: 2.6rem; right: 2.6rem;
  display: flex; align-items: baseline; justify-content: space-between;
}
.wordmark .w { font-family: ${T.display}; font-size: 1.02rem; color: ${T.white}; letter-spacing: 0.01em; }
.wordmark .y { font-size: 0.46rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${T.lime}; }

/* The wide, short variant used for the cards on /catalogues: the wordmark
   would collide with the kicker, and the full-height texture would run behind
   the title. */
.cover.compact .wordmark { display: none; }
.cover.compact .title { font-size: 2.35rem; }
.cover.compact .body { padding-bottom: 2.4rem; }
.cover.compact .figs { margin-top: 1.1rem; }
.cover.compact .grid {
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 26%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 26%);
}
`;

const esc = (s) =>
  String(s).replace(
    /[&<>]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
  );

const figs = (list) =>
  `<div class="figs">${list
    .map(
      (f) =>
        `<div class="f"><span class="v">${esc(f.v)}</span><span class="l">${esc(
          f.l
        )}</span></div>`
    )
    .join("")}</div>`;

/** Photographic cover — the flagship general catalogue. */
export function photoCover({ w, h, photo, kicker, title, sub, stats, foot }) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>__FONTS__${coverCSS(w, h, T.forest)}</style></head><body>
<div class="cover">
  <div class="photo"><img src="${photo}" alt=""></div>
  <div class="body">
    <div class="kicker">${esc(kicker)}</div>
    <h1 class="title">${title}</h1>
    <div class="sub">${sub
      .map(
        (s, i) =>
          `<span class="${i ? "alt" : ""}">${esc(s)}</span>`
      )
      .join("")}</div>
    ${figs(stats)}
  </div>
  <div class="foot"><span>${esc(foot)}</span><span class="site">gironaplants.com</span></div>
</div>
<script>document.fonts.ready.then(function(){document.documentElement.dataset.pages='1';document.documentElement.dataset.ready='1';});</script>
</body></html>`;
}

/** Typographic cover — the two availability lists. Its texture is the stock
 *  itself: the genera the document actually contains, set in the display face
 *  and faded out, never a decorative pattern. */
export function typeCover({
  w,
  h,
  lines,
  kicker,
  title,
  sub,
  stats,
  foot,
  year,
  compact = false,
}) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>__FONTS__${coverCSS(w, h, T.forest)}</style></head><body>
<div class="cover${compact ? " compact" : ""}">
  <div class="grid">${lines
    .map((l) => `<div class="l">${esc(l)}</div>`)
    .join("")}</div>
  <div class="wordmark"><span class="w">Girona Plants</span><span class="y">${esc(
    year
  )}</span></div>
  <div class="body">
    <div class="kicker">${esc(compact ? `${kicker} · ${year}` : kicker)}</div>
    <h1 class="title">${title}</h1>
    <div class="sub">${sub
      .map((s, i) => `<span class="${i ? "alt" : ""}">${esc(s)}</span>`)
      .join("")}</div>
    ${figs(stats)}
  </div>
  <div class="foot"><span>${esc(foot)}</span><span class="site">gironaplants.com</span></div>
</div>
<script>document.fonts.ready.then(function(){document.documentElement.dataset.pages='1';document.documentElement.dataset.ready='1';});</script>
</body></html>`;
}
