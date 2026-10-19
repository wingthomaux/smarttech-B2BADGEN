import type {KnowledgeItem} from "./catalog";

export const mediaSpace="Medien und Öffentlichkeit";
export const mediaDescription={de:"Redaktionen, Publishing, Rundfunk, Social Media, Communities und digitale Öffentlichkeit",en:"Newsrooms, publishing, broadcasting, social media, communities and the digital public sphere"};

export const mediaAreas=[
  {name:"Content und Redaktion",nameEn:"Content and editorial",description:"Recherche, Erstellung, Bearbeitung, Übersetzung und redaktionelle Abläufe",descriptionEn:"Research, creation, editing, translation and editorial workflows"},
  {name:"Publishing und Distribution",nameEn:"Publishing and distribution",description:"Websites, Fachportale, Newsletter und kanalübergreifende Ausspielung",descriptionEn:"Websites, specialist portals, newsletters and cross-channel distribution"},
  {name:"Audio, Video und Broadcast",nameEn:"Audio, video and broadcasting",description:"Podcasts, Streaming, Rundfunk sowie Live- und Videoproduktion",descriptionEn:"Podcasts, streaming, broadcasting, live and video production"},
  {name:"Social Media und Communities",nameEn:"Social media and communities",description:"Kanalmanagement, Dialog, Moderation, Creator und berufliche Netzwerke",descriptionEn:"Channel management, dialogue, moderation, creators and professional networks"},
  {name:"Reichweite und Zielgruppen",nameEn:"Reach and audiences",description:"Auffindbarkeit, Empfehlungen, Leserbindung und personalisierte Inhalte",descriptionEn:"Discoverability, recommendations, reader engagement and personalised content"},
  {name:"Werbung und Monetarisierung",nameEn:"Advertising and monetisation",description:"Werbeinventar, Native Advertising, Sponsoring, Abos und Bezahlinhalte",descriptionEn:"Advertising inventory, native advertising, sponsorship, subscriptions and paid content"},
  {name:"Analyse und Wirkung",nameEn:"Analysis and impact",description:"Mediennutzung, Kampagnenwirkung, öffentliche Diskussion und Reputation",descriptionEn:"Media usage, campaign impact, public discussion and reputation"},
  {name:"Vertrauen, Rechte und Sicherheit",nameEn:"Trust, rights and security",description:"Quellenprüfung, Desinformation, Deepfakes, Urheberrechte und Schutz redaktioneller Systeme",descriptionEn:"Source verification, disinformation, deepfakes, copyright and protection of editorial systems"},
] as const;

export const mediaChannels=["Social Media","Web und Fachportale","Newsletter","Audio und Podcasts","Video und Streaming","Rundfunk"] as const;
export const mediaTopics=["KI","Datenschutz","Sicherheit"] as const;

export const mediaSolutions:Record<string,{de:string;en:string}>={
  "Content und Redaktion":{de:"Content-Erstellung und redaktionelle Unterstützung",en:"Content creation and editorial support"},
  "Publishing und Distribution":{de:"Publishing und Content-Distribution",en:"Publishing and content distribution"},
  "Audio, Video und Broadcast":{de:"Audio-, Video- und Streaming-Lösung",en:"Audio, video and streaming solution"},
  "Social Media und Communities":{de:"Social-Media- und Community-Management",en:"Social media and community management"},
  "Reichweite und Zielgruppen":{de:"Suchsichtbarkeit und Zielgruppenansprache",en:"Search visibility and audience engagement"},
  "Werbung und Monetarisierung":{de:"Medienwerbung und Monetarisierung",en:"Media advertising and monetisation"},
  "Analyse und Wirkung":{de:"Medienanalyse und Wirkungsmessung",en:"Media analysis and impact measurement"},
  "Vertrauen, Rechte und Sicherheit":{de:"Medienrechte und vertrauenswürdige Inhalte",en:"Media rights and trustworthy content"},
};

// Content subject is authoritative. Publisher/provider names and source URLs
// (including LinkedIn or a podcast URL) are deliberately not classification signals.
const areaRules:Array<{area:(typeof mediaAreas)[number]["name"];pattern:RegExp}>=[
  {area:"Vertrauen, Rechte und Sicherheit",pattern:/\b(?:desinformation|disinformation|faktenprüfung|fact.checking|content provenance|quellenprüfung|urheberrechte?|copyright|deepfakes?)\b|spielregeln für streaming-dienste/i},
  {area:"Analyse und Wirkung",pattern:/social.listening|medienmonitoring|media.monitoring|medienrelevanz|medienberichtschancen|medienrelevanz-analyse|influencer.performance|social.media.ranking|social.media.nutzer|marken.sichtbarkeit|reputationsmonitoring/i},
  {area:"Publishing und Distribution",pattern:/social.media.*(?:api|sdk)|multi.network.publishing|social.media.publishing|redaktionssystem|publishing.plattform|newsletter.system|content.syndication|online.pr|pressetexte.*google news/i},
  {area:"Content und Redaktion",pattern:/content.creator|content.creation|journalistisch|ki.pressetexte|pressetexte.*qualitätskontrolle|redaktionelle.*(?:ki|software)|videoproduktion|transkription.*(?:medien|redaktion)/i},
  {area:"Werbung und Monetarisierung",pattern:/adserver|programmatic.advertising|native.advertising|paywall|abo(?:verwaltung|system)|werbeinventar|sperrung von google ads/i},
  {area:"Social Media und Communities",pattern:/social.media|community.(?:management|plattform)|creator.management/i},
  {area:"Reichweite und Zielgruppen",pattern:/\bseo\b|suchmaschinenoptimierung|generative.engine.optimization|ki.sichtbarkeit|content.marketing|newsjacking|empfehlungssystem.*(?:medien|publishing)/i},
  {area:"Audio, Video und Broadcast",pattern:/broadcast.*(?:software|lösung|plattform)|streaming.(?:plattform|angebot)|podcast.*(?:produktion|kommunikator)|video.produktion/i},
];

export function classifyMediaSubject(title:string){
  // Routine personnel, awards and website relaunches remain company news.
  if(/\b(?:award|ausgezeichnet|jubiläum|team.leitung|zum gründer)\b|stärkt die auffindbarkeit der unternehmenswebsite|startet neu gestaltete website/i.test(title))return undefined;
  if(/copyright|urheberrecht|deepfake/i.test(title)&&!/medien|redaktion|journalis|publishing|social.media|video|bild|desinformation|öffentlichkeit/i.test(title))return undefined;
  return areaRules.find(rule=>rule.pattern.test(title))?.area;
}

export function classifyMediaChannels(title:string){
  const channels:string[]=[];
  if(/social.media|social.listening|influencer|short.form.video|community/i.test(title))channels.push("Social Media");
  if(/wordpress|web(?:site)?|fachportal|publishing|online.pr|pressetext|\bseo\b|ki.sichtbarkeit|suchmaschinen|content.marketing|newsjacking/i.test(title))channels.push("Web und Fachportale");
  if(/newsletter/i.test(title))channels.push("Newsletter");
  if(/podcast|audio.produktion/i.test(title))channels.push("Audio und Podcasts");
  if(/video|streaming/i.test(title))channels.push("Video und Streaming");
  if(/broadcast|rundfunk/i.test(title))channels.push("Rundfunk");
  return channels;
}

export function classifyMediaTopics(title:string){
  const topics:string[]=[];
  if(/\b(?:ki|ai)\b|generative.engine|deepfake/i.test(title))topics.push("KI");
  if(/datenschutz|dsgvo|gdpr|privacy/i.test(title))topics.push("Datenschutz");
  if(/sicherheit|security|deepfake|desinformation|disinformation/i.test(title))topics.push("Sicherheit");
  return topics;
}

export function applyMediaTaxonomy<T extends KnowledgeItem>(item:T):T{
  const area=item.mediaArea||classifyMediaSubject(item.title);
  if(!area)return item;
  // An explicit sector use case may retain its main space; general corporate
  // marketing and generic IT classification are superseded by the media use case.
  const primary=item.mediaPrimary??(item.space===mediaSpace||item.space==="Unternehmen und Verwaltung"||item.space==="Digitale Infrastruktur"||item.id===3669); // Brand visibility tool incorrectly filed as production.
  const genericSolution=["IT-, Daten-, KI- oder Sicherheitslösung","Technologie- oder Unternehmenslösung","Unternehmens- oder Verwaltungssoftware","Produktions-, Engineering- oder Automatisierungslösung"].includes(item.solution);
  return {...item,...(primary?{space:mediaSpace}:{related:[...new Set([...(item.related||[]),mediaSpace])]}),...(primary&&genericSolution?{solution:mediaSolutions[area].de}:{}),mediaArea:area,channels:item.channels??classifyMediaChannels(item.title),topics:item.topics??classifyMediaTopics(item.title)};
}

export function matchesMediaFilters(item:Pick<KnowledgeItem,"mediaArea"|"relatedMediaAreas"|"channels"|"topics">,area="alle",channel="alle",topic="alle"){
  return (area==="alle"||belongsToMediaArea(item,area))&&(channel==="alle"||!!item.channels?.includes(channel))&&(topic==="alle"||!!item.topics?.includes(topic));
}

export function belongsToMediaArea(item:Pick<KnowledgeItem,"mediaArea"|"relatedMediaAreas">,area:string){return item.mediaArea===area||!!item.relatedMediaAreas?.includes(area)}

export function belongsToSpace(item:Pick<KnowledgeItem,"space"|"related"|"mediaArea">,space:string){
  return item.space===space||((space===mediaSpace||!!item.mediaArea)&&!!item.related?.includes(space));
}
