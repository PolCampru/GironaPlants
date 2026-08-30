import fs from 'fs';
const v=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const GRASSES=new Set(['Calamagrostis','Carex','Cortaderia','Deschampsia','Festuca','Hakonechloa','Helictotrichon','Imperata','Leymus','Luzula','Miscanthus','Molinia','Panicum','Pennisetum','Phalaris','Schizachyrium','Sesleria','Stipa']);
// synonyms carried by the source's genus headings
const SYN={Aster:'Symphyotrichum',Dicentra:'Lamprocapnos',Eupatorium:'=Eutrochium',Schizostylis:'=Hesperantha',Sedum:'Hylotelephium',Galium:'=Asperula',Podophyllum:'',Filipendula:''};
// The source lists the ferns twice (weeks 14-30 and 14-29). Keep the later,
// larger block; see the note in the report.
const ferns=v.filter(r=>!r.flowering && r.weeks==='14-29');
const rest=v.filter(r=>r.flowering);
const rows=[];
for(const r of rest){
  const genus=r.name.trim().split(/[\s.']/)[0];
  rows.push({section:GRASSES.has(genus)?'grasses':'perennials', genus, pack:r.pack, name:r.name, flowering:r.flowering, height:r.height, weeks:r.weeks});
}
for(const r of ferns){
  const genus=r.name.trim().split(/[\s.']/)[0];
  rows.push({section:'ferns', genus, pack:r.pack, name:r.name, flowering:'', height:r.height, weeks:r.weeks});
}
const order={perennials:0,grasses:1,ferns:2};
rows.sort((a,b)=> order[a.section]-order[b.section] || a.name.localeCompare(b.name,'es'));
const stats={};
for(const r of rows){ stats[r.section]=(stats[r.section]||0)+1; }
const genera={}; for(const r of rows) (genera[r.section] ||= new Set()).add(r.genus);
console.log('rows', rows.length, stats);
for(const s of Object.keys(genera)) console.log(' ',s,'genera:',genera[s].size);
fs.writeFileSync(process.argv[3], JSON.stringify({rows, syn:SYN},null,1));
