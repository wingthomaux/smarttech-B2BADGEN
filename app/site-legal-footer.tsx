import Link from "next/link";
export function SiteLegalFooter(){
  return <footer className="border-t bg-white" aria-label="Legal information / Rechtliche Informationen">
    <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-10">
      <p><strong>B2B AdGen Research</strong> · SmartTech · Thomas Wingenfeld</p>
      <nav aria-label="Legal information / Rechtliche Informationen" className="flex flex-wrap gap-x-5 gap-y-2">
        <Link href="/impressum" className="hover:text-primary hover:underline">Impressum</Link>
        <Link href="/datenschutz" className="hover:text-primary hover:underline">Datenschutz</Link>
        <Link href="/en/imprint" hrefLang="en" className="hover:text-primary hover:underline">Imprint</Link>
        <Link href="/en/privacy" hrefLang="en" className="hover:text-primary hover:underline">Privacy</Link>
      </nav>
    </div>
  </footer>;
}
