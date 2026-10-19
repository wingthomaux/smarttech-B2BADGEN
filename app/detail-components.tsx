import {ArrowUpRight,ChevronRight} from "lucide-react";
import Link from "next/link";
import {portalPath,portalProfiles} from "./portal-directory";

const taxonomyLinkClass="text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export function TaxonomyLink({href,children}:{href:string;children:React.ReactNode}){return <Link href={href} className={taxonomyLinkClass}>{children}</Link>}
export function PortalLinks({names,locale="de"}:{names:string[];locale?:"de"|"en"}){
  return <>{names.map((name,index)=><span key={`${name}-${index}`}>{index>0&&" · "}{portalProfiles.some(portal=>portal.name===name)?<TaxonomyLink href={portalPath(name,locale)}>{portalProfiles.find(portal=>portal.name===name)?.title??name}</TaxonomyLink>:name}</span>)}</>;
}

export function Fact({label,value}:{label:string;value:React.ReactNode}){return <div className="grid gap-1 border-b py-4 last:border-b-0 sm:grid-cols-[180px_1fr]"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="text-sm font-medium leading-6">{value}</dd></div>}
export function ExternalLink({href,children,secondary=false}:{href:string;children:React.ReactNode;secondary?:boolean}){return <a href={href} target="_blank" rel="noreferrer" className={`flex min-h-12 items-center justify-between gap-4 px-4 text-sm font-semibold ${secondary?"border border-primary text-primary":"bg-primary text-primary-foreground"}`}>{children}<ArrowUpRight className="size-4 shrink-0"/></a>}
export function OfficialProductSources({sources,locale="de"}:{sources:Array<{url:string;label:{de:string;en:string}}>;locale?:"de"|"en"}){return <section className="mt-6 border-t pt-5"><h2 className="text-sm font-semibold">{locale==="en"?"Official product sources":"Offizielle Produktquellen"}</h2><p className="mt-2 text-sm text-muted-foreground">{locale==="en"?"Provider product pages supporting the portfolio description; observed publications appear separately below.":"Produktseiten des Anbieters zur Portfoliodarstellung; beobachtete Publikationen stehen separat weiter unten."}</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80">{source.label[locale]} ↗</a>)}</div></section>}
export function InternalLink({href,children}:{href:string;children:React.ReactNode}){return <Link href={href} className="group flex items-center justify-between gap-4 py-4"><span>{children}</span><ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"/></Link>}
export function safeJsonLd(value:unknown){return JSON.stringify(value).replace(/</g,"\\u003c")}
