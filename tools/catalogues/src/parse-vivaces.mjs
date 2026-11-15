import fs from 'fs';
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc = await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(process.argv[2])),verbosity:0}).promise;
const pick=(cells,lo,hi)=>cells.filter(c=>c.x>=lo&&c.x<hi).map(c=>c.s).join(' ').replace(/\s+/g,' ').trim();

// 2026-11 layout ("Servicio Mayo 2027"): x | pack(x121) | name(x160, with a
// bracketed synonym sometimes set apart at x230-245) | colour(x277) |
// flowering(x350) | height(x385-391) | "sem."(x428) | weeks(x453).
// Genus headings sit alone at x160; the grasses and ferns start under
// "Graminées:" / "Fougères:" at x278. Colour is read but not published.
const out=[]; let genus=null, section='perennials';
for(let p=1;p<=doc.numPages;p++){
  const page=await doc.getPage(p); const tc=await page.getTextContent();
  const rows=new Map();
  for(const it of tc.items){ if(!it.str.trim())continue; const y=Math.round(it.transform[5]);
    let k=[...rows.keys()].find(k=>Math.abs(k-y)<=3); if(k===undefined){k=y;rows.set(k,[]);} rows.get(k).push(it);}
  for(const [y,items] of [...rows.entries()].sort((a,b)=>b[0]-a[0])){
    const cells=items.map(i=>({x:i.transform[4],s:i.str.trim()})).sort((a,b)=>a.x-b.x);
    const line=cells.map(c=>c.s).join(' ').trim();
    if(/^Graminées:/.test(line)){ section='grasses'; continue; }
    if(/^Fougères:/.test(line)){ section='ferns'; continue; }
    const packCell=cells.find(c=>c.x>=115&&c.x<135);
    if(!packCell){
      if(cells[0].x>=155&&cells[0].x<=165) genus=cells[0].s;
      continue;
    }
    if(!/^\d+$/.test(packCell.s)) continue;
    const name=pick(cells,155,275), colour=pick(cells,275,345), flowering=pick(cells,345,380),
          height=pick(cells,380,425), weeks=pick(cells,445,600);
    if(!name) continue;
    out.push({section, genus, pack:Number(packCell.s), name, colour, flowering, height, weeks});
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(out,null,1));
const bad=out.filter(r=>!/^\d+-\d+$/.test(r.weeks)||!r.height||(r.section!=='ferns'&&!r.flowering));
const by={}; for(const r of out) by[r.section]=(by[r.section]||0)+1;
console.log(`VIVACES ${out.length} rows`, by, `suspect ${bad.length}`, bad.slice(0,8).map(r=>`${r.name}|${r.flowering}|${r.height}|${r.weeks}`));
