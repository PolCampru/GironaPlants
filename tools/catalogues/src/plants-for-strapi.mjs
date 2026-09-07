/**
 * Flattens the general catalogue listing (data/main.json, from parse-main.mjs)
 * into the flat rows the Strapi `plant` collection stores: one row per
 * price line, carrying genus, botanical name, pot size, height and price.
 *
 *   node src/plants-for-strapi.mjs data/main.json data/plants.json
 *
 * Two things are dropped on the way, and only these two:
 *
 * 1. Cross-reference entries — a name with no price rows, there only to send
 *    the reader to the accepted name ("Feijoa sellowiana ver Acca sellowiana").
 *    `price` is required on the content type, so they cannot be rows.
 *
 * 2. The source's own marks on a name: a trailing run of `*`, `**`, `-` or `X`
 *    and a `= synonym` tail. The printed catalogue keeps them (gen.mjs) because
 *    it reproduces the supplier's list; the database cannot, because these
 *    strings are the species page's <h1> and its URL. Left in, "Acer
 *    pseudoplatanus * - X" becomes /acer-pseudoplatanus-x and "Acca sellowiana
 *    = Feijoa Sellowiana" becomes /acca-sellowiana-feijoa-sellowiana, which is
 *    both wrong and a URL no earlier page ever had.
 *
 * Nothing else is touched: no case folding, no reordering, no price rounding.
 */
import fs from 'fs';

/** "Amelanchier ovalis ** = A. rotundifolia**" -> "Amelanchier ovalis". */
// No `\s` after the `=`: the supplier does not always leave a space there
// ("Pinus uncinata*=Pinus mugo var.Rostrata*"), and demanding one let the
// whole synonym tail through — marks included, since the name no longer
// ended in one for the next replace to catch.
export const cleanName = (name) =>
  name
    .replace(/\s*=.*$/, '')
    .replace(/(\s*(\*+|-|X))+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();

export function flatten(genera) {
  const rows = [];
  const crossRefs = [];
  for (const g of genera) {
    const genus = g.genus.trim();
    for (const item of g.items) {
      const raw = item.name.trim();
      if (!item.rows.length) {
        crossRefs.push(`${genus} | ${raw}`);
        continue;
      }
      const description = cleanName(raw);
      if (!description) throw new Error(`name emptied by cleaning: ${raw}`);
      for (const r of item.rows) {
        const price = Number(String(r.price).replace(',', '.'));
        if (!Number.isFinite(price) || price <= 0)
          throw new Error(`bad price: ${genus} | ${raw} | ${JSON.stringify(r)}`);
        rows.push({
          genus,
          description,
          pot_size: r.format.trim(),
          height: r.height.trim(),
          price,
        });
      }
    }
  }
  return { rows, crossRefs };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  const genera = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const { rows, crossRefs } = flatten(genera);

  // Two names cleaning to one row key would silently merge two listings.
  const keys = new Map();
  for (const r of rows) {
    const k = [r.genus, r.description, r.pot_size, r.height].join('|');
    keys.set(k, (keys.get(k) ?? 0) + 1);
  }
  const collisions = [...keys.entries()].filter(([, c]) => c > 1);
  if (collisions.length)
    throw new Error(`duplicate rows after cleaning:\n  ${collisions.map(([k]) => k).join('\n  ')}`);

  fs.writeFileSync(process.argv[3], JSON.stringify(rows, null, 1));

  const n = (f) => new Set(rows.map(f)).size;
  const sum = rows.reduce((a, r) => a + r.price, 0);
  console.log(`rows ${rows.length}  genera ${n((r) => r.genus)}  taxa ${n((r) => r.description)}`);
  console.log(`price sum ${sum.toFixed(2)}  range ${Math.min(...rows.map((r) => r.price))}-${Math.max(...rows.map((r) => r.price))}`);
  console.log(`cross-references skipped ${crossRefs.length}`);
}
