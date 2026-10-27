import entries from "./eworld-2027.generated.json";
import {providerProfilesEworld} from "./provider-profiles-eworld-20261027";

const byProvider=new Map(entries.map(entry=>[entry.provider,entry]));
export function eworldEntryFor(name:string){return byProvider.get(name)}
export function eworldSummary(name:string,locale:"de"|"en"){
  const entry=eworldEntryFor(name);if(!entry)return undefined;
  const location=[entry.city,entry.country].filter(Boolean).join(", ");
  return locale==="de"?`${entry.name}${location?` aus ${location}`:""} ist laut bereitgestelltem Messeexport Aussteller auf der E-world 2027. Stand der Quelldaten: ${entry.sourceDate}.`:`${entry.name}${location?` (${location})`:""} is listed as an E-world 2027 exhibitor in the supplied exhibition export. Source data dated ${entry.sourceDate}.`;
}
export function EworldExhibitor({name,locale}:{name:string;locale:"de"|"en"}){
  const entry=eworldEntryFor(name);if(!entry)return null;
  const en=locale==="en";
  return <section className="mt-8 border-l-2 border-primary bg-primary/5 px-5 py-4" aria-label={en?"E-world 2027 exhibition listing":"Messeeintrag E-world 2027"}>
    <h2 className="font-semibold">{en?"E-world 2027 exhibitor":"Aussteller auf der E-world 2027"}</h2>
    <p className="mt-2 text-sm leading-6">{entry.name} · {[entry.city,entry.country,entry.hall,entry.stand].filter(Boolean).join(" · ")}</p>
    <p className="mt-2 text-sm text-muted-foreground">{en?"Listing type (source wording)":"Ausstellerart"}: <span lang="de">{entry.exhibitorType}</span> · {en?"Source data":"Quelldaten"}: {entry.sourceDate}</p>
    {!entry.existing&&!providerProfilesEworld[name]&&<div className="mt-4 text-sm leading-6"><h3 className="font-semibold">{en?"Short profile · source excerpt":"Kurzprofil · Quellenauszug"}</h3>{entry.description?<p lang="de" className="mt-2">{entry.description}</p>:<p className="mt-2">{en?"No company description was supplied in the export.":"Im Export ist keine Unternehmensbeschreibung enthalten."}</p>}{en&&entry.description&&<p className="mt-2 text-muted-foreground">Original source excerpt; retained in its source language.</p>}</div>}
    <p className="mt-3 text-sm text-muted-foreground">{en?"Source: user-supplied exhibitor export. Participation has not been independently rechecked live; company statements are not a curated assessment of the portfolio.":"Quelle: bereitgestellter Ausstellerexport. Teilnahme nicht zusätzlich live nachgeprüft; Unternehmensangaben sind keine kuratierte Bewertung des Portfolios."}</p>
    <a className="mt-3 inline-block text-sm font-medium text-primary underline" href={entry.url} target="_blank" rel="noreferrer">{en?"E-world exhibitor profile":"E-world-Ausstellerprofil"} ↗</a>
  </section>;
}
