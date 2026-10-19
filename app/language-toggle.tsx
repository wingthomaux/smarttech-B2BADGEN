import Link from "next/link";

export function LanguageToggle({locale,href}:{locale:"de"|"en";href:string}){
  const english=locale==="en";
  const label=english?"Switch to the German version":"Zur englischen Version wechseln";
  return <Link href={href} hrefLang={english?"de":"en"} aria-label={label} title={label} className="inline-flex h-9 shrink-0 items-center border border-primary/25 bg-white p-0.5 text-xs font-semibold shadow-sm transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><span className={`inline-flex h-full items-center gap-1.5 px-2 ${!english?"bg-primary text-primary-foreground":"text-muted-foreground"}`}><span aria-hidden="true" className="text-base leading-none">🇩🇪</span><span className="hidden md:inline">DE</span></span><span aria-hidden="true" className="px-1 text-muted-foreground">↔</span><span className={`inline-flex h-full items-center gap-1.5 px-2 ${english?"bg-primary text-primary-foreground":"text-muted-foreground"}`}><span aria-hidden="true" className="text-base leading-none">🇬🇧</span><span className="hidden md:inline">EN</span></span></Link>;
}
