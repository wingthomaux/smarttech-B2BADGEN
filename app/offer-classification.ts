import {editorialOverrides} from "./editorial-overrides";
import {siliconEditorialOverrides} from "./silicon-editorial-overrides";
import {providerSources} from "./provider-sources";
import {validationForKnowledge} from "./validation-status";
import {publicationAttribution,publicationProvider} from "./publication-attribution";

export type SourcePublication={id:number;c:string;d:string;t:string;u:string;p:string[];r:string;s:string;f?:string};
export type ScaledOffer={id:number;title:string;provider:string;space:string;related?:string[];challenge:string;solution:string;delivery:string;lifecycle:string;origin:"Beobachtet";format:string;url:string;note:string;score:number;stage:"Vorstrukturiert"|"Priorisiert 0.2"|"Automatisch zugeordnet"|"Redaktionell geprüft";sourcePortals:string[];providerUrl?:string;languageVariantOf?:string};
type SelectionOptions={minScore?:number;maxPerSpace?:number;maxPerProvider?:number;maxB2BKnowHow?:number;maxPerOtherPortal?:number;stage?:"Vorstrukturiert"|"Priorisiert 0.2";enrichProviderSources?:boolean};

type Rule={space:string;terms:string[];solution:string;delivery:string;lifecycle:string};

const rules:Rule[]=[
  {space:"Space",terms:["satellit","satellite","space ","raumfahrt","orbit","launch vehicle","rakete"],solution:"Raumfahrt- und Satellitenlösung",delivery:"Technisches System, Software oder Service",lifecycle:"Missionsplanung bis Betrieb"},
  {space:"Gesundheit und Life Sciences",terms:["digital health","gesundheitsdaten","medizinische ki","medical ai","medizintechnik","medical device","klinikinfrastruktur","hospital it","pharma software","patientendaten","diagnostikplattform"],solution:"Digitale Gesundheits- oder Life-Sciences-Lösung",delivery:"Software, Plattform oder Integration",lifecycle:"Einführung und Versorgung"},
  {space:"Produktion und Produkte",terms:["produktion","fertigung","manufactur","maschine","robot","digital twin","digitaler zwilling","plm","cad","engineering data","systems engineering","industrie 4.0","automatisierung"],solution:"Produktions-, Engineering- oder Automatisierungslösung",delivery:"Software, technisches System oder Integration",lifecycle:"Entwicklung bis Betrieb"},
  {space:"Mobilität und Logistik",terms:["logistik","logistics","supply chain","lieferkette","fuhrpark","fleet","mobilität","mobility","fahrzeug","vehicle","warehouse","lager"],solution:"Mobilitäts-, Logistik- oder Supply-Chain-Lösung",delivery:"Softwareplattform, System oder Service",lifecycle:"Planung und Betrieb"},
  {space:"Gebäude und Standorte",terms:["gebäude","smart building","building management","building automation","facility management","zutritt","access control","digital workplace","campus","gebäudetechnik"],solution:"Gebäude-, Standort- oder Arbeitsplatzlösung",delivery:"Software, technische Systeme und Integration",lifecycle:"Planung, Einführung und Betrieb"},
  {space:"Energie und Versorgung",terms:["energie","energy","strom","power grid","stromnetz","utility","utilities","wassermanagement","wasserwirtschaft","wärme","heat pump","energiespeicher","dekarbon"],solution:"Energie- oder Versorgungslösung",delivery:"Technisches System, Software oder Service",lifecycle:"Planung bis Betrieb"},
  {space:"Natur, Landwirtschaft und Ressourcen",terms:["agrartechnik","agritech","precision farming","smart farming","forsttechnik","forest technology","rohstoffplattform","resource management software","recyclingtechnologie","kreislaufwirtschaft","wasserwirtschaft","biodiversitätsdaten"],solution:"Ressourcen-, Agrar- oder Kreislauflösung",delivery:"Technologie, Plattform oder Service",lifecycle:"Planung, Nutzung und Wiederverwertung"},
  {space:"Handel und Konsum",terms:["einzelhandel","retail","e-commerce","ecommerce","commerce","produktdaten","pim","customer experience","kundenservice","consumer"],solution:"Handels-, Produktdaten- oder Kundenerlebnislösung",delivery:"Softwareplattform oder Service",lifecycle:"Einführung, Vermarktung und Betrieb"},
  {space:"Bildung und Forschung",terms:["edtech","digital learning","e-learning","learning platform","ki in der bildung","ai in education","forschungsplattform","research platform","hochschul-it","university it"],solution:"Bildungs-, Lern- oder Forschungslösung",delivery:"Plattform, Software oder Service",lifecycle:"Aufbau und laufende Nutzung"},
  {space:"Unternehmen und Verwaltung",terms:["crm","erp","human resources","personalwesen","recruit","finanz","finance","procurement","beschaffung","compliance","dokumentenmanagement","dms","marketing","vertrieb","sales","collaboration","geschäftsprozess"],solution:"Unternehmens- oder Verwaltungssoftware",delivery:"Softwareplattform und Integration",lifecycle:"Auswahl, Einführung und Betrieb"},
  {space:"Digitale Infrastruktur",terms:["cyber","security","sicherheit","zero trust","ransomware","firewall","siem","identity","identität","passwort","datacenter","data center","rechenzentrum","cloud","netzwerk","network","storage","server","backup","datenplattform","data platform","künstliche intelligenz"," artificial intelligence"," ai ","ki-","ki ","machine learning","software"],solution:"IT-, Daten-, KI- oder Sicherheitslösung",delivery:"Software, Infrastruktur oder Managed Service",lifecycle:"Einführung und Betrieb"},
];

// The broad rules above identify products for the selected offers. For the
// remaining source items, use explicit subject signals before the generic
// company/administration fallback. A vendor name alone is not evidence that
// every publication from that vendor belongs to its usual product category.
const subjectRules:{pattern:RegExp;rule:Rule}[]=[
  {pattern:/\b(?:satellite|spacecraft|orbit(?:al)?|raumfahrt|stratosphärenplattform)\b/i,rule:rules[0]},
  {pattern:/\b(?:krankenhaus|kliniken?|patient(?:en)?|medizin(?:isch)?|healthcare|gesundheitswesen|pharma|therapie|pflegedienst(?:e)?)\b/i,rule:rules[1]},
  {pattern:/\b(?:industrial data|industrial sensor|battery machine building|batteriesystem(?:e)?|automotive elektronik|automobil-elektronik|autosar|petrochemicals|wasserstoffproduzent(?:en)?|hydrogen producer(?:s)?|fertigungsanlage|produktionsanlage|maschinenbau|anlagenbau|robotik|roboter|simulation|kunststofftechnik|ultraschalltechnik|inline markieren)\b/i,rule:rules[2]},
  {pattern:/\b(?:fuhrpark|flotte(?:n)?|bauflotte|fleet|fahrzeug(?:e|daten)?|vehicle|logistik|logistics|lieferkette(?:n)?|supply chain|telematik|fahrersicherheit|driver safety|distracted driving|on-road accidents|behind the wheel|elektro-lkw|verkehrstechnik|freight forwarding)\b/i,rule:rules[3]},
  {pattern:/\b(?:immobilien(?:bestände|verwaltung|makler|verkauf|transaktionen)?|liegenschaften|gebäudemanagement|bauprojekt(?:e)?|baustelle(?:n|neinrichtung)?|haustechnik|mauerwerkstrocknung|hotelräume|smart building)\b/i,rule:rules[4]},
  {pattern:/\b(?:energieversorger|energiewende|photovoltaik|windkraft|stromversorgung|energienetz|stromnetz|wärmepumpe|heizung|solarenergie|laserfusion|wasserstoffproduktion)\b/i,rule:rules[5]},
  {pattern:/\b(?:landwirtschaft|agrar(?:wirtschaft|technik)?|ackerbau|ernte|farming|forstwirtschaft|recycling|kreislaufwirtschaft|biodiversität|streuobstwiese(?:n)?)\b/i,rule:rules[6]},
  {pattern:/\b(?:retail|onlinehandel|einzelhandel|e-commerce|ecommerce|b2b-handel|online-shop|supermarkt|point of sale|shopping|marktplatz|ladengeschäft)\b/i,rule:rules[7]},
  {pattern:/\b(?:schule(?:n)?|hochschule(?:n)?|universität(?:en)?|unterricht|lehrkräfte|studierende|lernplattform|fernlehrgang|berufsausbildung)\b/i,rule:rules[8]},
  {pattern:/\b(?:wi-fi|wlan|sase|sd-wan|endpoint|observability|opentelemetry|kubernetes|containerisierung|virtualisier(?:ung|en)|virtualization|betriebssystem|linux|rhel|database|data protection|data sovereignty|data resilience|data trust|data lakehouse|data engineering|data governance|data fabric|it-infrastruktur|it infrastructure|it automation|it-automatisierung|it operations|itops|it-betrieb|it efficiency|it complexity|it-asset|it-support|it monitoring|ki-infrastruktur|ai-ready infrastructure|post-quantum cryptography|quantencomput(?:er|ing)|dspm|threat hunt(?:ing|er)|malware|ciso|rechenzentrum|rechenzentren|netzwerksicherheit|network security|m365|powerstore|powervault|5g core|datenspeicherung|open source|software-support|pc hardware|box-pcs|copilot\+-pcs|dell pcs)\b/i,rule:rules[10]},
];

function subjectRule(title:string){
  if(/\b(?:SSE|OS)\b/.test(title))return rules[10];
  const match=subjectRules.find(entry=>entry.pattern.test(title))?.rule;
  // A passing mention of an audience in an award or compliance notice does
  // not turn that announcement into a sector-specific solution.
  if(match?.space==='Bildung und Forschung'&&/\b(?:preis|geehrt|kampagne)\b/i.test(title))return undefined;
  if(match?.space==='Gebäude und Standorte'&&/\b(?:gwg|bußgelder)\b/i.test(title))return undefined;
  return match;
}

const portalWeight:Record<string,number>={"B2B KnowHow":30,"heise Business Services":27,"Whitepaper CIO.de":27,"Whitepaper Silicon.de":27,"WEKA Downloads":27,"Foundry Webcast":27,"B2B Expertise":23,"IT-Management.today":18,"Businessleader.today":13,"Personalleiter.today":11,"Marketingleiter.today":11,"Produktionsleiter.today":11};

function challengeFor(text:string){
  if(/cyber|security|sicherheit|zero trust|ransomware|risiko|resilien|backup|angriff|schutz/.test(text))return "Sicherheit und Resilienz";
  if(/compliance|regulier|governance|transparen|audit|gesetz|dsgvo|reporting/.test(text))return "Regulierung und Transparenz";
  if(/personal|human resources|recruit|fachkräft|skill|lernen|training|mitarbeiter/.test(text))return "Personal und Fähigkeiten";
  if(/nachhalt|energieeffiz|ressource|recycling|dekarbon|co2|klima/.test(text))return "Nachhaltigkeit und Ressourcen";
  if(/marketing|vertrieb|sales|umsatz|wachstum|kunde|customer|commerce/.test(text))return "Umsatz und Wachstum";
  if(/qualität|quality|schnell|speed|time.to.market|automatis|beschleunig|optimier/.test(text))return "Qualität und Geschwindigkeit";
  return "Kosten und Produktivität";
}

export function classifyOffers(data:SourcePublication[],excludedUrls:Set<string>,limit=100,options:SelectionOptions={}){
  const minScore=options.minScore??58;
  const frequency=new Map<string,number>();
  data.forEach(item=>frequency.set(publicationProvider(item),(frequency.get(publicationProvider(item))||0)+1));
  const candidates=data.flatMap(item=>{
    if(excludedUrls.has(item.u))return [];
    const text=` ${item.t.toLocaleLowerCase("de")} `;
    if(/übernahme|akquisition|ausgezeichnet|award|jubiläum|personalie|ernennt|ceos fordern|\bexpo\b/.test(text))return [];
    const rule=rules.find(entry=>entry.terms.some(term=>text.includes(term)));
    if(!rule)return [];
    const matches=rule.terms.filter(term=>text.includes(term)).length;
    const source=Math.max(...item.p.map(portal=>portalWeight[portal]||8));
    const certainty=item.s==="Hoch"?35:item.s==="Mittel"?20:5;
    const activity=Math.min(15,Math.round(Math.log2((frequency.get(publicationProvider(item))||1)+1)*3));
    const score=Math.min(100,certainty+source+Math.min(18,matches*6)+activity);
    if(score<minScore)return [];
    const editorial=editorialOverrides[item.u]||siliconEditorialOverrides[item.u];
    const validation=validationForKnowledge(1000+item.id);
    const attribution=publicationAttribution(item);
    const provider=editorial?.provider||attribution.provider;
    const providerSource=options.enrichProviderSources?providerSources[provider]:undefined;
    const viaNote=attribution.via?` Vermittelt via ${attribution.via}.`:"";
    return [{id:1000+item.id,title:editorial?.title||item.t,provider,space:editorial?.space||rule.space,related:editorial?.related,challenge:editorial?.challenge||challengeFor(text),solution:editorial?.solution||rule.solution,delivery:editorial?.delivery||rule.delivery,lifecycle:editorial?.lifecycle||rule.lifecycle,origin:"Beobachtet" as const,format:editorial?.format||item.f||"Informationsangebot",url:item.u,note:(editorial?.note||(validation?`Originalquelle, Metadaten, Anbieterfamilie und SmartTech-Einordnung wurden am ${validation.reviewedAt} redaktionell geprüft.`:(providerSource?`Automatisch aus Titel, Quelle und Anbieterprofil der SmartTech-Struktur zugeordnet. Offizielle Anbieterquelle: ${providerSource.label}. Die redaktionelle Qualitätssicherung steht noch aus.`:`Vorstrukturiert aus dem beobachteten Quellenbestand. Priorität ${score}/100 aus Zuordnungssicherheit, Quellenqualität, Anbieteraktivität und eindeutigen Titelsignalen; redaktionelle Freigabe steht aus.`)))+viaNote,score,stage:editorial||validation?"Redaktionell geprüft" as const:(providerSource?"Automatisch zugeordnet" as const:(options.stage||"Vorstrukturiert")),sourcePortals:item.p,providerUrl:editorial?.providerUrl||providerSource?.url,languageVariantOf:editorial?.languageVariantOf}];
  }).sort((a,b)=>b.score-a.score||b.id-a.id);
  const selected:ScaledOffer[]=[];
  const perSpace=new Map<string,number>();
  const perProvider=new Map<string,number>();
  const perPortal=new Map<string,number>();
  const selectedKeys=new Set<string>();
  const portalLimit=(portal:string)=>portal==="B2B KnowHow"?(options.maxB2BKnowHow??59):(options.maxPerOtherPortal??23);
  for(const item of candidates){
    if((perSpace.get(item.space)||0)>=(options.maxPerSpace??17))continue;
    if((perProvider.get(item.provider)||0)>=(options.maxPerProvider??7))continue;
    const key=`${item.provider}|${item.title}`.toLocaleLowerCase("de").replace(/[^a-z0-9äöüß]+/g," ").trim();if(selectedKeys.has(key))continue;
    const source=item.sourcePortals[0]||"Andere";if((perPortal.get(source)||0)>=portalLimit(source))continue;
    selected.push(item);selectedKeys.add(key);perSpace.set(item.space,(perSpace.get(item.space)||0)+1);perProvider.set(item.provider,(perProvider.get(item.provider)||0)+1);perPortal.set(source,(perPortal.get(source)||0)+1);
    if(selected.length===limit)return selected;
  }
  for(const item of candidates){const key=`${item.provider}|${item.title}`.toLocaleLowerCase("de").replace(/[^a-z0-9äöüß]+/g," ").trim();const source=item.sourcePortals[0]||"Andere";if(selectedKeys.has(key)||(perProvider.get(item.provider)||0)>=(options.maxPerProvider??7)||(perPortal.get(source)||0)>=portalLimit(source))continue;selected.push(item);selectedKeys.add(key);perProvider.set(item.provider,(perProvider.get(item.provider)||0)+1);perPortal.set(source,(perPortal.get(source)||0)+1);if(selected.length===limit)break}
  return selected;
}

export function classifyHighPriorityOffers(data:SourcePublication[],excludedUrls:Set<string>,limit=279){
  return classifyOffers(data,excludedUrls,limit,{minScore:80,maxPerSpace:5000,maxPerProvider:5000,maxB2BKnowHow:5000,maxPerOtherPortal:5000,stage:"Priorisiert 0.2",enrichProviderSources:true});
}

export function classifyAllRemainingOffers(data:SourcePublication[],excludedUrls:Set<string>){
  const fallback:Rule={space:"Unternehmen und Verwaltung",terms:[],solution:"Technologie- oder Unternehmenslösung",delivery:"Produkt, Software oder Service",lifecycle:"Bewertung, Einführung und Betrieb"};
  const frequency=new Map<string,number>();
  data.forEach(item=>frequency.set(publicationProvider(item),(frequency.get(publicationProvider(item))||0)+1));
  return data.filter(item=>!excludedUrls.has(item.u)).map(item=>{
    const text=` ${item.t.toLocaleLowerCase("de")} `;
    const broadRule=rules.find(entry=>entry.terms.some(term=>text.includes(term)));
    const rule=(broadRule&&broadRule.space!=='Unternehmen und Verwaltung'?broadRule:subjectRule(item.t)||broadRule)||fallback;
    const matches=rule.terms.filter(term=>text.includes(term)).length;
    const source=Math.max(...item.p.map(portal=>portalWeight[portal]||8));
    const certainty=item.s==="Hoch"?35:item.s==="Mittel"?20:5;
    const activity=Math.min(15,Math.round(Math.log2((frequency.get(publicationProvider(item))||1)+1)*3));
    const score=Math.min(100,certainty+source+Math.min(18,matches*6)+activity);
    const editorial=editorialOverrides[item.u]||siliconEditorialOverrides[item.u];
    const validation=validationForKnowledge(1000+item.id);
    const attribution=publicationAttribution(item);
    const provider=editorial?.provider||attribution.provider;
    const providerSource=providerSources[provider];
    const viaNote=attribution.via?` Vermittelt via ${attribution.via}.`:"";
    return {id:1000+item.id,title:editorial?.title||item.t,provider,space:editorial?.space||rule.space,related:editorial?.related,challenge:editorial?.challenge||challengeFor(text),solution:editorial?.solution||rule.solution,delivery:editorial?.delivery||rule.delivery,lifecycle:editorial?.lifecycle||rule.lifecycle,origin:"Beobachtet" as const,format:editorial?.format||item.f||"Informationsangebot",url:item.u,note:(editorial?.note||(validation?`Originalquelle, Metadaten, Anbieterfamilie und SmartTech-Einordnung wurden am ${validation.reviewedAt} redaktionell geprüft.`:`Automatisch aus Titel, Quelle, Anbieterfamilie und SmartTech-Taxonomie zugeordnet${providerSource?`; offizielle Anbieterquelle: ${providerSource.label}`:""}. Die redaktionelle Qualitätssicherung steht noch aus.`))+viaNote,score,stage:editorial||validation?"Redaktionell geprüft" as const:"Automatisch zugeordnet" as const,sourcePortals:item.p,providerUrl:editorial?.providerUrl||providerSource?.url,languageVariantOf:editorial?.languageVariantOf};
  }).sort((a,b)=>b.score-a.score||b.id-a.id);
}
