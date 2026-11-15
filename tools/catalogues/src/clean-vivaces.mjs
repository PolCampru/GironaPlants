import fs from 'fs';
const v=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
// synonyms carried by the source's genus headings
const SYN={Actaea:'Cimicifuga',Aster:'Symphyotrichum',Dicentra:'Lamprocapnos',Eupatorium:'=Eutrochium',Pachyphragma:'=Thlaspi',Persicaria:'Bistorta',Schizostylis:'=Hesperantha',Sedum:'Hylotelephium',Stachys:'=Betonica',Galium:'=Asperula',Podophyllum:'',Filipendula:''};
// Sections come from the source's own "Graminées:" / "Fougères:" headings
// (src/parse-vivaces.mjs). Until 2026-05 the ferns were listed twice and the
// grasses had to be guessed from a genus list; the 2026-11 list fixes both.
const rows=v.map(r=>({section:r.section, genus:r.name.trim().split(/[\s.']/)[0], pack:r.pack, name:r.name,
  flowering:r.section==='ferns'?'':r.flowering, height:r.height, weeks:r.weeks}));
const order={perennials:0,grasses:1,ferns:2};
rows.sort((a,b)=> order[a.section]-order[b.section] || a.name.localeCompare(b.name,'es'));
const stats={}; for(const r of rows) stats[r.section]=(stats[r.section]||0)+1;
const genera={}; for(const r of rows) (genera[r.section] ||= new Set()).add(r.genus);
console.log('rows', rows.length, stats);
for(const s of Object.keys(genera)) console.log(' ',s,'genera:',genera[s].size);
fs.writeFileSync(process.argv[3], JSON.stringify({rows, syn:SYN},null,1));
