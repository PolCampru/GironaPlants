import fs from 'fs';
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

async function rowsOf(file){
  const doc = await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(file))}).promise;
  const pages=[];
  for(let p=1;p<=doc.numPages;p++){
    const page=await doc.getPage(p); const tc=await page.getTextContent();
    const rows=new Map();
    for(const it of tc.items){ if(!it.str.trim())continue; const y=Math.round(it.transform[5]);
      let k=[...rows.keys()].find(k=>Math.abs(k-y)<=3); if(k===undefined){k=y;rows.set(k,[]);} rows.get(k).push(it);}
    pages.push([...rows.entries()].sort((a,b)=>b[0]-a[0]).map(([y,items])=>{
      items.sort((a,b)=>a.transform[4]-b.transform[4]);
      return {y, cells: items.map(i=>({x:i.transform[4], s:i.str}))};
    }));
  }
  return pages;
}
const pick=(cells,lo,hi)=>cells.filter(c=>c.x>=lo&&c.x<hi).map(c=>c.s).join('').replace(/\s+/g,' ').trim();

// The general (MAIN) price list is no longer parsed here: it arrives as an
// XLSX since 2026-2027 (src/parse-main-xlsx.mjs; src/parse-main.mjs for the
// older PDFs). argv[2] is kept in the CLI signature and ignored, so the README
// invocation stays the same and this can never overwrite data/main.json.
// ---------- ESQUEJES ----------
{
  const pages = await rowsOf(process.argv[3]);
  const out=[];
  for(const rows of pages) for(const {cells} of rows){
    const fam=pick(cells,-20,120), des=pick(cells,120,430), pres=pick(cells,430,500), dis=pick(cells,500,600);
    if(!fam||!des) continue;
    if(/^Famille$/i.test(fam)) continue;
    out.push({family:fam, name:des, tray:pres, qty:Number(dis.replace(/\./g,''))||0});
  }
  fs.writeFileSync(process.argv[5]+'/esquejes.json', JSON.stringify(out,null,1));
  console.log(`ESQUEJES: ${out.length} rows, total ${out.reduce((a,r)=>a+r.qty,0)} plants`);
}
// ---------- VIVACES ----------
{
  const pages = await rowsOf(process.argv[4]);
  const out=[]; let genus=null;
  for(const rows of pages) for(const {cells} of rows){
    const line=cells.map(c=>c.s).join('').trim();
    const x0=cells[0].x;
    if(x0>=40&&x0<=46&&cells.every(c=>c.x<200)){ genus=line; continue; }
    if(!(x0>=20&&x0<=25&&/^\d+$/.test(cells[0].s.trim()))) continue;
    const pack=Number(cells[0].s.trim());
    const name=pick(cells,40,440), flower=pick(cells,440,470), cm=pick(cells,470,505), weeks=pick(cells,505,600);
    if(!name) continue;
    out.push({genus, pack, name, flowering:flower, height:cm, weeks:weeks.replace(/^sem\.?\s*/,'')});
  }
  fs.writeFileSync(process.argv[5]+'/vivaces.json', JSON.stringify(out,null,1));
  console.log(`VIVACES: ${out.length} rows`);
}
