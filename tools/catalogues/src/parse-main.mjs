import fs from 'fs';
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc = await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(process.argv[2]))}).promise;
/* Text runs are joined as the PDF laid them out: a run that starts where the
   previous one ended is the same word ("Coton"+"easter"), one that starts
   further right had a space between them ("Acer palmatum" + "-"). */
const pick = (cells, lo, hi) => {
  const sel = cells.filter((c) => c.x >= lo && c.x < hi);
  let out = '';
  for (let i = 0; i < sel.length; i++) {
    const prev = sel[i - 1];
    if (prev && sel[i].x - (prev.x + prev.w) > 0.8) out += ' ';
    out += sel[i].s;
  }
  return out.replace(/\s+/g, ' ').trim();
};

/** The list spells the same genus two ways in places (Syzigium / SYZYGIUM),
 *  so the heading matches a name that is one edit away from it. */
function sameGenus(name, genus) {
  const w = name.toUpperCase().split(/[\s.']/)[0];
  if (w === genus) return true;
  if (Math.abs(w.length - genus.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < w.length && j < genus.length) {
    if (w[i] === genus[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (w.length > genus.length) i++;
    else if (w.length < genus.length) j++;
    else { i++; j++; }
  }
  return edits + (w.length - i) + (genus.length - j) <= 1;
}

const genera=[]; let curG=null, curItem=null, lastLineWasNameOnly=false;
const HEADERS=new Set(['GENUS','GÉNERO','GÈNERE']);

for(let p=1;p<=doc.numPages-1;p++){          // last page = legend, handled separately
  const page=await doc.getPage(p); const tc=await page.getTextContent();
  const rows=new Map();
  for(const it of tc.items){ if(!it.str.trim())continue; const y=Math.round(it.transform[5]);
    let k=[...rows.keys()].find(k=>Math.abs(k-y)<=3); if(k===undefined){k=y;rows.set(k,[]);} rows.get(k).push(it);}
  for(const [y,items] of [...rows.entries()].sort((a,b)=>b[0]-a[0])){
    const cells=items.map(i=>({x:i.transform[4],w:i.width,s:i.str})).sort((a,b)=>a.x-b.x);
    const raw=cells.map(c=>c.s).join('');
    if(/^GIRONA PLANTS SL/.test(raw)) continue;
    if(/PLANTAS PARA SUS PROYECTOS|Venta exclusiva|PRECIOS DE PLANTAS|Precios sin IVA|Alturas aproximadas|Transport costs/.test(raw)) continue;
    let g=pick(cells,-20,140), d=pick(cells,140,335), f=pick(cells,335,412), h=pick(cells,412,480), pr=pick(cells,480,600);
    d=d.replace(/P[áa]gina\s*\d+\s*$/,'').trim();
    if(HEADERS.has(g)) continue;
    if(!g&&!d&&!f&&!h&&!pr) continue;

    if(g){
      // A name-only line before a genus heading belongs to that genus when it
      // names it ("Eugenia myrtifolia..." above EUGENIA). A cross-reference
      // that names something else ("Agathea coelestis ver...") stays put.
      const cand = lastLineWasNameOnly && curItem && curItem.rows.length === 0 && curG
        ? curItem : null;
      const orphan = cand && sameGenus(cand.name, g) ? curG.items.pop() : null;
      curG={genus:g, items:[]}; genera.push(curG);
      if(orphan){ curG.items.push(orphan); curItem=orphan; }
    }
    if(!curG) continue;

    if(d){
      const openRow = curItem && curItem.rows.length ? curItem.rows[curItem.rows.length-1] : null;
      const cont = curItem && (/^[^A-ZÀ-Ý]/.test(d) || /(=|\bver)$/.test(curItem.name) || d.length<=3 || (pr && !f && !h && openRow && !openRow.price));
      if(cont){ curItem.name=(curItem.name+' '+d).replace(/\s+/g,' ').trim(); }
      else { curItem={name:d, rows:[]}; curG.items.push(curItem); }
    }
    if(!curItem){ lastLineWasNameOnly=false; continue; }

    if(f||h){ curItem.rows.push({format:f, height:h, price:pr}); }
    else if(pr){
      const open=curItem.rows[curItem.rows.length-1];
      if(open && !open.price) open.price=pr;                       // wrapped price
      else curItem.rows.push({format:'', height:'', price:pr});
    }
    lastLineWasNameOnly = !!d && !f && !h && !pr;
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(genera,null,1));
const taxa=genera.reduce((a,g)=>a+g.items.length,0);
const rws=genera.reduce((a,g)=>a+g.items.reduce((b,i)=>b+i.rows.length,0),0);
const noprice=genera.flatMap(g=>g.items.flatMap(i=>i.rows.filter(r=>!r.price).map(r=>`${i.name} | ${r.format} ${r.height}`)));
const norows=genera.flatMap(g=>g.items.filter(i=>!i.rows.length).map(i=>i.name));
console.log(`genera ${genera.length}  taxa ${taxa}  rows ${rws}`);
console.log(`rows w/o price ${noprice.length}:`, noprice.join(' ;; '));
console.log(`cross-ref items (no rows) ${norows.length}:`, norows.slice(0,60).join(' ;; '));
