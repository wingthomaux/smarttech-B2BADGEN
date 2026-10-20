import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const {default:worker}=await import(workerUrl.href);
const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};

test("renders public catalog metadata and internal detail links",async()=>{
  const response=await worker.fetch(new Request("http://localhost/",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(response.status,200);assert.match(response.headers.get("content-type")??"",/^text\/html\b/i);
  const html=await response.text();
  assert.match(html,/<link rel="canonical" href="https:\/\/smarttech\.b2badgen\.com\/"\/>/);
  assert.doesNotMatch(html,/Taxonomie · Scoring 0\.2|Öffentlicher Katalog/);
  assert.match(html,/aria-label="Zur englischen Version wechseln"/);
  assert.match(html,/🇩🇪/);
  assert.match(html,/🇬🇧/);
  assert.match(html,/Was möchten Sie verändern oder beschaffen\?/);
  assert.match(html,/Wissensobjekte sind eingeordnet/);
  assert.match(html.replaceAll("<!-- -->",""),/href="\/portale"[^>]*><strong[^>]*>27<\/strong> Portale<\/a>/);
  assert.doesNotMatch(html,/77 Wissensobjekte sind redaktionell eingeordnet/);
  assert.match(html,/Neu seit dem letzten Update/);
  assert.match(html,/neue Unternehmensprofile/);
  assert.match(html,/neue Wissensobjekte/);
  assert.match(html,/Neue Unternehmensprofile und Wissensobjekte/);
  assert.match(html,/href="\/wissen\/[^"]+"/);
});

test("renders newly profiled providers in both languages with their own source",async()=>{
  const sitemap=await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx);
  const xml=await sitemap.text();
  for(const [slug,domain,german,english] of [
    ["cloudflare","cloudflare.com","WAF, DDoS-Abwehr und API-Schutz","WAF, DDoS defence and API protection"],
    ["genetec","genetec.com","Videomanagement, Zutrittskontrolle","video management, access control"],
    ["kgs-software","kgs-software.com","ArchiveLink oder CMIS","ArchiveLink or CMIS"],
    ["genesys","genesys.com","Routing, Workforce Management, Analytik und KI","Routing, workforce management, analytics and AI"],
    ["farmdroid","farmdroid.com","autonome Feldroboter für Aussaat und Unkrautmanagement","autonomous field robots for sowing and weed management"],
    ["sitecockpit","sitecockpit.com","Ein Widget oder automatischer Scan allein","A widget or automated scan alone"],
    ["swan","swan.de","SAP EWM, SAP MFS","SAP EWM, SAP MFS"],
    ["trener-robotics","trener.ai","KI-Software für industrielle Roboterzellen","AI software for industrial robot cells"],
    ["hp-poly","hp.com","Produktlinie von HP","HP product line"],
    ["encryptobox","crymbl.com","mit CRYMBL","offers CRYMBL"],
  ]){
    const de=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/anbieter/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
    const en=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/en/providers/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
    assert.ok(de&&en,`${slug} has both canonical paths`);
    const deResponse=await worker.fetch(new Request(de,{headers:{accept:"text/html"}}),env,ctx);
    const enResponse=await worker.fetch(new Request(en,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(deResponse.status,200,de);assert.equal(enResponse.status,200,en);
    const deHtml=await deResponse.text(),enHtml=await enResponse.text();
    assert.ok(deHtml.includes(german));assert.ok(enHtml.includes(english));
    assert.ok(deHtml.includes(domain));assert.ok(enHtml.includes(domain));
    assert.match(deHtml,/Beobachtete Fach- und Portalpublikationen/);
  }
});

test("links EUAIGF editorial context from new and existing company pages",async()=>{
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const [slug,project] of [["polarise","Polarise"],["artefact","AION"],["bull","AION"],["ionos","IONOS / HOCHTIEF"],["multiverse-computing","AI Gigafactory CZ"]]){
    for(const prefix of ["anbieter","en/providers"]){
      const path=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/${prefix}/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
      assert.ok(path,`${prefix}/${slug} is indexed`);
      const response=await worker.fetch(new Request(path,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,path);
      const html=await response.text();
      assert.ok(html.includes(project),`${path} links the correct project`);
      assert.match(html,/href="https:\/\/euaigf\.b2badgen\.com\/"/);
      assert.match(html,new RegExp(`href="/${prefix==="anbieter"?"portale":"en/portals"}/eu-ai-gigafactories"`));
      if(slug==="polarise"){
        assert.match(html.replaceAll("<!-- -->",""),/1<\/p><p class="text-xs text-muted-foreground">Portal<\/p>/);
        const publicationHeading=prefix==="anbieter"?"Beobachtete Fach- und Portalpublikationen":"Observed trade and portal publications";
        assert.ok(html.indexOf(publicationHeading)<html.lastIndexOf('href="https://euaigf.b2badgen.com/"'),"Editorial source belongs in the observed publications section");
        assert.doesNotMatch(html,/Beobachtete redaktionelle Portale|Observed editorial portals/);
      }
    }
  }
});

test("renders eighth-wave descriptions, offer focus, roles and source in both languages",async()=>{
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const [slug,domain,de,en] of [
    ["a3-communications","a3communicationspr.com","PR- und Kommunikationsdienstleister","PR and communications provider"],
    ["modius","modius.com","Data-Center-Infrastructure-Management","data-centre infrastructure management"],
    ["dicis","dicisgroup.com","digital unterstützte Zertifizierungsprozesse","digitally supported certification processes"],
    ["vimata-group","humera.de","historischer Gruppenname","historical group name"],
  ]){
    for(const [prefix,phrase,focus,roles] of [["anbieter",de,"Angebotsschwerpunkte","Typische Fachrollen"],["en/providers",en,"Portfolio focus","Typical specialist roles"]]){
      const url=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/${prefix}/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
      assert.ok(url,`${slug} is listed in ${prefix}`);
      const response=await worker.fetch(new Request(url,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,url);
      const html=await response.text();
      assert.ok(html.includes(phrase),`${url} contains its own summary`);
      assert.ok(html.includes(focus)&&html.includes(roles),`${url} contains both structured sections`);
      assert.ok(html.includes(domain),`${url} links its company source`);
    }
  }
});

test("renders ninth-wave company, regional entity and association profiles in both languages",async()=>{
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const [slug,domain,de,en] of [
    ["everpure","everpuredata.com","Enterprise-Storage-Plattformen","enterprise storage platforms"],
    ["splunk-services-singapore-pte","splunk.com","regionale Konzerngesellschaft","regional group entity"],
    ["openadr","openadr.org","offene Standards","open standards"],
  ]){
    for(const [prefix,phrase,focus,roles] of [["anbieter",de,"Angebotsschwerpunkte","Typische Fachrollen"],["en/providers",en,"Portfolio focus","Typical specialist roles"]]){
      const url=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/${prefix}/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
      assert.ok(url,`${slug} is listed in ${prefix}`);
      const response=await worker.fetch(new Request(url,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,url);
      const html=await response.text();
      assert.ok(html.includes(phrase),`${url} contains its own summary`);
      assert.ok(html.includes(focus)&&html.includes(roles),`${url} contains both structured sections`);
      assert.ok(html.includes(domain),`${url} links its official source`);
    }
  }
});

test("renders tenth-wave company, product identity and association profiles in both languages",async()=>{
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const [slug,domain,de,en] of [
    ["schnell-digital","schnell.digital","wiederkehrende Geschäftsprozesse","recurring business processes"],
    ["trooper-ai-ein-produkt-von-media-trooper","trooper.ai","KI-Produkt von Media Trooper","AI product from Media Trooper"],
    ["bundesverband-der-bilanzbuchhalter-und-controller-e-v","bvbc.de","vertritt Bilanzbuchhalter","represents accounting professionals"],
  ]){
    for(const [prefix,phrase,focus,roles] of [["anbieter",de,"Angebotsschwerpunkte","Typische Fachrollen"],["en/providers",en,"Portfolio focus","Typical specialist roles"]]){
      const url=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/${prefix}/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
      assert.ok(url,`${slug} is listed in ${prefix}`);
      const response=await worker.fetch(new Request(url,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,url);
      const html=await response.text();
      assert.ok(html.includes(phrase),`${url} contains its own summary`);
      assert.ok(html.includes(focus)&&html.includes(roles),`${url} contains both structured sections`);
      assert.ok(html.includes(domain),`${url} links its official source`);
    }
  }
});

test("renders eleventh-wave IT, remediation and HR profiles in both languages",async()=>{
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const [slug,domain,de,en] of [
    ["infoserve","infoserve.de","Proxmox-Partnerschaft","Proxmox partnership"],
    ["vallovapor","vallovapor.de","Schimmelsanierung","mould remediation"],
    ["humera","humera.de","HR-Suite","HR suite"],
  ]){
    for(const [prefix,phrase,focus,roles] of [["anbieter",de,"Angebotsschwerpunkte","Typische Fachrollen"],["en/providers",en,"Portfolio focus","Typical specialist roles"]]){
      const url=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/${prefix}/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
      assert.ok(url,`${slug} is listed in ${prefix}`);
      const response=await worker.fetch(new Request(url,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,url);
      const html=await response.text();
      assert.ok(html.includes(phrase),`${url} contains its own summary`);
      assert.ok(html.includes(focus)&&html.includes(roles),`${url} contains both structured sections`);
      assert.ok(html.includes(domain),`${url} links its official source`);
    }
  }
});

test("renders audited industrial and security providers, and redirects source-label aliases",async()=>{
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const [slug,domain,de,en] of [
    ["baumer","baumer.com","Sensorik und Komponenten für industrielle Automatisierung","sensors and components for industrial automation"],
    ["abnormal-ai","abnormal.ai","Schutz von E-Mail, Identitäten","protect email, identities"],
    ["tiger-data","tigerdata.com","TimescaleDB","TimescaleDB"],
  ]){
    for(const [prefix,phrase,focus,roles] of [["anbieter",de,"Angebotsschwerpunkte","Typische Fachrollen"],["en/providers",en,"Portfolio focus","Typical specialist roles"]]){
      const url=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/${prefix}/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
      assert.ok(url,`${slug} has a canonical ${prefix} page`);
      const response=await worker.fetch(new Request(url,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,url);
      const html=await response.text();
      assert.ok(html.includes(phrase)&&html.includes(domain)&&html.includes(focus)&&html.includes(roles),`${url} contains its audited profile`);
    }
  }
  assert.doesNotMatch(xml,/\/anbieter\/(?:mongo-db-logo|infor-logo|logo-abnormal-ai)-/);
  assert.doesNotMatch(xml,/\/anbieter\/(?:zu-pruefen|buchautor|my-wage)-/);
});

test("shows the current portal update while preserving transparent whitepaper access status",async()=>{
  const home=(await (await worker.fetch(new Request("http://localhost/"),env,ctx)).text()).replaceAll("<!-- -->","");
  assert.match(home,/Katalogstand vom 19\.10\.2026 im Vergleich zum 30\.09\.2026/);
  assert.match(home,/55 neue Unternehmensprofile/);
  assert.match(home,/453 neue Wissensobjekte/);
  const weekly=JSON.parse(await readFile(new URL("../app/weekly-update.generated.json",import.meta.url),"utf8"));
  assert.equal(weekly.providers.length,55);
  assert.equal(weekly.assets.length,453);
  assert.equal(weekly.assets.filter(entry=>entry.portals.includes("Security-Insider")).length,12);
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const slug of ["ergon-informatik-ag","ivanti","mondoo","cancom","eset-deutschland"]){
    const path=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/anbieter/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
    assert.ok(path,`${slug} has a canonical provider page`);
    const html=await (await worker.fetch(new Request(path),env,ctx)).text();
    assert.match(html,/Angebotsschwerpunkte/);
    assert.match(html,/Typische Fachrollen/);
  }
  const knowledge=xml.match(/https:\/\/smarttech\.b2badgen\.com\/wissen\/710005-[^<]+/)?.[0];
  assert.ok(knowledge,"ESET hospital paper has a detail page");
  const detail=await (await worker.fetch(new Request(knowledge),env,ctx)).text();
  assert.match(detail,/Registrierung bei heise erforderlich|registrierungspflichtig/);
  assert.match(detail,/nicht einzeln geprüft|nicht einzeln validiert/);
});

test("links editorial portals to the exact company case studies",async()=>{
  for(const [slug,article] of [["salesforce","agentforce"],["siemens","siemens-industrial-copilot"],["nvidia","nvidia-agent-toolkit"],["adobe","adobe-creative-cloud"]]){
    const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
    const path=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/anbieter/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
    assert.ok(path,`Missing company: ${slug}`);
    const html=await (await worker.fetch(new Request(path),env,ctx)).text();
    assert.match(html,/href="\/portale\/interaktivierungs-atlas"/);
    assert.ok(html.includes(`href="https://atlas.b2badgen.com/artikel/${article}/"`));
    assert.ok(html.indexOf("Beobachtete Fach- und Portalpublikationen")<html.indexOf(`href="https://atlas.b2badgen.com/artikel/${article}/"`));
    assert.doesNotMatch(html,/Beobachtete redaktionelle Portale/);
  }
  for(const [slug,url] of [["eu-ai-gigafactories","https://euaigf.b2badgen.com/"],["interaktivierungs-atlas","https://atlas.b2badgen.com/artikel/agentforce/"]]){
    const response=await worker.fetch(new Request(`http://localhost/portale/${slug}`),env,ctx);
    assert.equal(response.status,200);
    assert.ok((await response.text()).includes(`href="${url}"`));
  }
});

test("links taxonomy values to preselected German and English catalogue views",async()=>{
  const german=await worker.fetch(new Request("http://localhost/wissen/1675-sagepath-reply-im-gartner-market-guide-for-strategic-website-agencies-2026-gelistet",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(german.status,200);
  const de=await german.text();
  assert.match(de,/href="\/\?space=Unternehmen\+und\+Verwaltung#pilot"[^>]*>Unternehmen und Verwaltung<\/a>/);
  assert.match(de,/href="\/\?space=Unternehmen\+und\+Verwaltung&amp;challenge=Kosten\+und\+Produktivit%C3%A4t#pilot"[^>]*>Kosten und Produktivität<\/a>/);
  for(const facet of ["solution","delivery","lifecycle"]){
    assert.match(de,new RegExp(`href="/\\?space=Unternehmen\\+und\\+Verwaltung&amp;${facet}=[^"]+#pilot"[^>]*>`));
  }
  assert.match(de,/href="\/portale\/it-management-today"[^>]*>IT-Management.today<\/a>/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/1-one-view-for-all-your-engineering-data",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);
  const en=await english.text();
  assert.match(en,/href="\/en\?space=Produktion\+und\+Produkte#pilot"[^>]*>Production and products<\/a>/);
  assert.match(en,/href="\/en\?space=Produktion\+und\+Produkte&amp;challenge=Qualit%C3%A4t\+und\+Geschwindigkeit#pilot"/);
  for(const facet of ["solution","delivery","lifecycle"])assert.match(en,new RegExp(`href="/en\\?space=Produktion\\+und\\+Produkte&amp;${facet}=[^"]+#pilot"[^>]*>`));
});

test("publishes four additional observed-source portals with article backlinks",async()=>{
  const overview=await worker.fetch(new Request("http://localhost/portale",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(overview.status,200);const overviewHtml=await overview.text();
  assert.match(overviewHtml,/27 Portale und redaktionelle Quellen/);
  for(const [slug,website,articleId,count] of [
    ["telecom-handel","telecom-handel.de",620011,59],
    ["connect-professional","connect-professional.de",620010,13],
    ["energie-und-management","energie-und-management.de",620012,5],
    ["security-insider","security-insider.de",630006,23],
  ]){
    assert.match(overviewHtml,new RegExp(`href="/portale/${slug}"`));
    const detail=await worker.fetch(new Request(`http://localhost/portale/${slug}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(detail.status,200);const html=await detail.text();
    assert.match(html,new RegExp(`href="https://www\\.${website.replaceAll(".","\\.")}/`));
    assert.ok(html.replaceAll("<!-- -->","").includes(`Artikel in SmartTech (${count})`));
    assert.match(html,new RegExp(`href="/wissen/${articleId}-`));
    const english=await worker.fetch(new Request(`http://localhost/en/portals/${slug}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(english.status,200);assert.match(await english.text(),/Articles in SmartTech/);
  }
  const article=await worker.fetch(new Request("http://localhost/wissen/630006-api-sicherheitsvorfalle-kosten-deutsche-firmen-rund-470-000-euro",{headers:{accept:"text/html"}}),env,ctx);
  assert.match(await article.text(),/href="\/portale\/security-insider"[^>]*>Security-Insider<\/a>/);
});

test("renders the English catalogue with language alternates and translation disclosure",async()=>{
  const response=await worker.fetch(new Request("http://localhost/en",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(response.status,200);const html=await response.text();
  assert.match(html,/<link rel="canonical" href="https:\/\/smarttech\.b2badgen\.com\/en"\/>/);
  assert.match(html,/Open technology knowledge catalogue/);
  assert.match(html,/Translation notice:/);
  assert.match(html,/aria-label="Switch to the German version"/);
  assert.match(html,/href="\/en\/knowledge\/[^"]+"/);
  assert.match(html.replaceAll("<!-- -->",""),/55 new company profiles/);
  assert.match(html.replaceAll("<!-- -->",""),/href="\/en\/portals"[^>]*><strong[^>]*>27<\/strong> portals<\/a>/);
});

test("distinguishes machine-translated and already-English originals",async()=>{
  const translated=await worker.fetch(new Request("http://localhost/en/knowledge/42-the-evolution-of-digital-space-signage",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(translated.status,200);const translatedHtml=await translated.text();
  assert.match(translatedHtml,/This English text was translated automatically/);
  assert.match(translatedHtml,/The Evolution of Digital Space Signage/);
  assert.match(translatedHtml,/hrefLang="de-DE" href="https:\/\/smarttech\.b2badgen\.com\/wissen\/42-/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/1-one-view-for-all-your-engineering-data",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);assert.match(await english.text(),/The original source is already in English/);
});

test("serves canonical detail metadata, crawler rules and sitemap",async()=>{
  const detail=await worker.fetch(new Request("http://localhost/wissen/1-one-view-for-all-your-engineering-data",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(detail.status,200);const html=await detail.text();
  assert.match(html,/<title>One view for all your engineering data \| SmartTech<\/title>/);
  assert.match(html,/application\/ld\+json/);
  assert.match(html,/https:\/\/b2b-knowhow\.com\/assets\/20197-one-view-for-all-your-engineering-data/);
  const robotsText=await (await worker.fetch(new Request("http://localhost/robots.txt"),env,ctx)).text();
  assert.match(robotsText,/User-agent: OAI-SearchBot\nAllow: \//);
  assert.match(robotsText,/User-agent: GrokBot\nAllow: \//);
  assert.match(robotsText,/User-agent: \*\nAllow: \//);
  assert.doesNotMatch(robotsText,/^Disallow:\s*\/\s*$/m);
  assert.ok(robotsText.includes("Sitemap: https://smarttech.b2badgen.com/sitemap.xml"));
  const sitemap=await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx);
  assert.equal(sitemap.status,200);const sitemapText=await sitemap.text();
  assert.match(sitemapText,/https:\/\/smarttech\.b2badgen\.com\/wissen\/1-one-view-for-all-your-engineering-data/);
  assert.match(sitemapText,/https:\/\/smarttech\.b2badgen\.com\/anbieter\//);
  assert.match(sitemapText,/https:\/\/smarttech\.b2badgen\.com\/en\/knowledge\/1-one-view-for-all-your-engineering-data/);
  assert.match(sitemapText,/https:\/\/smarttech\.b2badgen\.com\/en\/providers\//);
  const providerPath=new URL(sitemapText.match(/<loc>(https:\/\/smarttech\.b2badgen\.com\/anbieter\/[^<]+)<\/loc>/)[1]).pathname;
  const provider=await worker.fetch(new Request(`http://localhost${providerPath}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(provider.status,200);assert.match(await provider.text(),/Normalisiertes Anbieterprofil/);
});

test("keeps the KnowBe4 Germany profile stable and complete",async()=>{
  const response=await worker.fetch(new Request("http://localhost/anbieter/knowbe4-germany-2c2g2",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(response.status,200);const html=await response.text();
  assert.match(html,/<link rel="canonical" href="https:\/\/smarttech\.b2badgen\.com\/anbieter\/knowbe4-germany-2c2g2"\/>/);
  assert.match(html,/KnowBe4 adressiert Sicherheitsrisiken/);
  assert.match(html,/KnowBe4 Deutschland/);
  assert.match(html,/KnowBe4 Germany veröffentlicht für den deutschen Markt sowohl deutsch- als auch englischsprachige Inhalte/);
  assert.match(html,/PhishER Plus klassifiziert solche Meldungen/);
  assert.match(html,/Defend eingehende E-Mail-Angriffe und Prevent Risiken ausgehender E-Mails/);
  assert.match(html,/Offizielle Produktquellen/);
  assert.match(html,/href="https:\/\/www\.knowbe4\.com\/de\/products\/ai-agent-risk-manager"/);
  assert.match(html,/href="https:\/\/www\.knowbe4\.com\/de\/products\/security-awareness-training\/pricing"/);
  assert.match(html,/NIS2 und Mitarbeitersensibilisierungen/);
  assert.match(html,/>16<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
  assert.match(html,/Kuratierte Wissensobjekte/);
  assert.match(html,/href="\/wissen\/690000-knowbe4-security-awareness-training-/);
  assert.match(html,/href="\/wissen\/690004-knowbe4-cloud-email-security-/);
  assert.doesNotMatch(html,/Noch keine kuratierten Wissensobjekte/);
  const english=await worker.fetch(new Request("http://localhost/en/providers/knowbe4-germany-2c2g2",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/PhishER Plus classifies these reports/);
  assert.match(englishHtml,/Official product sources/);
  assert.match(englishHtml,/href="https:\/\/www\.knowbe4\.com\/de\/products\/cloud-email-security"/);
  assert.match(englishHtml,/Curated knowledge items/);
  assert.match(englishHtml,/href="\/en\/knowledge\/690001-knowbe4-phisher-plus-/);
  const curated=await worker.fetch(new Request("http://localhost/wissen/690001-knowbe4-phisher-plus-gemeldete-phishing-e-mails-bearbeiten",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(curated.status,200);const curatedHtml=await curated.text();
  assert.match(curatedHtml,/Redaktionell geprüft/);
  assert.match(curatedHtml,/href="https:\/\/www\.knowbe4\.com\/de\/products\/phisher-plus"/);
  assert.match(curatedHtml,/href="\/anbieter\/knowbe4-germany-2c2g2"/);
  const legacy=await worker.fetch(new Request("http://localhost/anbieter/knowbe4-kouph",{headers:{accept:"text/html"},redirect:"manual"}),env,ctx);
  assert.equal(legacy.status,308);assert.equal(legacy.headers.get("location"),"http://localhost/anbieter/knowbe4-germany-2c2g2");
});

test("publishes the detailed G DATA profile with ten separately sourced offers",async()=>{
  const response=await worker.fetch(new Request("http://localhost/anbieter/g-data-cyberdefense-18ydv",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(response.status,200);const html=await response.text();
  assert.match(html,/<link rel="canonical" href="https:\/\/smarttech\.b2badgen\.com\/anbieter\/g-data-cyberdefense-18ydv"\/>/);
  assert.match(html,/Die G DATA CyberDefense AG aus Bochum/);
  assert.match(html,/selbst betriebenem Endpoint-Schutz, eigenem XDR-Betrieb und Managed SOC/);
  assert.match(html,/>11<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
  assert.match(html,/Kuratierte Wissensobjekte/);
  for(let id=700000;id<=700009;id++)assert.match(html,new RegExp(`href="/wissen/${id}-`));
  assert.match(html,/Beobachtete Fach- und Portalpublikationen/);
  assert.match(html,/Security Awareness-Leitfaden für CISOs/);
  assert.doesNotMatch(html,/Noch keine kuratierten Wissensobjekte/);
  const en=await worker.fetch(new Request("http://localhost/en/providers/g-data-cyberdefense-18ydv",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(en.status,200);const englishHtml=await en.text();
  assert.match(englishHtml,/G DATA CyberDefense AG, based in Bochum/);
  assert.match(englishHtml,/Curated knowledge items/);
  for(let id=700000;id<=700009;id++)assert.match(englishHtml,new RegExp(`href="/en/knowledge/${id}-`));
  const item=await worker.fetch(new Request("http://localhost/wissen/700002-g-data-managed-xdr-24-7-uberwachung-und-reaktion-aus-bochum",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(item.status,200);const itemHtml=await item.text();
  assert.match(itemHtml,/Redaktionell geprüft/);
  assert.match(itemHtml,/href="https:\/\/www\.gdata\.de\/unternehmen\/mxdr"/);
  assert.match(itemHtml,/href="\/anbieter\/g-data-cyberdefense-18ydv"/);
});

test("publishes the curated Telegärtner whitepapers with transparent form access",async()=>{
  const path="/wissen/600005-normkonforme-verkabelungen-fur-25-gigabit-ethernet";
  const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(response.status,200);const html=await response.text();
  assert.match(html,/<link rel="canonical" href="https:\/\/smarttech\.b2badgen\.com\/wissen\/600005-/);
  assert.match(html,/Normkonforme Verkabelungen für 25 Gigabit Ethernet/);
  assert.match(html,/über das offizielle Telegärtner-Formular angefordert und per E-Mail bereitgestellt/);
  assert.match(html,/https:\/\/www\.telegaertner\.com\/whitepaper/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/600005-standards-compliant-cabling-for-25-gigabit-ethernet",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/Standards-Compliant Cabling for 25 Gigabit Ethernet/);
  assert.match(englishHtml,/This English text was translated automatically/);
  const sitemapText=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  assert.match(sitemapText,/https:\/\/smarttech\.b2badgen\.com\/wissen\/600008-mptl-direct-attach-cabling-und-e2e-link/);
  const providerPath=new URL(sitemapText.match(/<loc>(https:\/\/smarttech\.b2badgen\.com\/anbieter\/telegartner-[^<]+)<\/loc>/)[1]).pathname;
  const provider=await worker.fetch(new Request(`http://localhost${providerPath}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(provider.status,200);const providerHtml=await provider.text();
  assert.match(providerHtml,/Offizielle Anbieterquelle/);
  assert.match(providerHtml,/https:\/\/www\.telegaertner\.com\//);
  assert.match(providerHtml,/>9<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
});

test("keeps M-net original content and trade-press evidence separate",async()=>{
  const provider=await worker.fetch(new Request("http://localhost/anbieter/m-net-1uvr4",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(provider.status,200);const providerHtml=await provider.text();
  assert.match(providerHtml,/M-net verbindet regionale Glasfaserinfrastruktur/);
  assert.match(providerHtml,/M-net Geschäftskunden/);
  assert.match(providerHtml,/>3<\/p><p class="text-xs text-muted-foreground">Publikationen<\/p>/);
  assert.match(providerHtml,/>3<\/p><p class="text-xs text-muted-foreground">Portale<\/p>/);
  assert.match(providerHtml,/>17<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
  assert.match(providerHtml,/Connect-LAN als dedizierte Punkt-zu-Punkt-Verbindung/);
  assert.match(providerHtml,/MPLS IP-VPN als privates Standortnetz/);
  assert.match(providerHtml,/SD-WAN für zentral gesteuerte Verbindungen/);
  assert.doesNotMatch(providerHtml,/Whitepaper_Vernetzung\.pdf/);
  assert.match(providerHtml,/Kuratierte Wissensobjekte/);
  assert.match(providerHtml,/Beobachtete Fach- und Portalpublikationen/);
  assert.match(providerHtml,/SOHO-Highspeed-Test 2026: M-net an der Spitze der Regionalanbieter/);
  assert.match(providerHtml,/M-net baut ein neues Rechenzentrum in München/);
  assert.match(providerHtml,/SWM bauen Mehrheit an M-Net weiter aus/);
  const englishProvider=await worker.fetch(new Request("http://localhost/en/providers/m-net-1uvr4",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(englishProvider.status,200);const englishProviderHtml=await englishProvider.text();
  assert.match(englishProviderHtml,/MPLS IP-VPN as a private network/);
  assert.match(englishProviderHtml,/Observed trade and portal publications/);
  assert.match(englishProviderHtml,/M-net is building a new data centre in Munich/);
  const official=await worker.fetch(new Request("http://localhost/wissen/620000-m-net-geschaftskunden-digitale-infrastruktur-aus-einer-hand",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(official.status,200);assert.match(await official.text(),/M-net Originalquelle/);
  const press=await worker.fetch(new Request("http://localhost/wissen/620010-soho-highspeed-test-2026-m-net-an-der-spitze-der-regionalanbieter",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(press.status,200);const pressHtml=await press.text();
  assert.match(pressHtml,/SOHO-Highspeed-Test 2026/);
  assert.match(pressHtml,/Beobachtet/);
  assert.match(pressHtml,/"datePublished":"2026-05-29"/);
  assert.match(pressHtml,/connect-professional\.de/);
  const channel=await worker.fetch(new Request("http://localhost/wissen/620011-m-net-baut-ein-neues-rechenzentrum-in-munchen",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(channel.status,200);const channelHtml=await channel.text();
  assert.match(channelHtml,/Telecom Handel/);
  assert.match(channelHtml,/Beobachtet/);
  assert.match(channelHtml,/"datePublished":"2026-07-20"/);
  assert.match(channelHtml,/telecom-handel\.de/);
  const ownership=await worker.fetch(new Request("http://localhost/wissen/620012-swm-bauen-mehrheit-an-m-net-weiter-aus",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(ownership.status,200);const ownershipHtml=await ownership.text();
  assert.match(ownershipHtml,/Energie &amp; Management/);
  assert.match(ownershipHtml,/76,8 Prozent/);
  assert.match(ownershipHtml,/energie-und-management\.de/);
});

test("publishes Telecom Handel as a verified observed B2B source",async()=>{
  const detail=await worker.fetch(new Request("http://localhost/wissen/640016-telekom-und-palo-alto-networks-starten-cyber-defence-managed-service",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(detail.status,200);const detailHtml=await detail.text();
  assert.match(detailHtml,/Telekom und Palo Alto Networks starten Cyber Defence Managed Service/);
  assert.match(detailHtml,/Telecom Handel/);
  assert.match(detailHtml,/Beobachtet/);
  assert.match(detailHtml,/"datePublished":"2026-06-11"/);
  assert.match(detailHtml,/telecom-handel\.de/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/640016-telekom-and-palo-alto-networks-launch-cyber-defence-managed-service",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/Telekom and Palo Alto Networks launch Cyber Defence Managed Service/);
  assert.match(englishHtml,/This English text was translated automatically/);
});

test("publishes a decision-ready Serviceware profile with 23 separated sources",async()=>{
  const provider=await worker.fetch(new Request("http://localhost/anbieter/serviceware-18pih",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(provider.status,200);const providerHtml=await provider.text();
  assert.match(providerHtml,/Serviceware verbindet Software, Beratung und Managed Services/);
  assert.match(providerHtml,/modulare Einstieg/);
  assert.match(providerHtml,/Serviceware Originalquelle/);
  assert.match(providerHtml,/Kuratierte Wissensobjekte/);
  assert.match(providerHtml,/Beobachtete Fach- und Portalpublikationen/);
  assert.match(providerHtml,/KI im ITSM: Der Survival-Guide/);
  assert.match(providerHtml,/>23<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
  const detail=await worker.fetch(new Request("http://localhost/wissen/610011-die-ki-native-serviceware-plattform-fur-digitale-service-exzellenz",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(detail.status,200);const detailHtml=await detail.text();
  assert.match(detailHtml,/Modulare Plattform als SaaS oder On-Premises/);
  assert.match(detailHtml,/Serviceware Originalquelle/);
  assert.match(detailHtml,/Kuratiert/);
  assert.doesNotMatch(detailHtml,/datePublished/);
  assert.match(detailHtml,/serviceware-se\.com\/de\/plattform/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/610011-the-ai-native-serviceware-platform-for-digital-service-excellence",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/Modular platform as SaaS or on premises/);
  assert.match(englishHtml,/This English text was translated automatically/);
});

test("publishes a decision-ready ServiceNow profile with sources separated",async()=>{
  const provider=await worker.fetch(new Request("http://localhost/anbieter/servicenow-10stu",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(provider.status,200);const providerHtml=await provider.text();
  assert.match(providerHtml,/ServiceNow verbindet KI, Daten und Workflows/);
  assert.match(providerHtml,/ServiceNow Originalquelle/);
  assert.match(providerHtml,/Kuratierte Wissensobjekte/);
  assert.match(providerHtml,/Beobachtete Fach- und Portalpublikationen/);
  assert.match(providerHtml,/3 ways to simplify selling to accelerate growth/);
  assert.match(providerHtml,/>14<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
  const detail=await worker.fetch(new Request("http://localhost/wissen/660002-ai-control-tower",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(detail.status,200);const detailHtml=await detail.text();
  assert.match(detailHtml,/Zentrale Governance für KI-Modelle, Agenten und Anwendungen/);
  assert.match(detailHtml,/ServiceNow Originalquelle/);
  assert.match(detailHtml,/Kuratiert/);
  assert.doesNotMatch(detailHtml,/datePublished/);
  assert.match(detailHtml,/servicenow\.com\/products\/ai-control-tower\.html/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/660002-ai-control-tower",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/Central governance for AI models, agents and applications/);
  assert.match(englishHtml,/The original source is already in English/);
});

test("publishes the first Telecom Handel potential-provider wave",async()=>{
  const sitemapText=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  const providers=[
    ["telefonica-deutschland",8,"Telefónica Deutschland bietet unter O2 Business"],
    ["enreach",3,"Enreach bündelt Festnetz"],
    ["peoplefone",5,"Peoplefone fokussiert IP-basierte Geschäftskommunikation"],
    ["td-synnex",6,"TD SYNNEX verbindet Technologie-Distribution"],
    ["1-und-1-versatel",3,"1&amp;1 Versatel verbindet ein eigenes deutsches Glasfasernetz"],
  ];
  for(const [slug,count,summary] of providers){
    const match=sitemapText.match(new RegExp(`<loc>(https:\\/\\/smarttech\\.b2badgen\\.com\\/anbieter\\/${slug}-[^<]+)<\\/loc>`));
    assert.ok(match,`missing provider path for ${slug}`);
    const providerPath=new URL(match[1]).pathname;
    const response=await worker.fetch(new Request(`http://localhost${providerPath}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(response.status,200);const html=await response.text();
    assert.match(html,new RegExp(summary));
    assert.match(html,/Kuratierte Wissensobjekte/);
    assert.match(html,/Beobachtete Fach- und Portalpublikationen/);
    assert.match(html,new RegExp(`>${count}<\\/p><p class="text-xs text-muted-foreground">eingeordnet<\\/p>`));
  }
  const observed=await worker.fetch(new Request("http://localhost/wissen/650011-peoplefone-erweitert-sip-infrastruktur-fur-ki-sprachsysteme",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(observed.status,200);const observedHtml=await observed.text();
  assert.match(observedHtml,/Telecom Handel/);
  assert.match(observedHtml,/Beobachtet/);
  assert.match(observedHtml,/"datePublished":"2026-07-30"/);
  const curated=await worker.fetch(new Request("http://localhost/wissen/650015-td-synnex",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(curated.status,200);const curatedHtml=await curated.text();
  assert.match(curatedHtml,/TD SYNNEX Originalquelle/);
  assert.match(curatedHtml,/Kuratiert/);
  assert.doesNotMatch(curatedHtml,/datePublished/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/650022-study-78-of-companies-would-relocate-for-faster-internet",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/Investment case for high-performance business connectivity/);
  assert.match(englishHtml,/This English text was translated automatically/);
});

test("publishes the expanded Akamai profile with original and trade-press sources separated",async()=>{
  const sitemapText=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  const providerPath=new URL(sitemapText.match(/<loc>(https:\/\/smarttech\.b2badgen\.com\/anbieter\/akamai-[^<]+)<\/loc>/)[1]).pathname;
  const provider=await worker.fetch(new Request(`http://localhost${providerPath}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(provider.status,200);const providerHtml=await provider.text();
  assert.match(providerHtml,/Akamai Technologies verbindet Cloud Computing/);
  assert.match(providerHtml,/Akamai: offizielle Produktübersicht/);
  assert.match(providerHtml,/>24<\/p><p class="text-xs text-muted-foreground">eingeordnet<\/p>/);
  const inference=await worker.fetch(new Request("http://localhost/wissen/630002-akamai-inference-cloud-ki-inferenz-naher-an-den-nutzern",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(inference.status,200);const inferenceHtml=await inference.text();
  assert.match(inferenceHtml,/NVIDIA-Blackwell-GPUs/);
  assert.match(inferenceHtml,/Akamai Originalquelle/);
  const press=await worker.fetch(new Request("http://localhost/wissen/630006-api-sicherheitsvorfalle-kosten-deutsche-firmen-rund-470-000-euro",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(press.status,200);const pressHtml=await press.text();
  assert.match(pressHtml,/Security-Insider/);
  assert.match(pressHtml,/Beobachtet/);
  assert.match(pressHtml,/"datePublished":"2026-07-14"/);
});

test("publishes the second Telecom Handel potential-provider wave",async()=>{
  const sitemapText=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  const providers=[
    ["easybell",4,"Easybell verbindet Cloud-Telefonie"],
    ["snom",4,"Snom entwickelt professionelle IP-Telefone"],
    ["nfon",3,"NFON verbindet europäische Cloud-Telefonie"],
    ["auerswald",3,"Auerswald bündelt Business-Kommunikation"],
    ["jabra",3,"Jabra adressiert professionelle Audio- und Gesprächsqualität"],
    ["r-und-s-networks-and-cybersecurity-ehemals-lancom-systems",2,"Rohde &amp; Schwarz Networks and Cybersecurity ist seit dem 1. Juli 2026"],
  ];
  for(const [slug,count,summary] of providers){
    const match=sitemapText.match(new RegExp(`<loc>(https:\\/\\/smarttech\\.b2badgen\\.com\\/anbieter\\/${slug}-[^<]+)<\\/loc>`));
    assert.ok(match,`missing provider path for ${slug}`);
    const providerPath=new URL(match[1]).pathname;
    const response=await worker.fetch(new Request(`http://localhost${providerPath}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(response.status,200);const html=await response.text();
    assert.match(html,new RegExp(summary));
    assert.match(html,/Kuratierte Wissensobjekte/);
    assert.match(html,/Beobachtete Fach- und Portalpublikationen/);
    assert.match(html,new RegExp(`>${count}<\\/p><p class="text-xs text-muted-foreground">eingeordnet<\\/p>`));
  }
  const observed=await worker.fetch(new Request("http://localhost/wissen/670002-easybell-integriert-voice-ai-von-fonio-ai",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(observed.status,200);const observedHtml=await observed.text();
  assert.match(observedHtml,/Telecom Handel/);
  assert.match(observedHtml,/Beobachtet/);
  assert.match(observedHtml,/"datePublished":"2026-02-02"/);
  const curated=await worker.fetch(new Request("http://localhost/wissen/670017-lancom-systems-heisst-nun-rohde-und-schwarz-networks-and-cybersecurity",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(curated.status,200);const curatedHtml=await curated.text();
  assert.match(curatedHtml,/R&amp;S Networks and Cybersecurity Originalquelle/);
  assert.match(curatedHtml,/Kuratiert/);
  assert.doesNotMatch(curatedHtml,/datePublished/);
  const english=await worker.fetch(new Request("http://localhost/en/knowledge/670002-easybell-integrates-voice-ai-from-fonio-ai",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);const englishHtml=await english.text();
  assert.match(englishHtml,/AI telephone assistant for automated call handling and workflows/);
  assert.match(englishHtml,/This English text was translated automatically/);
});

test("publishes LEW TelNet services while preserving the observed whitepaper",async()=>{
  const response=await worker.fetch(new Request("http://localhost/anbieter/lew-telnet-171uz",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/LEW TelNet GmbH ist der Vertragspartner/);
  assert.match(html,/Green Data Center Augsburg/);
  assert.match(html,/VEEAM Cloud Backup/);
  assert.match(html,/In 10 Schritten zur Data-Center-Strategie/);
  assert.match(html,/B2B KnowHow/);
  assert.match(html,/680006-/);
  const english=await worker.fetch(new Request("http://localhost/en/providers/lew-telnet-171uz",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(english.status,200);assert.match(await english.text(),/contractual partner for business IT services/);
  const detail=await worker.fetch(new Request("http://localhost/wissen/680003-lew-business-veeam-cloud-backup-externe-datensicherung",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(detail.status,200);const detailHtml=await detail.text();
  assert.match(detailHtml,/nicht Bestandteil des Vertrags/);assert.doesNotMatch(detailHtml,/datePublished/);
});


test("daily update preserves access status, source links and expanded bilingual profiles",async()=>{
  const daily=JSON.parse(await readFile(new URL("../app/observed-expansion-whitepapers-20260930.json",import.meta.url),"utf8"));
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  assert.equal(daily.length,5);
  for(const item of daily){
    assert.equal(item.stage,"Vorstrukturiert");
    assert.equal(item.origin,"Beobachtet");
    assert.equal(item.space,"Digitale Infrastruktur");
    assert.equal(catalog.knowledge.filter(entry=>entry.url===item.url).length,1);
    const path=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/wissen/${item.id}-[^<]+`))?.[0];
    assert.ok(path,`Missing daily knowledge page ${item.id}`);
    const html=await (await worker.fetch(new Request(path),env,ctx)).text();
    assert.ok(html.includes(item.url));
    assert.match(html,/Volltext hinter Formular oder Registrierung nicht eingesehen/);
  }
  for(const slug of ["syner-con-apro-con","die-schonbrunn-tasc","honiq","schafer-digital","charterhouse"]){
    const path=xml.match(new RegExp(`https://smarttech\\.b2badgen\\.com/anbieter/${slug}-[a-z0-9]{1,5}(?=</loc>)`))?.[0];
    assert.ok(path,`Missing expanded profile ${slug}`);
    const html=await (await worker.fetch(new Request(path),env,ctx)).text();
    assert.match(html,/Angebotsschwerpunkte/);
    assert.match(html,/Typische Fachrollen/);
    assert.doesNotMatch(html,/Fachpublikationen und Wissensobjekte im SmartTech/);
  }
});

test("IGEL profile exposes original resources, live dates and honest review status in DE and EN",async()=>{
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const company=catalog.companies.find(item=>item.name==="IGEL");
  assert.ok(company);
  const assets=catalog.knowledge.filter(item=>item.provider==="IGEL");
  assert.equal(company.knowledge.length,19);
  assert.equal(assets.filter(item=>item.format==="Whitepaper").length,3);
  assert.equal(assets.filter(item=>item.format==="Webinar").length,6);
  assert.ok(assets.every(item=>item.origin==="Beobachtet"));
  const future=assets.find(item=>item.id===760004);
  assert.equal(future.eventPeriod,"05.11.2026");
  assert.equal(future.datePublished,undefined);
  const nis2=assets.find(item=>item.id===760001);
  const detail=await worker.fetch(new Request("http://localhost/wissen/760001-nis2-neue-anforderungen-neue-risiken-sind-sie-bereit"),env,ctx);
  assert.equal(detail.status,200);
  assert.ok((await detail.text()).includes(nis2.url));
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  for(const prefix of ["anbieter","en/providers"]){
    const url=xml.match(new RegExp(`<loc>(https://smarttech\\.b2badgen\\.com/${prefix}/igel-[^<]+)</loc>`))?.[1];
    assert.ok(url);
    const response=await worker.fetch(new Request(url),env,ctx);
    assert.equal(response.status,200);
    const html=await response.text();
    for(const text of ["UMSaaS","Managed Hypervisor","Managed Containers","IGEL Preventative Endpoint Security Guide"])assert.ok(html.includes(text),`${prefix}: missing ${text}`);
    assert.ok(html.includes(prefix==="anbieter"?"Beobachtet":"Observed"));
  }
});

test("IGEL editorial additions link all three existing portals and disclose vendor authorship",async()=>{
  const articles=JSON.parse(await readFile(new URL("../app/observed-expansion-igel-editorial-20261006.json",import.meta.url),"utf8"));
  for(const item of articles){
    const slug=item.title.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").replace(/&/g," und ").toLocaleLowerCase("de-DE").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,96).replace(/-+$/g,"");
    const response=await worker.fetch(new Request(`http://localhost/wissen/${item.id}-${slug}`),env,ctx);
    assert.equal(response.status,200);
    const html=await response.text();
    assert.ok(html.includes(item.url));
    assert.ok(html.includes(item.sourcePortals[0]));
    if(item.id===770003){assert.ok(html.includes("Hersteller-Gastbeitrag"));assert.ok(html.includes("keine unabhängige Redaktionsanalyse"));}
  }
  for(const prefix of ["anbieter","en/providers"]){
    const html=await (await worker.fetch(new Request(`http://localhost/${prefix}/igel-d9icz`),env,ctx)).text();
    for(const item of articles)assert.ok(html.includes(`/${prefix==="anbieter"?"wissen":"en/knowledge"}/${item.id}-`));
  }
});

test("Skydance profile explains media buying and separates Oracle strategy from delivery",async()=>{
  for(const [path,phrases] of [
    ["/anbieter/skydance-imkpa",["Medien und Öffentlichkeit","Paramount Ads Manager","DACH","Oracle bleibt","künftiger Plattformfunktionen"]],
    ["/en/providers/skydance-imkpa",["Media and the public sphere","Paramount Ads Manager","DACH","Oracle remains","future platform capabilities"]],
  ]){
    const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(response.status,200);const html=await response.text();
    for(const phrase of phrases)assert.ok(html.includes(phrase),`${path} lacks ${phrase}`);
    assert.match(html,/https:\/\/adsmanager\.paramount\.com\//);
    assert.match(html,/https:\/\/pop\.paramount\.com\/video-requirements\//);
  }
});

test("Skydance resources retain media classification and individually reviewed dates",async()=>{
  const items=JSON.parse(await readFile(new URL("../app/expansion-skydance-20261008.json",import.meta.url),"utf8"));
  const ledger=JSON.parse(await readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8"));
  assert.equal(items.length,6);assert.equal(new Set(items.map(item=>item.url)).size,6);
  for(const item of items){assert.equal(item.space,"Medien und Öffentlichkeit");assert.equal(item.provider,"Skydance");assert.equal(item.origin,"Kuratiert");assert.ok(item.mediaArea);}
  assert.equal(items[0].datePublished,"2026-10-06");assert.equal(items[5].datePublished,"2025-12-08");assert.equal(items[2].datePublished,undefined);
  assert.deepEqual(ledger.batches.find(batch=>batch.id==="2026-10-08-skydance").assetIds,items.map(item=>item.id));
});


test("Althaller study joins the existing provider without replacing AlthallerAssist",async()=>{
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const providers=catalog.companies.filter(x=>x.name==="Althaller Communication");assert.equal(providers.length,1);
  assert.ok(providers[0].knowledge.includes(780000));assert.ok(providers[0].knowledge.includes(820000));
  const study=catalog.knowledge.find(x=>x.id===820000);assert.equal(study.space,"Medien und Öffentlichkeit");assert.equal(study.datePublished,undefined);assert.equal(study.origin,"Kuratiert");
  for(const path of ["/anbieter/althaller-communication-cioi4","/en/providers/althaller-communication-cioi4"]){
    const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);assert.equal(response.status,200);const text=await response.text();
    assert.match(text,/AlthallerAssist/);assert.match(text,/Management Summary|management summary/);assert.match(text,/B2B-Social-Media-Studie-2026_27-Management-Summary.pdf/);
  }
});

test("Althaller press references preserve editions, provenance and restricted access in both languages",async()=>{
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const items=JSON.parse(await readFile(new URL("../app/observed-expansion-althaller-editorial-20261009.json",import.meta.url),"utf8"));
  const translations=JSON.parse(await readFile(new URL("../app/english-althaller-editorial-20261009.json",import.meta.url),"utf8"));
  const {knowledgePath,englishKnowledgePath,slugify}=await import("../app/catalog-paths.ts");
  const portalPath=(name,locale)=>`${locale==="en"?"/en/portals":"/portale"}/${slugify(name)}`;
  assert.equal(items.filter(item=>item.note.includes("Studienausgabe 2026/27")).length,7);
  assert.equal(items.filter(item=>item.note.includes("Studienausgabe 2025/26")).length,2);
  assert.equal(items.find(item=>item.id===830001).datePublished,"2026-09-24");
  assert.equal(items.find(item=>item.id===830003).datePublished,"2026-09-29");
  assert.equal(items.find(item=>item.id===830004).datePublished,"2026-10-02");
  for(const item of items){
    assert.equal(catalog.knowledge.filter(entry=>entry.url===item.url).length,1);
    assert.equal(item.origin,"Beobachtet");
    assert.equal(item.provider,"Althaller Communication");
    for(const locale of ["de","en"]){
      const path=locale==="en"?englishKnowledgePath(item,translations[item.title]):knowledgePath(item);
      const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200);
      const html=(await response.text()).replaceAll("<!-- -->","").replaceAll("&amp;","&");
      assert.ok(html.includes(locale==="en"?translations[item.note]:item.note));
      const source=await worker.fetch(new Request(`http://localhost${portalPath(item.sourcePortals[0],locale)}`,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(source.status,200);
      assert.ok((await source.text()).includes(String(item.id)));
    }
  }
  assert.match(items.find(item=>item.id===830007).note,/Volltext erfordert ein Abonnement/);
  assert.match(items.find(item=>item.id===830002).note,/via PR-Journal/);
  assert.match(items.find(item=>item.id===830008).note,/Pressemitteilung/);
  assert.match(items.find(item=>item.id===830001).note,/Kooperationspartner/);
});

test("links six existing articles from the bilingual Anthropic profile without replacing their primary providers",async()=>{
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const {providerPath,englishProviderPath,knowledgePath}=await import("../app/catalog-paths.ts");
  const expected=new Map([[2583,"Tenable"],[2582,"Tenable"],[2003,"ML6"],[2413,"BeyondTrust"],[2134,"Dropbox"],[630013,"Akamai"]]);
  const company=catalog.companies.find(entry=>entry.name==="Anthropic");
  assert.deepEqual(new Set(company.knowledge),new Set(expected.keys()));
  assert.equal(catalog.knowledge.length,5139);
  assert.ok(!company.knowledge.includes(4839));
  for(const [id,primary] of expected){
    const item=catalog.knowledge.find(entry=>entry.id===id);
    assert.equal(item.provider,primary);
    assert.ok(item.additionalProviders.includes("Anthropic"));
    assert.equal(catalog.knowledge.filter(entry=>entry.id===id).length,1);
    assert.ok(catalog.companies.find(entry=>entry.name===primary).knowledge.includes(id));
  }
  const de=await worker.fetch(new Request(`http://localhost${providerPath("Anthropic")}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(de.status,200);const html=await de.text();
  for(const id of expected.keys())assert.ok(html.includes(knowledgePath(catalog.knowledge.find(entry=>entry.id===id))));
  assert.match(html,/Anthropic ist ein Unternehmen für KI-Forschung/);
  assert.match(html,/ursprünglichen Anbieter/);
  const en=await worker.fetch(new Request(`http://localhost${englishProviderPath("Anthropic")}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(en.status,200);assert.match(await en.text(),/Anthropic is an AI research and safety company/);
});

test("preserves primary attribution and one canonical article across reviewed platform relationships",async()=>{
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const patches=JSON.parse(await readFile(new URL("../app/knowledge-enrichment-platform-network-20261012.json",import.meta.url),"utf8"));
  assert.equal(catalog.knowledge.length,5139);
  assert.equal(patches.filter(p=>p.providerRelations).length,41);
  assert.equal(patches.flatMap(p=>p.providerRelations||[]).length,44);
  const shared=catalog.knowledge.find(k=>k.id===3895);
  assert.equal(shared.provider,"Reply");
  assert.deepEqual(new Set(shared.additionalProviders),new Set(["NVIDIA","Google Cloud","Amazon Web Services EMEA SARL, Niederlassung Deutschland"]));
  assert.equal(catalog.knowledge.filter(k=>k.id===3895).length,1);
  for(const patch of patches.filter(p=>p.providerRelations)){
    const item=catalog.knowledge.find(k=>k.id===patch.id);
    assert.ok(catalog.companies.find(c=>c.name===item.provider).knowledge.includes(item.id));
    for(const relation of item.providerRelations){
      assert.ok(catalog.companies.find(c=>c.name===relation.name).knowledge.includes(item.id));
      assert.equal(relation.sourceUrl,item.url);
      assert.ok(relation.context.de&&relation.context.en);
    }
  }
  const microsoft=catalog.companies.find(c=>c.name==="Microsoft");
  assert.equal(microsoft.knowledge.length,16);
  for(const id of [3593,3590,3546,760004])assert.ok(!microsoft.knowledge.includes(id));
  assert.ok(!catalog.companies.find(c=>c.name==="SAP").knowledge.includes(1037));
  assert.ok(catalog.knowledge.find(k=>k.id===3593).sourceReviewWarning);
});

test("renders six platform profiles and reciprocal article links in German and English",async()=>{
  const {providerPath,englishProviderPath,knowledgePath}=await import("../app/catalog-paths.ts");
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  for(const name of ["Microsoft","NVIDIA","Google Cloud","SAP","Amazon Web Services EMEA SARL, Niederlassung Deutschland","Cisco"]){
    for(const path of [providerPath(name),englishProviderPath(name)]){
      const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200);const html=await response.text();
      assert.ok(html.includes(name));assert.match(html,/Original|Quellen|sources|Source|Quelle/);
    }
  }
  const item=catalog.knowledge.find(k=>k.id===3895);
  const xml=await (await worker.fetch(new Request("http://localhost/sitemap.xml"),env,ctx)).text();
  const englishArticlePath=new URL(xml.match(/<loc>(https:\/\/smarttech\.b2badgen\.com\/en\/knowledge\/3895-[^<]+)<\/loc>/)[1]).pathname;
  for(const path of [knowledgePath(item),englishArticlePath]){
    const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);assert.equal(response.status,200);
    const html=await response.text();
    assert.match(html,/Unternehmensbezüge in diesem Artikel|Company relationships in this article/);
    for(const name of item.additionalProviders)assert.ok(html.includes(providerPath(name))||html.includes(englishProviderPath(name)));
  }
  const warningItem=catalog.knowledge.find(k=>k.id===3593);
  const warning=await worker.fetch(new Request(`http://localhost${knowledgePath(warningItem)}`,{headers:{accept:"text/html"}}),env,ctx);
  assert.match(await warning.text(),/Quellenkonflikts nicht mit Microsoft verknüpft/);
});
test("renders next five provider families with sourced role-specific relationships",async()=>{
  const {providerPath,englishProviderPath,knowledgePath}=await import("../app/catalog-paths.ts");
  const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
  const profiles=JSON.parse(await readFile(new URL("../app/provider-profiles-next-five-network-20261012.json",import.meta.url),"utf8"));
  const patches=JSON.parse(await readFile(new URL("../app/knowledge-enrichment-next-five-network-20261012.json",import.meta.url),"utf8"));
  assert.equal(catalog.knowledge.length,5139);assert.equal(catalog.companies.length,1345);
  assert.equal(patches.flatMap(p=>p.providerRelations||[]).length,22);
  for(const [name,profile] of Object.entries(profiles))for(const [locale,path] of [["de",providerPath(name)],["en",englishProviderPath(name)]]){
    const response=await worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),env,ctx);
    assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(profile.summary[locale]));
    for(const relation of profile.relatedProviders||[]){assert.ok(catalog.companies.some(c=>c.name===relation.name));assert.ok(html.includes(relation.sourceUrl));assert.ok(html.includes(locale==="de"?providerPath(relation.name):englishProviderPath(relation.name)));}
  }
  for(const patch of patches){const item=catalog.knowledge.find(k=>k.id===patch.id);for(const relation of patch.providerRelations||[]){assert.ok(item.additionalProviders.includes(relation.name));assert.equal(relation.sourceUrl,item.url);assert.ok(catalog.companies.find(c=>c.name===relation.name).knowledge.includes(item.id));}}
  assert.equal(catalog.knowledge.find(k=>k.id===3602).provider,"Yext");
  assert.equal(catalog.knowledge.find(k=>k.id===640021).provider,"Samsung Electronics");
  assert.equal(catalog.knowledge.find(k=>k.id===2261).provider,"all inclusive Fitness");
  for(const id of [3585,1037]){const item=catalog.knowledge.find(k=>k.id===id);assert.ok(item.sourceReviewWarning);const response=await worker.fetch(new Request(`http://localhost${knowledgePath(item)}`),env,ctx);assert.ok((await response.text()).includes(item.sourceReviewWarning.de));}
  assert.ok(!catalog.companies.find(c=>c.name==="Salesforce").knowledge.includes(3585));
  assert.ok(!catalog.companies.find(c=>c.name==="IBM").knowledge.includes(680005));
});
test("Allianz Trade exposes a sourced sector study with dated methodology and ratings",async()=>{
 const {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath}=await import("../app/catalog-paths.ts");
 const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
 const item=catalog.knowledge.find(i=>i.id===840000);
 const translations=JSON.parse(await readFile(new URL("../app/english-allianz-trade-20261013.json",import.meta.url),"utf8"));
 assert.equal(catalog.companies.filter(c=>c.name==="Allianz Trade").length,1);
 assert.equal(item.url,"https://www.allianz-trade.de/content/dam/onemarketing/aztrade/allianz-trade_de/dokumente/2026-09-branchen-risiko-atlas-allianz-trade.pdf");
 assert.equal(item.datePublished,"2026-09-07");assert.equal(item.addedAt,"2026-10-13");
 assert.equal(item.format,"Branchenstudie");assert.match(item.note,/IT Services Low/);assert.match(item.note,/70 Ländern/);assert.equal(item.additionalProviders,undefined);
 assert.match(item.sourceReviewWarning.de,/HTTP 403/);
 for(const [locale,path] of [["de",providerPath("Allianz Trade")],["en",englishProviderPath("Allianz Trade")]]){
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);
  const html=await response.text();assert.match(html,/Euler Hermes/);assert.match(html,/2026-09-branchen-risiko-atlas-allianz-trade.pdf/);assert.doesNotMatch(html,/mkt_tok|utm_campaign/);
  assert.ok(html.includes(locale==="de"?knowledgePath(item):englishKnowledgePath(item,translations[item.title])));
 }
 for(const [locale,path] of [["de",knowledgePath(item)],["en",englishKnowledgePath(item,translations[item.title])]]){
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(item.sourceReviewWarning[locale]));assert.ok(html.includes(locale==="de"?item.note:translations[item.note]));
 }
});
test("remaining-profile audit protects validated assets and exposes unresolved provider roles",async()=>{
 const audit=JSON.parse(await readFile(new URL("../app/provider-audit-remaining-20261013.json",import.meta.url),"utf8"));
 const profiles=JSON.parse(await readFile(new URL("../app/provider-profiles-remaining-20261013.json",import.meta.url),"utf8"));
 const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
 const ledger=JSON.parse(await readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8"));
 const {providerPath,englishProviderPath}=await import("../app/catalog-paths.ts");
 assert.equal(audit.length,223);assert.equal(new Set(audit.map(r=>r.name)).size,223);
 assert.equal(Object.keys(profiles).length,14);assert.equal(audit.filter(r=>r.decision==="excluded").length,24);
 const ids=new Set(ledger.batches.flatMap(b=>b.assetIds));assert.equal(ids.size,515);
 for(const row of audit.filter(r=>r.decision==="excluded")){
  assert.equal(row.sourceProbe.status,200);assert.ok(!catalog.companies.some(c=>c.name===row.name));
  for(const id of row.knowledgeIds){assert.ok(!ids.has(id));assert.ok(!catalog.knowledge.some(k=>k.id===id));}
 }
 for(const [name,profile] of Object.entries(profiles))for(const [locale,path] of [["de",providerPath(name)],["en",englishProviderPath(name)]]){
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(profile.summary[locale]));assert.ok(html.includes(profile.officialUrl));
 }
 for(const [oldName,name] of [["Adacta (PR-Agentur)","Adacta"],["CharterHouse London","Charterhouse"]])for(const path of [providerPath(oldName),englishProviderPath(oldName)]){
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,308);assert.ok(response.headers.get("location").includes(path.startsWith("/en/")?englishProviderPath(name):providerPath(name)));
 }
 for(const path of [providerPath("Chris Cross Relations"),englishProviderPath("Chris Cross Relations")]){
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);assert.match(await response.text(),/Anbieterrolle noch in Prüfung|Provider role under review/);
 }
 assert.ok(!catalog.companies.some(c=>c.name==="CharterHouse London"));assert.ok(catalog.companies.find(c=>c.name==="Charterhouse").knowledge.includes(2206));
});

test("ALSO and Trenkwalder preserve sourced event scope and bilingual canonical links",async()=>{
 const {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath}=await import("../app/catalog-paths.ts");
 const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
 const profiles=JSON.parse(await readFile(new URL("../app/provider-profiles-also-trenkwalder-20261013.json",import.meta.url),"utf8"));
 const translations=JSON.parse(await readFile(new URL("../app/english-also-trenkwalder-20261013.json",import.meta.url),"utf8"));
 const items=catalog.knowledge.filter(i=>i.id>=850000&&i.id<=850020);
 const ledger=JSON.parse(await readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8"));
 const validated=new Set(ledger.batches.flatMap(b=>b.assetIds));
 assert.equal(items.length,21);assert.equal(new Set(items.map(i=>i.url)).size,21);
 assert.equal(items.filter(i=>validated.has(i.id)).length,18);
 for(const name of ["ALSO","Trenkwalder"]){
  assert.equal(catalog.companies.filter(c=>c.name===name).length,1);
  const other=name==="ALSO"?"Trenkwalder":"ALSO";
  for(const [locale,path] of [["de",providerPath(name)],["en",englishProviderPath(name)]]){
   const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);
   const html=await response.text();assert.ok(html.includes(profiles[name].summary[locale]));
   assert.ok(html.includes(locale==="de"?providerPath(other):englishProviderPath(other)));
   for(const id of [850018,850019]){const item=items.find(i=>i.id===id);assert.ok(catalog.companies.find(c=>c.name===name).knowledge.includes(id));assert.ok(html.includes(locale==="de"?knowledgePath(item):englishKnowledgePath(item,translations[item.title])));}
  }
 }
 for(const item of items){
  assert.ok(translations[item.title]&&translations[item.note]&&translations[item.delivery]);
  for(const [locale,path] of [["de",knowledgePath(item)],["en",englishKnowledgePath(item,translations[item.title])]]){
   const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);
   const html=await response.text();assert.ok(html.includes(item.url));assert.ok(html.includes(locale==="de"?item.note:translations[item.note]));
   if(item.sourceReviewWarning)assert.ok(html.includes(item.sourceReviewWarning[locale]));
   for(const name of item.additionalProviders||[])assert.ok(html.includes(locale==="de"?providerPath(name):englishProviderPath(name)));
  }
  if(item.origin==="Beobachtet")assert.equal(validated.has(item.id),false);
 }
 const old=items.find(i=>i.id===850018),undated=items.find(i=>i.id===850019),hpe=items.find(i=>i.id===850004);
 assert.equal(old.datePublished,"2020-03-24");assert.equal(old.eventPeriod,"2020-03-27");assert.equal(undated.datePublished,undefined);
 assert.equal(hpe.provider,"ALSO");assert.ok(hpe.additionalProviders.includes("Hewlett Packard Enterprise"));assert.match(hpe.sourceReviewWarning.de,/01\.11\.2026/);
 assert.ok(!catalog.companies.some(c=>c.name==="Huntress"||c.name==="Droege Group"));
});

test("five requested domains resolve to distinct bilingual provider offerings with dated event limits",async()=>{
 const {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath}=await import("../app/catalog-paths.ts");
 const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
 const profiles=JSON.parse(await readFile(new URL("../app/provider-profiles-five-20261019.json",import.meta.url),"utf8"));
 const translations=JSON.parse(await readFile(new URL("../app/english-five-providers-20261019.json",import.meta.url),"utf8"));
 const ledger=JSON.parse(await readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8"));const validated=new Set(ledger.batches.flatMap(b=>b.assetIds));
 const items=catalog.knowledge.filter(i=>i.id>=860000&&i.id<=860012);
 assert.equal(items.length,13);assert.equal(items.filter(i=>validated.has(i.id)).length,12);
 for(const [name,domain] of [["heylogin","heylogin.com"],["Phoenix Contact","phoenixcontact.de"],["VZM","vzm.de"],["DIKITALE","dikitale.de"],["ITMS","itms.com"]]){
  const matches=catalog.companies.filter(c=>c.name===name);assert.equal(matches.length,1);const company=matches[0];assert.ok(company.variants.includes(domain));
  for(const [locale,path] of [["de",providerPath(name)],["en",englishProviderPath(name)]]){
   const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();
   assert.ok(html.includes(profiles[name].summary[locale]));assert.ok(html.includes(profiles[name].officialUrl));
   for(const item of items.filter(i=>i.provider===name)){assert.ok(company.knowledge.includes(item.id));assert.ok(html.includes(locale==="de"?knowledgePath(item):englishKnowledgePath(item,translations[item.title])));}
  }
 }
 for(const item of items)for(const [locale,path] of [["de",knowledgePath(item)],["en",englishKnowledgePath(item,translations[item.title])]]){
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(item.url));assert.ok(html.includes(locale==="de"?item.note:translations[item.note]));
  if(item.sourceReviewWarning)assert.ok(html.includes(item.sourceReviewWarning[locale]));
 }
 const event=items.find(i=>i.provider==="DIKITALE");assert.equal(event.origin,"Beobachtet");assert.equal(validated.has(event.id),false);assert.equal(event.datePublished,undefined);assert.equal(event.eventPeriod,"2027-06-16/2027-06-17");assert.match(event.sourceReviewWarning.de,/Zukünftige Veranstaltung/);
 for(const item of items.filter(i=>i.provider==="ITMS")){assert.equal(item.space,"Medien und Öffentlichkeit");assert.equal(item.additionalProviders,undefined);}
 assert.equal(items.find(i=>i.id===860008).space,"Digitale Infrastruktur");assert.equal(items.find(i=>i.id===860007).space,"Gebäude und Standorte");assert.equal(items.find(i=>i.id===860005).space,"Produktion und Produkte");
 assert.equal(items.find(i=>i.id===860011).datePublished,"2026-04-27");
});

test("MEDIENHAUS.de and Tradedoubler expose their own bilingual media services with fee limits",async()=>{
 const {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath}=await import("../app/catalog-paths.ts");
 const catalog=JSON.parse(await readFile(new URL("../app/catalog.generated.json",import.meta.url),"utf8"));
 const profiles=JSON.parse(await readFile(new URL("../app/provider-profiles-media-performance-20261019.json",import.meta.url),"utf8"));
 const tr=JSON.parse(await readFile(new URL("../app/english-media-performance-20261019.json",import.meta.url),"utf8"));
 const ledger=JSON.parse(await readFile(new URL("../app/validation-ledger.json",import.meta.url),"utf8"));const validated=new Set(ledger.batches.flatMap(b=>b.assetIds));
 const items=catalog.knowledge.filter(i=>i.id>=870000&&i.id<=870006);assert.equal(items.length,7);assert.equal(new Set(items.map(i=>i.url)).size,7);
 for(const [name,domain] of [["MEDIENHAUS.de","medienhaus.de"],["Tradedoubler","tradedoubler.com"]]){
  const matches=catalog.companies.filter(c=>c.name===name);assert.equal(matches.length,1);const company=matches[0];assert.ok(company.variants.includes(domain));
  for(const [locale,path] of [["de",providerPath(name)],["en",englishProviderPath(name)]]){
   const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(profiles[name].summary[locale]));
   for(const item of items.filter(i=>i.provider===name)){assert.ok(company.knowledge.includes(item.id));assert.ok(html.includes(locale==="de"?knowledgePath(item):englishKnowledgePath(item,tr[item.title])));}
  }
 }
 for(const item of items){
  assert.ok(validated.has(item.id));assert.equal(item.datePublished,undefined);assert.equal(item.space,"Medien und Öffentlichkeit");assert.equal(item.additionalProviders,undefined);
  for(const [locale,path] of [["de",knowledgePath(item)],["en",englishKnowledgePath(item,tr[item.title])]]){
   const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(item.url));assert.ok(html.includes(locale==="de"?item.note:tr[item.note]));if(item.sourceReviewWarning)assert.ok(html.includes(item.sourceReviewWarning[locale]));
  }
 }
 assert.ok(profiles['MEDIENHAUS.de'].aliases.includes('Medienhaus.de GmbH'));assert.match(profiles['MEDIENHAUS.de'].summary.de,/Kassel/);
 const grow=items.find(i=>i.url.endsWith('/grow'));assert.match(grow.sourceReviewWarning.de,/monatliche Plattformgebühren/);assert.ok(!items.some(i=>i.url.includes('#')));
});

test("IT sitemap refresh preserves review boundaries, old identities and explicit relationships",async()=>{
 const load=async p=>JSON.parse(await readFile(new URL(`../${p}`,import.meta.url),"utf8"));
 const catalog=await load("app/catalog.generated.json"),items=await load("app/expansion-it-refresh-20261019.json"),audit=await load("public/data/source-review/it-refresh-20261019.audit.json"),ledger=await load("app/validation-ledger.json");
 assert.equal(items.length,73);assert.equal(items.filter(i=>i.origin==="Beobachtet").length,68);
 const batch=ledger.batches.find(b=>b.id==="2026-10-19-it-refresh");assert.deepEqual(batch.assetIds,[880068,880069,880070,880071,880072]);
 const validated=new Set(ledger.batches.flatMap(b=>b.assetIds));
 const urls=new Set();
 for(const i of items){
  assert.ok(!urls.has(i.url));urls.add(i.url);assert.ok(catalog.knowledge.some(k=>k.id===i.id));
  assert.equal(validated.has(i.id),i.origin==="Kuratiert");assert.equal(i.addedAt,"2026-10-19");
  assert.ok(!i.datePublished||i.datePublished<="2026-10-19");
  assert.equal(catalog.knowledge.filter(k=>k.url.replace(/\/$/,"")===i.url.replace(/\/$/,"")).length,1);
  for(const rel of i.providerRelations||[]){assert.equal(rel.sourceUrl,i.url);assert.ok(catalog.companies.find(c=>c.name===rel.name)?.knowledge.includes(i.id));}
 }
 assert.equal(audit.portalsScanned,17);assert.equal(audit.childSitemapRequests,389);assert.equal(audit.selectedPublicPagesFetched,152);
 for(const name of ["WEKA Downloads","Foundry Webcast"]){const source=audit.coverage.find(s=>s.source===name);assert.match(source.statusNote,/unresolved/);assert.equal(source.selectedNewKnowledge,0);}
 const sophos=catalog.knowledge.find(i=>i.id===4784);assert.equal(sophos.datePublished,"2026-09-10");assert.equal(sophos.eventPeriod,"2026-10-22");assert.equal(sophos.origin,"Beobachtet");assert.ok(!items.some(i=>i.id===4784));assert.equal(validated.has(4784),false);
 assert.equal(items.find(i=>i.id===880003).provider,"Septeo CNEE");assert.equal(items.find(i=>i.id===880060).provider,"HP Deutschland");
 assert.ok(!catalog.companies.some(c=>c.name==="Amberlo"));
});

test("refreshed IT profiles and all new resources render equivalent DE and EN source links",async()=>{
 const {providerPath,englishProviderPath,knowledgePath,englishKnowledgePath}=await import("../app/catalog-paths.ts");
 const load=async p=>JSON.parse(await readFile(new URL(`../app/${p}`,import.meta.url),"utf8"));
 const profiles=await load("provider-profiles-it-refresh-20261019.json"),items=await load("expansion-it-refresh-20261019.json"),tr=await load("english-it-refresh-20261019.json");
 const escaped=s=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
 assert.equal(Object.keys(profiles).length,15);
 for(const [name,p] of Object.entries(profiles))for(const [locale,path] of [["de",providerPath(name)],["en",englishProviderPath(name)]]){
  assert.ok(p.summary[locale].split(/\s+/).length>=75,`${name}: substantive ${locale} profile`);
  const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();
  assert.ok(html.includes(escaped(p.summary[locale])),`${name}: ${locale} profile text`);assert.ok(html.includes(p.officialUrl));
  for(const source of p.officialSources)assert.ok(html.includes(escaped(source.url)));
 }
 assert.match(profiles.Pendo.summary.de,/offener Beta/);assert.match(profiles.Veeam.summary.en,/add-on/);assert.match(profiles.Hyland.summary.en,/announced/);
 for(const i of items){
  for(const field of ["title","note","solution","delivery","lifecycle","format"])assert.ok(tr[i[field]],`${i.id}: translated ${field}`);
  for(const [locale,path] of [["de",knowledgePath(i)],["en",englishKnowledgePath(i,tr[i.title])]]){
   const response=await worker.fetch(new Request(`http://localhost${path}`),env,ctx);assert.equal(response.status,200);const html=await response.text();
   assert.ok(html.includes(escaped(i.url)),`${i.id}: source link`);assert.ok(html.includes(escaped(locale==="de"?i.note:tr[i.note])),`${i.id}: ${locale} note`);
   if(i.sourceReviewWarning)assert.ok(html.includes(escaped(i.sourceReviewWarning[locale])));
  }
 }
});

test("homepage immediately shows latest providers and knowledge without switching tabs",async()=>{
 const weekly=JSON.parse(await readFile(new URL("../app/weekly-update.generated.json",import.meta.url),"utf8"));
 const newest=["Barracuda Networks","Commvault","NetKnights","Arista Networks","Omnissa"];
 assert.deepEqual(weekly.providers.slice(0,5).map(p=>p.name),newest);
 for(let i=1;i<weekly.providers.length;i++)assert.ok(weekly.providers[i-1].date>=weekly.providers[i].date);
 for(const locale of ["de","en"]){
  const response=await worker.fetch(new Request(`http://localhost/${locale==="en"?"en":""}`),env,ctx);assert.equal(response.status,200);
  const html=(await response.text()).replaceAll("<!-- -->","");
  const providers=html.match(/<section aria-labelledby="new-providers-title"[\s\S]*?<\/section>/)?.[0];
  const knowledge=html.match(/<section aria-labelledby="new-knowledge-title"[\s\S]*?<\/section>/)?.[0];
  assert.ok(providers&&knowledge,"both update sections render on initial page load");
  for(const section of [providers,knowledge])assert.doesNotMatch(section,/role="tabpanel"|<section[^>]*(?:aria-hidden="true"|\shidden(?:[\s=>]))/);
  for(const name of newest)assert.ok(providers.includes(name),`${locale}: ${name} visible in initial provider cards`);
  assert.equal((knowledge.match(/<article\b/g)||[]).length,9);
  assert.match(knowledge,/880072-/);assert.match(knowledge,/880071-/);
  assert.ok(providers.indexOf("Barracuda Networks")<providers.indexOf("Commvault"));
  assert.match(providers,locale==="de"?/Alle 55 neuen Unternehmensprofile anzeigen/:/Show all 55 new company profiles/);
  assert.match(knowledge,locale==="de"?/Alle 453 neuen Wissensobjekte anzeigen/:/Show all 453 new knowledge items/);
 }
});
