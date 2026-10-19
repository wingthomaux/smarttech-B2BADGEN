import {readFile,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

// Editorial exclusion decision: these records cannot support a relevant,
// attributable SmartTech provider page. Git history retains the original feed.
const excludedByReason={
  "Kein identifizierbarer Anbieter (Platzhalter/Autorenfeld)": [108,245,260,390,471,919,969,1094,1123,1373,1435,1483,1523,1688,1779,1841,1859,2098,2099,2114,2194,2460,3145,3146,3515,3576,3650,340,1786,1862,2257,2280,2332,2362,1878,2846,479,3189],
  "Privatkundenthema ohne belastbaren B2B-Technologiebezug": [1822,2082,2527,2657,2746,2766,2981,3125,2858,2878,2964,2436,3111,1643,2359,3516,3577,3379,3519,3719,3394],
  "Nicht als Anbieter belegte Quelle oder Veranstaltung": [1498,1708,1835,1674,1456,3819,3556],
};
const decisions=new Map(Object.entries(excludedByReason).flatMap(([reason,ids])=>ids.map(id=>[id,reason])));
if(decisions.size!==Object.values(excludedByReason).flat().length)throw new Error("Duplicate exclusion ID");
const root=fileURLToPath(new URL("..",import.meta.url));
const sources=["public/data/publications.json","public/data/publications-update-2026-09-07.json"];
const records=[];
for(const source of sources){
  const file=path.join(root,source),data=JSON.parse(await readFile(file,"utf8"));
  records.push(...data.filter(item=>decisions.has(item.id)).map(item=>({source,reason:decisions.get(item.id),...item})));
  await writeFile(file,JSON.stringify(data.filter(item=>!decisions.has(item.id))));
}
if(records.length!==decisions.size)throw new Error(`Expected ${decisions.size} exclusions, found ${records.length}`);
await writeFile(path.join(root,"docs/provider-exclusions-20260928.json"),JSON.stringify(records,null,2)+"\n");
console.log(`Archived and excluded ${records.length} low-quality publications from the active catalogue.`);
