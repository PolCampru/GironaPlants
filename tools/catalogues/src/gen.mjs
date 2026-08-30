// Builds the three Girona Plants catalogues as print-ready HTML.
// Pagination happens in the browser (paginate.js) so wrapping and column
// breaks are decided by the real renderer.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { T, PAGE, interiorCSS } from "./style.mjs";
import { photoCover, typeCover } from "./covers.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SP = path.resolve(HERE, "..");
const DATA = path.join(SP, "data");
/** The cover photograph is the site's own; don't keep a second copy. */
const PHOTOS = path.resolve(SP, "..", "..", "public", "images");
const OUT = path.join(SP, "out");
fs.mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- fonts */
const fontsDir = path.join(SP, "fonts");
let FONTS = fs.readFileSync(path.join(fontsDir, "subset.css"), "utf8");
FONTS = FONTS.replace(
  /url\(https:\/\/fonts\.gstatic\.com\/[^)]*\/([^/)]+\.woff2)\)/g,
  (m, file) => {
    const p = path.join(fontsDir, file);
    if (!fs.existsSync(p)) return m;
    return `url(data:font/woff2;base64,${fs.readFileSync(p).toString("base64")})`;
  }
);

const esc = (s) =>
  String(s).replace(
    /[&<>]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
  );

/* Botanical convention: genus and species epithet in italic, everything after
   them upright — cultivar names in quotes, trade suffixes, and the source's
   own marks (*, **, -, X, (c), = synonyms). */
function sci(name) {
  const words = String(name).trim().split(" ");
  let n = 1;
  if (words[1] && /^[a-zà-ÿ][a-zà-ÿ.-]*$/.test(words[1]) && words[1] !== "ver") n = 2;
  const head = words.slice(0, n).join(" ");
  const tail = words.slice(n).join(" ");
  return `<span class="sp">${esc(head)}</span>${tail ? " " + esc(tail) : ""}`;
}

// es-ES leaves four-digit numbers ungrouped; a stock list reads better with
// the thousands separator the source itself used (1.841).
const NUM = new Intl.NumberFormat("es-ES", { useGrouping: "always" });
const num = (n) => NUM.format(n);

/* ------------------------------------------------------------- documents */
function doc({ title, css, cover, front, srcBlocks, back, cfg }) {
  const coverCss = cover.css || "";
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<style>${FONTS}${interiorCSS}${css || ""}${coverCss}</style></head>
<body>
<div id="out">${cover.html}${front}</div>
<div id="src" style="position:absolute;visibility:hidden">${srcBlocks}</div>
<script>${fs.readFileSync(path.join(HERE, "paginate.js"), "utf8")}</script>
<script>
  document.fonts.ready.then(function () {
    window.layout(${JSON.stringify(cfg)});
    var out = document.getElementById('out');
    out.insertAdjacentHTML('beforeend', ${JSON.stringify(back)}
      .replace('{{FOLIO}}', String(Number(document.documentElement.dataset.lastFolio) + 1)));
    document.documentElement.dataset.pages = String(document.querySelectorAll('.page').length);
    document.documentElement.dataset.ready = '1';
  });
</script>
</body></html>`;
}

/* A full-bleed cover page inside the printed document.
 *
 * The cover carries its own stylesheet, and several of its class names (.sub,
 * .body, .title) also exist in the interior. Every selector is therefore
 * scoped to .cover-page before the rules join the document — without it the
 * cover's `.sub { display: flex }` quietly unpicked every continuation row of
 * the price table. */
function scopeCSS(css, scope) {
  return css.replace(/(^|\})\s*([^{}]+)\{/g, (m, brace, selector) => {
    const scoped = selector
      .split(",")
      .map((s) => {
        const t = s.trim();
        if (!t || t.startsWith("@")) return t;
        if (t === "*" || t.startsWith("*")) return `${scope} ${t}`;
        return `${scope}${t.startsWith(":") ? "" : " "}${t}`;
      })
      .join(", ");
    return `${brace}\n${scoped} {`;
  });
}

function coverPage(html, w = PAGE.w, h = PAGE.h) {
  const inner = html
    .replace(/^[\s\S]*?<body>/, "")
    .replace(/<\/body><\/html>$/, "")
    .replace(/<script>[\s\S]*?<\/script>/g, "");
  const raw = html.match(/<style>([\s\S]*?)<\/style>/)[1].replace("__FONTS__", "");
  const stripped = raw
    .replace(/html\s*\{[^}]*\}/, "")
    .replace(/html,\s*body\s*\{[^}]*\}/, "")
    .replace(/\bbody\s*\{[^}]*\}/, "");
  return {
    css: scopeCSS(stripped, ".cover-page"),
    html: `<section class="page cover-page" style="padding:0;width:${w}px;height:${h}px;font-size:${Math.min(
      w / 44,
      h / 25
    )}px">${inner}</section>`,
  };
}

/* --------------------------------------------------------- page furniture */
const contact = "gironaplants@gironaplants.com · +34 639 811 560 · Girona, Catalunya";

function textPage({ folio, doc: docLabel, kicker, title, lede, blocks, foot }) {
  return `<section class="page">
    <header class="rh"><span class="mark">Girona Plants</span><span class="doc">${esc(
      docLabel
    )}</span></header>
    <div class="tp">
      <div class="tp-kicker">${esc(kicker)}</div>
      <h2 class="tp-title">${title}</h2>
      ${lede ? `<div class="tp-lede">${lede}</div>` : ""}
      <div class="tp-body">${blocks}</div>
    </div>
    <footer class="rf"><span>${esc(foot ?? contact)}</span><span class="folio">${folio}</span></footer>
  </section>`;
}

const textCSS = `
.tp { flex: 1 1 auto; display: flex; flex-direction: column; min-height: 0; }
.tp-kicker {
  font-size: 6.4px; font-weight: 700; letter-spacing: 0.22em;
  text-transform: uppercase; color: ${T.brandGreen};
}
.tp-title {
  font-family: ${T.display}; font-weight: 400; font-size: 30px; line-height: 1.06;
  letter-spacing: -0.01em; margin: 7px 0 0; color: ${T.dark}; max-width: 26ch;
}
.tp-lede {
  margin-top: 10px; max-width: 62ch;
  font-size: 9.6px; line-height: 1.62; color: ${T.muted};
}
.tp-lede em { font-family: ${T.display}; font-style: italic; color: ${T.dark}; }
.tp-body {
  margin-top: 22px; flex: 1 1 auto;
  display: flex; flex-direction: column; justify-content: space-between;
  min-height: 0; gap: 22px;
}

.defs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 26px; }
.def {
  display: grid; grid-template-columns: 46px 1fr; gap: 9px;
  padding: 6px 0; border-top: 1px solid ${T.line}; align-items: baseline;
}
.def .k {
  font-family: ${T.display}; font-size: 12px; color: ${T.brandGreen}; letter-spacing: 0.02em;
}
.def .v { font-size: 8px; line-height: 1.42; }
.def .v .es { color: ${T.dark}; }
.def .v .alt { color: ${T.muted}; font-style: italic; font-family: ${T.display}; font-size: 8.6px; }

.terms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 26px; margin-top: 26px; align-content: start; }
.term { border-top: 2px solid ${T.brandGreen}; padding-top: 7px; }
.term h3 {
  margin: 0 0 5px; font-size: 6.4px; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase; color: ${T.brandGreen};
}
.term p { margin: 0 0 4px; font-size: 8px; line-height: 1.5; color: ${T.dark}; }
.term p.alt { color: ${T.muted}; font-family: ${T.display}; font-style: italic; font-size: 8.6px; }
.term .big { font-family: ${T.display}; font-size: 17px; color: ${T.dark}; line-height: 1.1; }

.idx { columns: 4; column-gap: 20px; font-size: 8.2px; line-height: 1.6; }
.idx .g {
  break-inside: avoid; display: flex; justify-content: space-between; gap: 5px;
  color: ${T.dark}; border-bottom: 1px solid ${T.lineSoft}; padding-bottom: 0.6px;
}
.idx .g span:last-child { color: ${T.muted}; font-variant-numeric: tabular-nums; }
.idx .letter {
  break-inside: avoid; break-after: avoid;
  font-family: ${T.display}; font-size: 12.5px; color: ${T.brandGreen};
  margin: 7px 0 2px; letter-spacing: 0.04em;
}
.idx .letter:first-child { margin-top: 0; }

.stat-row { display: flex; gap: 30px; padding-top: 12px; border-top: 2px solid ${T.brandGreen}; }
.stat-row .s { display: flex; flex-direction: column; gap: 2px; }
.stat-row .v { font-family: ${T.display}; font-size: 26px; line-height: 1; color: ${T.brandGreen}; }
.stat-row .l {
  font-size: 6px; font-weight: 700; letter-spacing: 0.17em;
  text-transform: uppercase; color: ${T.muted};
}

.endnote {
  margin-top: auto; padding: 16px 18px; background: ${T.forest}; color: ${T.paper};
  border-radius: 4px; display: flex; justify-content: space-between; align-items: flex-end; gap: 20px;
}
.endnote .t { font-family: ${T.display}; font-size: 15px; line-height: 1.22; max-width: 42ch; }
.endnote .c { font-size: 7.4px; line-height: 1.6; text-align: right; color: rgba(250,247,240,0.78); }
.endnote .c a { color: ${T.lime}; text-decoration: none; }
`;

/* ================================================================= MAIN */
function buildMain() {
  const data = JSON.parse(fs.readFileSync(path.join(DATA, "main.json"), "utf8"));
  const taxa = data.reduce((a, g) => a + g.items.length, 0);
  const priceRows = data.reduce(
    (a, g) => a + g.items.reduce((b, i) => b + i.rows.length, 0),
    0
  );

  const gridMain = `grid-template-columns: minmax(0,1fr) 46px 42px 38px;`;
  const css = `
${textCSS}
.chead.m, .row.m { ${gridMain} }
.cover-page .title { max-width: none; }
`;

  const columnHead = `<div class="chead m">
    <div><div class="l1">Especie</div><div class="l2">Espècie · Species</div></div>
    <div class="num"><div class="l1">Formato</div><div class="l2">Format</div></div>
    <div class="num"><div class="l1">Altura</div><div class="l2">Alçada</div></div>
    <div class="num"><div class="l1">€/u.</div><div class="l2">Preu</div></div>
  </div>`;

  const blocks = [];
  for (const g of data) {
    blocks.push(
      `<div class="band"><span class="n">${esc(
        g.genus
      )}</span><span class="rule"></span></div>`
    );
    for (const it of g.items) {
      if (!it.rows.length) {
        blocks.push(
          `<div class="row m"><div class="name xref">${sci(
            it.name
          )}</div><div class="num"></div><div class="num"></div><div class="num"></div></div>`
        );
        continue;
      }
      it.rows.forEach((r, i) => {
        blocks.push(
          `<div class="row m${i ? " sub" : ""}${i % 2 ? " zebra" : ""}">
            <div class="name">${i === 0 ? sci(it.name) : '<span class="cont">·</span>'}</div>
            <div class="num fmt">${esc(r.format)}</div>
            <div class="num dim">${esc(r.height || "—")}</div>
            <div class="num price">${esc(r.price)}</div>
          </div>`
        );
      });
    }
  }

  /* --- front matter --- */
  const symbols = [
    ["Rd", "Raíz desnuda", "Rel nua · Bare root"],
    ["AH", "Alvéolo hortícola", "Alvèol hortícola · Plugtray"],
    ["AF", "Alvéolo forestal (cm³)", "Alvèol forestal · Forest plugtray"],
    ["M", "Maceta (cm)", "Test · Pot"],
    ["C", "Contenedor (L)", "Contenidor · Container"],
    ["S/M", "Acuática sin maceta", "Aquàtica sense test · Aquatic, no pot"],
  ];
  const defs = symbols
    .map(
      ([k, es, alt]) =>
        `<div class="def"><div class="k">${esc(k)}</div><div class="v"><div class="es">${esc(
          es
        )}</div><div class="alt">${esc(alt)}</div></div></div>`
    )
    .join("");

  const terms = [
    {
      h: "Cantidad mínima · Quantitat mínima · Minimum quantity",
      p: [
        "Planta joven (Rd · AH · AF · M): 500 pl. por variedad.",
        "Contenedor (C): 25 pl. por variedad.",
      ],
      alt: "Planta jove: 500 pl./varietat · Contenidor: 25 pl./varietat — Young plants: 500 pl./cultivar · Container: 25 pl./cultivar",
    },
    {
      h: "Pedido mínimo · Comanda mínima · Minimum order",
      big: "300,00 €",
      alt: "Para importes o cantidades inferiores, consúltenos precios especiales.",
    },
    {
      h: "Precios · Preus · Prices",
      p: ["Sin IVA ni transporte. Alturas aproximadas."],
      alt: "Sense IVA ni transport, alçades aproximades — VAT and transport not included, approximate heights.",
    },
    {
      h: "Incidencias · Incidències · Claims",
      p: [
        "No se atenderán reclamaciones pasados tres días desde la recepción de la planta.",
      ],
      alt: "En caso de litigio, el único tribunal competente será el de Girona.",
    },
  ]
    .map(
      (t) =>
        `<div class="term"><h3>${esc(t.h)}</h3>${
          t.big ? `<div class="big">${esc(t.big)}</div>` : ""
        }${(t.p || []).map((p) => `<p>${esc(p)}</p>`).join("")}${
          t.alt ? `<p class="alt">${esc(t.alt)}</p>` : ""
        }</div>`
    )
    .join("");

  const front =
    textPage({
      folio: 2,
      doc: "Catálogo general · Catàleg general · General catalogue",
      kicker: "Cómo leer este catálogo · Com llegir-lo · How to read it",
      title: "Género, formato,<br>altura y precio",
      lede: `Cada línea es una referencia real de vivero: la especie, el formato en que la servimos, la altura aproximada y el precio unitario. Un mismo taxón aparece tantas veces como formatos ofrecemos. <em>Cada línia és una referència de viver — one line, one nursery reference.</em>`,
      blocks: `<div class="defs">${defs}</div><div class="terms">${terms}</div>
        <div class="stat-row">
          <div class="s"><span class="v">${num(data.length)}</span><span class="l">Géneros · Gèneres · Genera</span></div>
          <div class="s"><span class="v">${num(taxa)}</span><span class="l">Especies · Espècies · Species</span></div>
          <div class="s"><span class="v">${num(priceRows)}</span><span class="l">Referencias · Referències · References</span></div>
          <div class="s"><span class="v">1992</span><span class="l">Desde · Des de · Since</span></div>
        </div>`,
    }) + indexPages(data, 3);

  const back = `<section class="page">
    <header class="rh"><span class="mark">Girona Plants</span><span class="doc">Catálogo general · 2025—2026</span></header>
    <div class="tp">
      <div class="tp-kicker">Fuera de catálogo · Fora de catàleg · Not listed</div>
      <h2 class="tp-title">Si no está en la lista,<br>lo buscamos</h2>
      <div class="tp-lede">Consúltenos el precio y la disponibilidad de cualquier otra especie: trabajamos con una red de viveros en España y en el resto de Europa desde 1992. <em>Consulteu-nos qualsevol altra espècie — ask us for anything not included in this list.</em></div>
      <div class="endnote">
        <div class="t">Venta exclusiva a profesionales.<br>Venda exclusiva a professionals.<br>For professionals exclusively.</div>
        <div class="c">Girona Plants SL<br>gironaplants@gironaplants.com<br>+34 639 811 560<br><a href="https://gironaplants.com">gironaplants.com</a></div>
      </div>
    </div>
    <footer class="rf"><span>${contact}</span><span class="folio">{{FOLIO}}</span></footer>
  </section>`;

  const cover = coverPage(
    photoCover({
      w: PAGE.w,
      h: PAGE.h,
      photo: dataURI(path.join(PHOTOS, "lavenders.jpg")),
      kicker: "Catálogo · Catàleg · Catalogue",
      title: "Girona<br>Plants",
      sub: [
        "Precios de plantas 2025—2026",
        "Preus de plantes · Plant prices",
      ],
      stats: [
        { v: num(data.length), l: "Géneros · Genera" },
        { v: num(taxa), l: "Especies · Species" },
        { v: num(priceRows), l: "Referencias · References" },
      ],
      foot: "Girona · Catalunya · 1992",
    })
  );

  fs.writeFileSync(
    path.join(OUT, "main.html"),
    doc({
      title: "Girona Plants — Catálogo general 2025-2026",
      css,
      cover,
      front,
      srcBlocks: blocks.join(""),
      back,
      cfg: {
        firstFolio: 5,
        doc: "Catálogo general · Catàleg general · General catalogue 2025—2026",
        foot: contact,
        columnHead,
        headBlocks: 1,
      },
    })
  );
  return { genera: data.length, taxa, priceRows };
}

function indexPages(data, firstFolio) {
  const byLetter = {};
  for (const g of data) {
    if (!g.items.length) continue; // a heading the source spells twice
    const L = g.genus[0].toUpperCase();
    (byLetter[L] ||= []).push(g);
  }
  const letters = Object.keys(byLetter).sort();
  // one line per genus plus a heading and its air; split where the two halves
  // come out even
  const cost = (L) => byLetter[L].length + 3;
  const total = letters.reduce((a, L) => a + cost(L), 0);
  let run = 0,
    cut = letters.length;
  for (let i = 0; i < letters.length; i++) {
    run += cost(letters[i]);
    if (run >= total / 2) {
      cut = i + 1;
      break;
    }
  }
  const halves = [letters.slice(0, cut), letters.slice(cut)];

  const render = (ls) =>
    ls
      .map(
        (L) =>
          `<div class="letter">${L}</div>` +
          byLetter[L]
            .map(
              (g) =>
                `<div class="g"><span>${esc(
                  g.genus.charAt(0) + g.genus.slice(1).toLowerCase()
                )}</span><span>${g.items.length}</span></div>`
            )
            .join("")
      )
      .join("");

  return halves
    .map((ls, i) =>
      textPage({
        folio: firstFolio + i,
        doc: "Catálogo general · Catàleg general · General catalogue",
        kicker: `Índice de géneros · Índex de gèneres · Index of genera — ${ls[0]}–${
          ls[ls.length - 1]
        }`,
        title: i === 0 ? "Lo que encontrará<br>en estas páginas" : "Índice de géneros<br>(continuación)",
        lede:
          i === 0
            ? `El número junto a cada género es la cantidad de especies y cultivares listados. <em>El número és la quantitat d'espècies llistades — the figure is the number of species listed.</em>`
            : "",
        blocks: `<div class="idx">${render(ls)}</div>`,
      })
    )
    .join("");
}

/* ============================================================= CUTTINGS */
const FAMILIES = {
  ARBUSTES: ["Arbustos", "Arbustos · Shrubs"],
  CONIFERES: ["Coníferas", "Coníferes · Conifers"],
  BRUYERES: ["Brezos", "Bruc · Heathers"],
  "PL. GRIMPANTES": ["Trepadoras", "Enfiladisses · Climbers"],
  GRAMINEES: ["Gramíneas", "Gramínies · Grasses"],
  VIVACES: ["Vivaces", "Vivaces · Perennials"],
};
const FAM_ORDER = [
  "ARBUSTES",
  "CONIFERES",
  "BRUYERES",
  "PL. GRIMPANTES",
  "GRAMINEES",
  "VIVACES",
];

function buildCuttings() {
  const rows = JSON.parse(
    fs.readFileSync(path.join(DATA, "esquejes.json"), "utf8")
  );
  const total = rows.reduce((a, r) => a + r.qty, 0);
  const genera = new Set(rows.map((r) => r.name.split(" ")[0]));

  const grid = `grid-template-columns: minmax(0,1fr) 44px 40px;`;
  const css = `
${textCSS}
.chead.c, .row.c { ${grid} }
.row.c .name { font-size: 8.4px; }
`;
  const columnHead = `<div class="chead c">
    <div><div class="l1">Referencia</div><div class="l2">Referència · Item</div></div>
    <div class="num"><div class="l1">Alvéolo</div><div class="l2">Alvèol · Tray</div></div>
    <div class="num"><div class="l1">Uds.</div><div class="l2">Unitats · Qty</div></div>
  </div>`;

  const blocks = [];
  for (const fam of FAM_ORDER) {
    const list = rows.filter((r) => r.family === fam);
    if (!list.length) continue;
    const [es, alt] = FAMILIES[fam];
    const q = list.reduce((a, r) => a + r.qty, 0);
    blocks.push(`<div class="sect"><div class="k">${esc(alt)}</div><div class="t">${esc(
      es
    )}</div><div class="s">${num(list.length)} referencias · ${num(
      q
    )} plantas disponibles</div></div>`);
    let lastGenus = null;
    list.forEach((r, i) => {
      const genus = r.name.split(" ")[0];
      if (genus !== lastGenus) {
        blocks.push(
          `<div class="band"><span class="n">${esc(
            genus
          )}</span><span class="rule"></span></div>`
        );
        lastGenus = genus;
      }
      const rest = r.name.slice(genus.length).trim();
      blocks.push(
        `<div class="row c${i % 2 ? " zebra" : ""}">
          <div class="name">${esc(rest || genus)}</div>
          <div class="num fmt">${esc(r.tray || "—")}</div>
          <div class="num price">${num(r.qty)}</div>
        </div>`
      );
    });
  }

  const front = textPage({
    folio: 2,
    doc: "Esquejes enraizados · Esqueixos arrelats · Rooted cuttings",
    kicker: "Disponibilidad · Disponibilitat · Availability",
    title: "Stock real a<br>14 de abril de 2026",
    lede: `Todo lo que aparece aquí está enraizado y contado en bandeja. Las cantidades son las del día de la lista y se sirven por bandeja completa. <em>Les quantitats són les del dia de la llista — quantities are those of the listing date.</em>`,
    blocks: `<div class="defs">
        <div class="def"><div class="k">ALV.</div><div class="v"><div class="es">Alvéolo de multiplicación; el número es el modelo de bandeja</div><div class="alt">Alvèol de multiplicació · Propagation plug tray</div></div></div>
        <div class="def"><div class="k">Uds.</div><div class="v"><div class="es">Unidades enraizadas disponibles</div><div class="alt">Unitats disponibles · Rooted units available</div></div></div>
      </div>
      <div class="terms">
        <div class="term"><h3>Cómo pedir · Com demanar · How to order</h3><p>Pedido por bandeja completa y por variedad. Confirmamos disponibilidad en el momento del pedido.</p><p class="alt">Comanda per safata sencera — full trays, by cultivar.</p></div>
        <div class="term"><h3>Precios · Preus · Prices</h3><p>Consulte el precio de cada referencia: depende del formato de bandeja y de la cantidad.</p><p class="alt">Consulteu-nos el preu — ask us for prices.</p></div>
      </div>
      <div class="stat-row">
        <div class="s"><span class="v">${num(rows.length)}</span><span class="l">Referencias · References</span></div>
        <div class="s"><span class="v">${num(genera.size)}</span><span class="l">Géneros · Genera</span></div>
        <div class="s"><span class="v">${num(total)}</span><span class="l">Plantas · Plants</span></div>
      </div>`,
  });

  const back = backPage(
    "Esquejes enraizados · Esqueixos arrelats · Rooted cuttings",
    "¿Necesita una variedad<br>que no está en la lista?",
    "El stock de esquejes cambia cada semana. Escríbanos con su listado y le confirmamos qué podemos enraizar y para cuándo. <em>Escriviu-nos amb el vostre llistat — send us your list.</em>"
  );

  const cover = coverPage(
    typeCover({
      w: PAGE.w,
      h: PAGE.h,
      year: "14.04.2026",
      lines: coverLines(rows.map((r) => r.name.split(" ")[0])),
      kicker: "Disponible · Disponible · Available",
      title: "Esquejes<br>enraizados",
      sub: [
        "Esqueixos arrelats · Rooted cuttings",
        "Arbustos, coníferas, trepadoras, gramíneas y vivaces",
      ],
      stats: [
        { v: num(rows.length), l: "Referencias · References" },
        { v: num(genera.size), l: "Géneros · Genera" },
        { v: num(total), l: "Plantas · Plants" },
      ],
      foot: "Girona · Catalunya · 1992",
    })
  );

  fs.writeFileSync(
    path.join(OUT, "cuttings.html"),
    doc({
      title: "Girona Plants — Esquejes enraizados 14.04.2026",
      css,
      cover,
      front,
      srcBlocks: blocks.join(""),
      back,
      cfg: {
        firstFolio: 3,
        doc: "Esquejes enraizados · Esqueixos arrelats · Rooted cuttings — 14.04.2026",
        foot: contact,
        columnHead,
        headBlocks: 1,
      },
    })
  );
  return { rows: rows.length, genera: genera.size, total };
}

/* =========================================================== PERENNIALS */
const SECTIONS = {
  perennials: ["Vivaces", "Vivaces · Perennials"],
  grasses: ["Gramíneas", "Gramínies · Grasses"],
  ferns: ["Helechos", "Falgueres · Ferns"],
};

function buildPerennials() {
  const { rows, syn } = JSON.parse(
    fs.readFileSync(path.join(DATA, "vivaces.clean.json"), "utf8")
  );
  const genera = new Set(rows.map((r) => r.genus));

  const grid = `grid-template-columns: minmax(0,1fr) 30px 38px 40px;`;
  const css = `
${textCSS}
.chead.p, .row.p { ${grid} }
`;
  const columnHead = `<div class="chead p">
    <div><div class="l1">Especie</div><div class="l2">Espècie · Species</div></div>
    <div class="num"><div class="l1">Flor.</div><div class="l2">Mes</div></div>
    <div class="num"><div class="l1">Altura</div><div class="l2">cm</div></div>
    <div class="num"><div class="l1">Semana</div><div class="l2">Setm. · Week</div></div>
  </div>`;

  const blocks = [];
  for (const key of ["perennials", "grasses", "ferns"]) {
    const list = rows.filter((r) => r.section === key);
    if (!list.length) continue;
    const [es, alt] = SECTIONS[key];
    const gs = new Set(list.map((r) => r.genus));
    blocks.push(`<div class="sect"><div class="k">${esc(alt)}</div><div class="t">${esc(
      es
    )}</div><div class="s">${num(list.length)} referencias · ${num(
      gs.size
    )} géneros · alvéolo 4 cm</div></div>`);
    let lastGenus = null;
    list.forEach((r, i) => {
      if (r.genus !== lastGenus) {
        const s = syn[r.genus];
        blocks.push(
          `<div class="band"><span class="n">${esc(r.genus)}</span>${
            s ? `<span class="syn">${esc(s)}</span>` : ""
          }<span class="rule"></span></div>`
        );
        lastGenus = r.genus;
      }
      const rest = r.name.slice(r.genus.length).replace(/^[\s.]+/, "").trim();
      blocks.push(
        `<div class="row p${i % 2 ? " zebra" : ""}">
          <div class="name">${esc(rest || r.name)}</div>
          <div class="num dim">${esc(r.flowering || "—")}</div>
          <div class="num">${esc(r.height)}</div>
          <div class="num price">${esc(r.weeks)}</div>
        </div>`
      );
    });
  }

  const front = textPage({
    folio: 2,
    doc: "Vivaces, gramíneas y helechos · Perennials, grasses & ferns",
    kicker: "Disponibilidad · Disponibilitat · Availability",
    title: "Alvéolo de 4 cm,<br>temporada 2026",
    lede: `Planta joven en alvéolo de 4 cm, lista para trasplante. La última columna es la semana del año en la que cada partida está disponible. <em>La darrera columna és la setmana de l'any — the last column is the week of the year.</em>`,
    blocks: `<div class="defs">
        <div class="def"><div class="k">Flor.</div><div class="v"><div class="es">Meses de floración</div><div class="alt">Mesos de floració · Flowering months</div></div></div>
        <div class="def"><div class="k">cm</div><div class="v"><div class="es">Altura de la planta adulta</div><div class="alt">Alçada adulta · Mature height</div></div></div>
        <div class="def"><div class="k">Sem.</div><div class="v"><div class="es">Semana del año en que está disponible</div><div class="alt">Setmana de l'any · Week of the year</div></div></div>
        <div class="def"><div class="k">ALV. 4</div><div class="v"><div class="es">Alvéolo de 4 cm</div><div class="alt">Alvèol de 4 cm · 4 cm plug</div></div></div>
      </div>
      <div class="terms">
        <div class="term"><h3>Cómo pedir · Com demanar · How to order</h3><p>Por bandeja completa y por variedad, indicando la semana de entrega deseada.</p><p class="alt">Indiqueu la setmana d'entrega — state your delivery week.</p></div>
        <div class="term"><h3>Precios · Preus · Prices</h3><p>Consulte el precio por variedad y cantidad; no está incluido en esta lista de disponibilidad.</p><p class="alt">Consulteu-nos el preu — ask us for prices.</p></div>
      </div>
      <div class="stat-row">
        <div class="s"><span class="v">${num(rows.length)}</span><span class="l">Referencias · References</span></div>
        <div class="s"><span class="v">${num(genera.size)}</span><span class="l">Géneros · Genera</span></div>
        <div class="s"><span class="v">3</span><span class="l">Familias · Families</span></div>
      </div>`,
  });

  const back = backPage(
    "Vivaces, gramíneas y helechos · Perennials, grasses & ferns",
    "Otras variedades<br>y otros formatos",
    "Esta lista es la de alvéolo de 4 cm. Servimos muchas de estas especies también en maceta y contenedor: consulte el catálogo general o escríbanos. <em>Consulteu el catàleg general — see the general catalogue.</em>"
  );

  const cover = coverPage(
    typeCover({
      w: PAGE.w,
      h: PAGE.h,
      year: "Mayo 2026",
      lines: coverLines(rows.map((r) => r.genus)),
      kicker: "Disponible · Disponible · Available",
      title: "Vivaces,<br>gramíneas<br>y helechos",
      sub: [
        "Vivaces, gramínies i falgueres · Perennials, grasses & ferns",
        "Alvéolo de 4 cm · Temporada 2026",
      ],
      stats: [
        { v: num(rows.length), l: "Referencias · References" },
        { v: num(genera.size), l: "Géneros · Genera" },
        { v: "4 cm", l: "Alvéolo · Plug" },
      ],
      foot: "Girona · Catalunya · 1992",
    })
  );

  fs.writeFileSync(
    path.join(OUT, "perennials.html"),
    doc({
      title: "Girona Plants — Vivaces, gramíneas y helechos 2026",
      css,
      cover,
      front,
      srcBlocks: blocks.join(""),
      back,
      cfg: {
        firstFolio: 3,
        doc: "Vivaces, gramíneas y helechos · Alvéolo 4 cm · 2026",
        foot: contact,
        columnHead,
        headBlocks: 1,
      },
    })
  );
  return { rows: rows.length, genera: genera.size };
}

function backPage(docLabel, title, lede) {
  return `<section class="page">
    <header class="rh"><span class="mark">Girona Plants</span><span class="doc">${esc(
      docLabel
    )}</span></header>
    <div class="tp">
      <div class="tp-kicker">Contacto · Contacte · Contact</div>
      <h2 class="tp-title">${title}</h2>
      <div class="tp-lede">${lede}</div>
      <div class="endnote">
        <div class="t">Venta exclusiva a profesionales.<br>Venda exclusiva a professionals.<br>For professionals exclusively.</div>
        <div class="c">Girona Plants SL<br>gironaplants@gironaplants.com<br>+34 639 811 560<br><a href="https://gironaplants.com">gironaplants.com</a></div>
      </div>
    </div>
    <footer class="rf"><span>${contact}</span><span class="folio">{{FOLIO}}</span></footer>
  </section>`;
}

/** The texture on a typographic cover: the document's own genera, in the
 *  order they appear, as many as fit. */
function coverLines(all) {
  // The source lists carry the odd typo (FEIJOA/FEJOA, FUCHSIA/FUCHIA); on a
  // cover the near-duplicates read as sloppiness, so collapse them.
  const uniq = [];
  for (const g of [...new Set(all)].sort()) {
    const prev = uniq[uniq.length - 1];
    if (prev && close(prev, g)) continue;
    uniq.push(g);
  }
  const lines = [];
  let cur = [];
  for (const g of uniq) {
    cur.push(g);
    if (cur.join(" · ").length > 46) {
      lines.push(cur.join(" · "));
      cur = [];
    }
    if (lines.length >= 22) break;
  }
  return lines;
}

/** True when two genus names differ by at most one edit — a typo pair. */
function close(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function dataURI(file) {
  const ext = path.extname(file).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${fs.readFileSync(file).toString("base64")}`;
}

/* ------------------------------------------------------------------ run */
console.log("main      ", buildMain());
console.log("cuttings  ", buildCuttings());
console.log("perennials", buildPerennials());

/* Web covers: same designs at 1200x1600, the ratio the site's CoverFrame uses. */
const W = 1200,
  H = 1600;
const mainData = JSON.parse(fs.readFileSync(path.join(DATA, "main.json"), "utf8"));
const cut = JSON.parse(fs.readFileSync(path.join(DATA, "esquejes.json"), "utf8"));
const per = JSON.parse(
  fs.readFileSync(path.join(DATA, "vivaces.clean.json"), "utf8")
).rows;

const cuttingsCover = (w, h, compact = false) =>
  typeCover({
    w,
    h,
    compact,
    year: "14.04.2026",
    lines: coverLines(cut.map((r) => r.name.split(" ")[0])),
    kicker: "Disponible · Disponible · Available",
    title: "Esquejes<br>enraizados",
    sub: [
      "Esqueixos arrelats · Rooted cuttings",
      "Arbustos, coníferas, trepadoras, gramíneas y vivaces",
    ],
    stats: [
      { v: num(cut.length), l: "Referencias · References" },
      {
        v: num(new Set(cut.map((r) => r.name.split(" ")[0])).size),
        l: "Géneros · Genera",
      },
      { v: num(cut.reduce((a, r) => a + r.qty, 0)), l: "Plantas · Plants" },
    ],
    foot: "Girona · Catalunya · 1992",
  });

const perennialsCover = (w, h, compact = false) =>
  typeCover({
    w,
    h,
    compact,
    year: "Mayo 2026",
    lines: coverLines(per.map((r) => r.genus)),
    kicker: "Disponible · Disponible · Available",
    title: "Vivaces,<br>gramíneas<br>y helechos",
    sub: [
      "Vivaces, gramínies i falgueres · Perennials, grasses & ferns",
      "Alvéolo de 4 cm · Temporada 2026",
    ],
    stats: [
      { v: num(per.length), l: "Referencias · References" },
      { v: num(new Set(per.map((r) => r.genus)).size), l: "Géneros · Genera" },
      { v: "4 cm", l: "Alvéolo · Plug" },
    ],
    foot: "Girona · Catalunya · 1992",
  });

/* The hero frame on /catalogues is 3:4; the cards under it are landscape.
   The covers are laid out in rem against their own width, so the same design
   composes at either size. */
const CARD = { w: 1040, h: 560 };
const webCovers = {
  "cover-main.html": photoCover({
    w: W,
    h: H,
    photo: dataURI(path.join(PHOTOS, "lavenders.jpg")),
    kicker: "Catálogo · Catàleg · Catalogue",
    title: "Girona<br>Plants",
    sub: ["Precios de plantas 2025—2026", "Preus de plantes · Plant prices"],
    stats: [
      { v: num(mainData.length), l: "Géneros · Genera" },
      {
        v: num(mainData.reduce((a, g) => a + g.items.length, 0)),
        l: "Especies · Species",
      },
      {
        v: num(
          mainData.reduce(
            (a, g) => a + g.items.reduce((b, i) => b + i.rows.length, 0),
            0
          )
        ),
        l: "Referencias · References",
      },
    ],
    foot: "Girona · Catalunya · 1992",
  }),
  "cover-cuttings.html": cuttingsCover(W, H),
  "cover-perennials.html": perennialsCover(W, H),
  "card-cuttings.html": cuttingsCover(CARD.w, CARD.h, true),
  "card-perennials.html": perennialsCover(CARD.w, CARD.h, true),
};
for (const [name, html] of Object.entries(webCovers)) {
  fs.writeFileSync(path.join(OUT, name), html.replace("__FONTS__", FONTS));
}
console.log("web covers", Object.keys(webCovers).join(", "));
