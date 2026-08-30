// Shared visual system for the three Girona Plants catalogues.
// Every value is lifted from the site's own tokens (lib/theme.ts) so the
// printed piece and gironaplants.com read as one brand.

export const T = {
  brandGreen: "#118B50",
  greenDeep: "#0C6E3E",
  forest: "#0B3B22", // cover ground: the darkest step of the brand green
  lightGreen: "#DCF0DF",
  lime: "#E4F68E",
  moss: "#0A2A35",
  paper: "#FAF7F0",
  white: "#FFFFFF",
  dark: "#201716",
  muted: "#635C55",
  line: "#E7E2D8",
  lineSoft: "#F0EBE1",
  display: "'Newsreader', Georgia, 'Times New Roman', serif",
  body: "'Manrope', 'Helvetica Neue', Arial, sans-serif",
};

// A4 at 96 dpi.
export const PAGE = { w: 794, h: 1123, mx: 42, mt: 40, mb: 44 };

export function fontFace(fontsCss) {
  return fontsCss;
}

/** Styles shared by every interior page of every catalogue. */
export const interiorCSS = `
@page { size: 794px 1123px; margin: 0; }
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: ${T.body};
  color: ${T.dark};
  background: ${T.paper};
  -webkit-font-smoothing: antialiased;
  font-variant-numeric: tabular-nums;
}
.page {
  position: relative;
  width: ${PAGE.w}px;
  height: ${PAGE.h}px;
  padding: ${PAGE.mt}px ${PAGE.mx}px ${PAGE.mb}px;
  background: ${T.paper};
  overflow: hidden;
  page-break-after: always;
  break-after: page;
  display: flex;
  flex-direction: column;
}
.page:last-child { page-break-after: auto; break-after: auto; }

/* ---- running head ---- */
.rh {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 7px;
  border-bottom: 1px solid ${T.brandGreen};
  margin-bottom: 14px;
  flex: none;
}
.rh .mark {
  font-family: ${T.display};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${T.brandGreen};
}
.rh .doc {
  font-size: 7.6px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${T.muted};
}

/* ---- running foot ---- */
.rf {
  position: absolute;
  left: ${PAGE.mx}px;
  right: ${PAGE.mx}px;
  bottom: 18px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-top: 7px;
  border-top: 1px solid ${T.line};
  font-size: 7.6px;
  letter-spacing: 0.08em;
  color: ${T.muted};
}
.rf .folio {
  font-family: ${T.display};
  font-size: 11px;
  letter-spacing: 0;
  color: ${T.brandGreen};
}

/* ---- two-column body ---- */
.cols {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 24px;
  align-content: start;
  min-height: 0;
}
.col { min-width: 0; align-self: start; }

/* ---- column head, repeated at the top of every column ---- */
.chead {
  display: grid;
  align-items: end;
  gap: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${T.brandGreen};
  margin-bottom: 5px;
}
.chead > div { min-width: 0; }
.chead .l1 {
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: ${T.dark};
  white-space: nowrap;
}
.chead .l2 {
  font-size: 6px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${T.muted};
  white-space: nowrap;
}
.chead .num { text-align: right; }

/* ---- genus band ---- */
.band {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 7px 0 2px;
  break-inside: avoid;
}
.band:first-child { margin-top: 0; }
.band .n {
  font-family: ${T.display};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${T.brandGreen};
  white-space: nowrap;
}
.band .syn {
  font-family: ${T.display};
  font-style: italic;
  font-size: 8.6px;
  color: ${T.muted};
  white-space: nowrap;
  overflow: hidden;
}
.band .rule {
  flex: 1 1 auto;
  height: 1px;
  background: ${T.lightGreen};
  transform: translateY(-2px);
}

/* ---- data rows ---- */
.row {
  display: grid;
  align-items: baseline;
  gap: 6px;
  padding: 1.7px 3px 1.7px 0;
  font-size: 8.8px;
  line-height: 1.3;
  break-inside: avoid;
}
.row.zebra { background: ${T.lineSoft}; }
.row .name { min-width: 0; font-variant-ligatures: none; }
.row .name .sp { font-style: italic; }
.row .cont { color: ${T.muted}; }
.row .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.row .fmt {
  font-weight: 600;
  font-size: 8.2px;
  letter-spacing: 0.02em;
  color: ${T.greenDeep};
  white-space: nowrap;
}
.row .price { font-weight: 700; }
.row .dim { color: ${T.muted}; }
.row.sub .name { padding-left: 10px; }
.row .name { text-indent: -7px; padding-left: 7px; }
.row.sub .name { text-indent: 0; }
.row .xref { color: ${T.muted}; font-size: 8.2px; }

/* ---- section opener inside a listing ---- */
.sect {
  break-inside: avoid;
  margin: 0 0 8px;
  padding: 7px 9px 8px;
  background: ${T.forest};
  color: ${T.paper};
  border-radius: 3px;
}
.sect .k {
  font-size: 6.4px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${T.lime};
}
.sect .t {
  font-family: ${T.display};
  font-size: 17px;
  font-weight: 400;
  line-height: 1.1;
  margin-top: 2px;
}
.sect .s {
  font-size: 7.4px;
  letter-spacing: 0.04em;
  color: rgba(250, 247, 240, 0.72);
  margin-top: 2px;
}
`;
