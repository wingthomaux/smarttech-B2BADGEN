import {englishText} from "./english";
import Link from "next/link";
import {editorialEntriesForProvider} from "./editorial-portals";
import {portalPath} from "./portal-directory";

export function EditorialPortalReferences({provider,locale}:{provider:string;locale:"de"|"en"}){
  const entries=editorialEntriesForProvider(provider);
  if(!entries.length)return null;
  const en=locale==="en";
  return <>{entries.map(entry=><div key={entry.url} className="py-4 text-sm leading-6">
    <p className="text-xs text-muted-foreground">{en?"No publication date":"Ohne Datumsangabe"} · <Link className="text-primary hover:underline" href={portalPath(entry.portal,locale)}>{entry.portal}</Link> · {en?"Editorial source reference":"Redaktioneller Quellenbezug"}</p>
    <a className="mt-1 block font-medium hover:text-primary" href={entry.url} target="_blank" rel="noreferrer">{en?englishText(entry.title):entry.title} ↗</a>
  </div>)}</>;
}
