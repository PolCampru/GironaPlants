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
// Column bounds come from the 2026-11 layout (Famille x22, Designation x110,
// Présentation x468, Disponible right-aligned at x547-560). The 2026-04 list
// had the designation at x120+; if the supplier moves the columns again, the
// row-count check below fails loudly instead of folding names into families.
{
  const pages = await rowsOf(process.argv[3]);
  const out=[];
  for(const rows of pages) for(const {cells} of rows){
    const fam=pick(cells,-20,100), des=pick(cells,100,460), pres=pick(cells,460,520), dis=pick(cells,520,600);
    if(!fam||!des) continue;
    if(/^Famille$/i.test(fam)) continue;
    if(!/^[A-Z. ]+$/.test(fam)) throw new Error(`unexpected family "${fam}" (columns moved?)`);
    out.push({family:fam, name:des, tray:pres, qty:Number(dis.replace(/\./g,''))||0});
  }
  fs.writeFileSync(process.argv[5]+'/esquejes.json', JSON.stringify(out,null,1));
  console.log(`ESQUEJES: ${out.length} rows, total ${out.reduce((a,r)=>a+r.qty,0)} plants`);
}
// The perennials list is parsed by src/parse-vivaces.mjs; argv[4] is ignored.
