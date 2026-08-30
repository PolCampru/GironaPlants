import fs from 'fs';
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc = await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(process.argv[2]))}).promise;
const pick=(cells,lo,hi)=>cells.filter(c=>c.x>=lo&&c.x<hi).map(c=>c.s).join('').replace(/\s+/g,' ').trim();

const out=[]; let genus=null;
for(let p=1;p<=doc.numPages;p++){
  const page=await doc.getPage(p); const tc=await page.getTextContent();
  const rows=new Map();
  for(const it of tc.items){ if(!it.str.trim())continue; const y=Math.round(it.transform[5]);
    let k=[...rows.keys()].find(k=>Math.abs(k-y)<=3); if(k===undefined){k=y;rows.set(k,[]);} rows.get(k).push(it);}
  for(const [y,items] of [...rows.entries()].sort((a,b)=>b[0]-a[0])){
    const cells=items.map(i=>({x:i.transform[4],s:i.str})).sort((a,b)=>a.x-b.x);
    const line=cells.map(c=>c.s).join('').trim();
    const x0=cells[0].x;
    if(x0>=40&&x0<=46&&cells.every(c=>c.x<200)){ genus=line; continue; }
    // a week range wrapped onto its own line belongs to the row above it
    if(cells.length===1 && cells[0].x>=505 && /^\d+-\d+$/.test(line) && out.length && !out[out.length-1].weeks){
      out[out.length-1].weeks=line; continue;
    }
    if(!(x0>=20&&x0<=25&&/^\d+$/.test(cells[0].s.trim()))) continue;
    const pack=Number(cells[0].s.trim());
    // The height column starts anywhere from x=462; flowering never runs past it.
    const name=pick(cells,40,440), flower=pick(cells,440,462), cm=pick(cells,462,505),
          weeks=pick(cells,505,600).replace(/^sem\.?\s*/,'');
    if(!name) continue;
    out.push({genus, pack, name, flowering:flower, height:cm, weeks});
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(out,null,1));
const bad=out.filter(r=>r.flowering.length>4||!r.weeks||(!r.height&&r.flowering));
console.log(`VIVACES ${out.length} rows; suspect ${bad.length}`, bad.slice(0,5).map(r=>`${r.name}|${r.flowering}|${r.height}|${r.weeks}`));
