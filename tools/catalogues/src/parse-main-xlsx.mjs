/**
 * Reads the general catalogue from the supplier's XLSX (from 2026-2027 it
 * arrives as a spreadsheet, not a PDF) and writes the same listing that
 * parse-main.mjs produced from the PDF: genera -> items -> price rows, names
 * kept exactly as the supplier spells them, prices as "1,30" strings.
 *
 *   node src/parse-main-xlsx.mjs "…/GIRONA PLANTS - 2026-2027.xlsx" data/main.json
 *
 * The sheet is five columns (GENUS, DESCRIPTION, POT SIZE, HEIGHT, PRICE/U.):
 * a genus is named only on its first line, a taxon only on its first price
 * row, and taxa are separated by a row whose only content is a 0 price. A
 * cross-reference ("Feijoa sellowiana ver Acca sellowiana") is a description
 * with no price and becomes an item with no rows, as before.
 */
import fs from 'fs';
import XLSX from 'xlsx';

const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error('usage: parse-main-xlsx.mjs <catalogue.xlsx> <out.json>');
  process.exit(1);
}

const wb = XLSX.read(fs.readFileSync(src), { cellDates: false });
const ws = wb.Sheets[wb.SheetNames[0]];
const grid = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: null });

const HEADERS = new Set(['GENUS', 'GÉNERO', 'GÈNERE']);
const str = (v) => (v == null ? '' : String(v).replace(/\s+/g, ' ').trim());
const money = (v) => {
  if (v == null || v === '') return '';
  const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'));
  if (!Number.isFinite(n)) throw new Error(`bad price cell: ${JSON.stringify(v)}`);
  if (Math.abs(n * 100 - Math.round(n * 100)) > 1e-6)
    throw new Error(`price with more than two decimals: ${v}`);
  return n.toFixed(2).replace('.', ',');
};

const genera = [];
let curG = null, curItem = null, started = false, ended = false;

for (const r of grid) {
  const [g0, d0, f0, h0, p0] = [r[0], r[1], r[2], r[3], r[4]];
  const g = str(g0), d = str(d0), f = str(f0), h = str(h0);
  if (!started) { if (HEADERS.has(g)) started = true; continue; } // preamble
  if (HEADERS.has(g)) continue;                                   // the other two header rows
  // the legend and selling conditions follow the last taxon
  if (/^Precios sin IVA|^SIMBOLOS|^SÍMBOLS|^SYMBOLS|^CONDICIONES DE VENTA/i.test(g)) ended = true;
  if (ended) break;

  const hasPrice = typeof p0 === 'number' ? p0 > 0 : !!str(p0);
  if (!g && !d && !f && !h && !hasPrice) continue;                // separator (0 price) / blank

  if (g) { curG = { genus: g, items: [] }; genera.push(curG); curItem = null; }
  if (!curG) throw new Error(`row before any genus: ${JSON.stringify(r)}`);

  if (d) { curItem = { name: d, rows: [] }; curG.items.push(curItem); }
  if (!curItem) throw new Error(`price row before any taxon: ${JSON.stringify(r)}`);

  if (f || h || hasPrice) {
    if (!hasPrice) throw new Error(`row without price: ${curG.genus} | ${curItem.name} | ${f} ${h}`);
    curItem.rows.push({ format: f, height: h, price: money(p0) });
  }
}

if (!ended) throw new Error('never reached the legend: is this the right sheet?');

fs.writeFileSync(dst, JSON.stringify(genera, null, 1));
const taxa = genera.reduce((a, g) => a + g.items.length, 0);
const rws = genera.reduce((a, g) => a + g.items.reduce((b, i) => b + i.rows.length, 0), 0);
const sum = genera.flatMap((g) => g.items.flatMap((i) => i.rows.map((r) => Number(r.price.replace(',', '.'))))).reduce((a, b) => a + b, 0);
const norows = genera.flatMap((g) => g.items.filter((i) => !i.rows.length).map((i) => i.name));
console.log(`genera ${genera.length}  taxa ${taxa}  rows ${rws}  price sum ${sum.toFixed(2)}`);
console.log(`cross-ref items (no rows) ${norows.length}:`, norows.join(' ;; '));
