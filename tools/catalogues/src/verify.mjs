import fs from 'fs';
const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(process.argv[2]))}).promise;
let prices=[], fmts=[];
for(let p=1;p<=doc.numPages-1;p++){
  const tc=await (await doc.getPage(p)).getTextContent();
  for(const it of tc.items){ const x=it.transform[4], s=it.str.trim(); if(!s) continue;
    if(x>=480&&/^\d+,\d\d$/.test(s)) prices.push(s);
    if(x>=335&&x<412&&s) fmts.push(s);
  }
}
const parsed=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const pp=parsed.flatMap(g=>g.items.flatMap(i=>i.rows.map(r=>r.price)));
const pf=parsed.flatMap(g=>g.items.flatMap(i=>i.rows.map(r=>r.format))).filter(Boolean);
console.log('PDF price tokens:',prices.length,' parsed prices:',pp.length);
console.log('PDF format tokens:',fmts.length,' parsed formats:',pf.length);
const sum=a=>a.reduce((x,y)=>x+parseFloat(y.replace(',','.')),0).toFixed(2);
console.log('price sum PDF',sum(prices),' parsed',sum(pp));
