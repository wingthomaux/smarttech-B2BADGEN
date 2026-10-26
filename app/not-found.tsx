import {headers} from "next/headers";
import Link from "./public-link";
import {publicRecoveryUrl,recoverySearchPath} from "./recovery-search";
export default async function NotFound(){
 const en=(await headers()).get("x-smarttech-language")==="en",locale=en?"en":"de";
 return <main className="mx-auto max-w-3xl px-5 py-16"><p className="text-sm text-muted-foreground">404</p><h1 className="mt-3 text-3xl font-semibold">{en?"Page not found":"Seite nicht gefunden"}</h1><p className="mt-5 leading-7">{en?"This address has no matching replacement. Search our current providers and knowledge items.":"Für diese Adresse gibt es keinen passenden Ersatz. Suchen Sie in unseren aktuellen Anbieterprofilen und Wissensobjekten."}</p><form method="get" action={publicRecoveryUrl(recoverySearchPath(locale))} className="mt-7 flex flex-wrap gap-3"><label className="w-full font-medium" htmlFor="missing-query">{en?"Search the catalogue":"Katalog durchsuchen"}</label><input id="missing-query" name="q" type="search" maxLength={160} className="min-w-0 flex-1 border px-3 py-2"/><button type="submit" className="bg-primary px-5 py-2 font-semibold text-primary-foreground">{en?"Search":"Suchen"}</button></form><Link href={en?"/en":"/"} className="mt-7 inline-block text-primary underline">{en?"Back to SmartTech":"Zur SmartTech-Startseite"}</Link></main>;
}
