// Read-only pages are complete server-rendered documents. Keep structured data
// but omit hydration payloads and module preloads that those pages do not need.
export function readPageHtml(html:string){
  return html.replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi,(script,attributes:string)=>/\btype\s*=\s*["']application\/ld\+json["']/i.test(attributes)?script:"")
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?>/gi,"");
}
