import {readFile,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=fileURLToPath(new URL("..",import.meta.url));
const read=async name=>JSON.parse(await readFile(path.join(root,name),"utf8"));
const decisions=await read("docs/provider-exclusions-additional-20260928.json");
const ids=new Set(decisions.map(row=>row.id));
if(ids.size!==decisions.length)throw new Error("Duplicate exclusion ID");
const ledger=await read("app/validation-ledger.json");
const validated=new Set(ledger.batches.flatMap(batch=>batch.assetIds));
for(const id of ids)if(validated.has(id)||validated.has(1000+id))throw new Error(`Validated asset cannot be excluded: ${id}`);
const archiveName="docs/provider-exclusions-20260928.json";
const archive=await read(archiveName);
const archivedIds=new Set(archive.map(row=>row.id));
const additions=[];
for(const source of ["public/data/publications.json","public/data/publications-update-2026-09-07.json"]){
  const data=await read(source);
  for(const row of data.filter(item=>ids.has(item.id))){
    if(archivedIds.has(row.id))throw new Error(`Already excluded: ${row.id}`);
    const decision=decisions.find(item=>item.id===row.id);
    additions.push({source,reason:decision.reason,auditName:decision.name,...row});
  }
  await writeFile(path.join(root,source),JSON.stringify(data.filter(item=>!ids.has(item.id))));
}
if(additions.length!==ids.size)throw new Error(`Expected ${ids.size} exclusions, found ${additions.length}`);
await writeFile(path.join(root,archiveName),JSON.stringify([...archive,...additions],null,2)+"\n");
console.log(`Archived ${additions.length} additional exclusions; validated assets preserved.`);
