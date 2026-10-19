import {readFile,writeFile} from "node:fs/promises";

const target=new URL("../public/data/publications-update-2026-09-07.json",import.meta.url);
const base=new URL("../public/data/publications.json",import.meta.url);
const portal="Whitepaper Silicon.de";
const role="Anbieter laut Silicon.de-Anbieterfeld";
const additions=[
  ["Hornetsecurity by Proofpoint","2026-08-28","AI Risk Report 2026 DACH","https://whitepaper.silicon.de/resource/ai-risk-report-2026-dach/","Whitepaper"],
  ["Hornetsecurity by Proofpoint","2026-08-28","Das MSP playbook: für inteliggenteres statt härteres arbeiten","https://whitepaper.silicon.de/resource/das-msp-playbook-fuer-inteliggenteres-statt-haerteres-arbeiten/","E-Book"],
  ["Veeam","2026-07-15","Datensouveränität: Ein Leitfaden für europäische Organisationen","https://whitepaper.silicon.de/resource/datensouveraenitaet-ein-leitfaden-fuer-europaeische-organisationen/","Whitepaper"],
  ["Veeam","2026-07-15","Über Grenzen hinweg: Datensouveränität in der Cloud-Ära meistern","https://whitepaper.silicon.de/resource/ueber-grenzen-hinweg-datensouveraenitaet-in-der-cloud-aera-meistern/","Video"],
  ["Sophos GmbH","2026-06-23","Cybersecurity in der Lieferkette","https://whitepaper.silicon.de/resource/cybersecurity-in-der-lieferkette/","Whitepaper"],
  ["Alteryx GmbH","2026-06-03","5 Use Cases für FP&A, die Finanzinstitute automatisieren können, um jede Woche Zeit zu sparen","https://whitepaper.silicon.de/resource/5-use-cases-fuer-fpa-die-finanzinstitute-automatisieren-koennen-um-jede-woche-zeit-zu-sparen/","E-Book"],
  ["Alteryx GmbH","2026-06-03","5 gängige Audit-Prozesse, die Finanzdienstleister innerhalb einer Woche automatisieren können","https://whitepaper.silicon.de/resource/5-gaengige-audit-prozesse-die-finanzdienstleister-innerhalb-einer-woche-automatisieren-koennen/","E-Book"],
  ["Quest Software","2026-05-08","Reusable Data Is Changing the Economics of Enterprise Data","https://whitepaper.silicon.de/resource/reusable-data-is-changing-the-economics-of-enterprise-data/","Video"],
  ["Quest Software","2026-04-14","Datenprodukt-Wiederverwendbarkeit: Warum der Aufbau von Datenprodukten für die Wiederverwendung nicht nur gute Praxis ist – sondern der schnellste Weg zu Wertschöpfung.","https://whitepaper.silicon.de/resource/datenprodukt-wiederverwendbarkeit-warum-der-aufbau-von-datenprodukten-fuer-die-wiederverwendung-nicht-nur-gute-praxis-ist-sondern-der-schnellste-weg-zu-wertschoepfung/","Infografik"],
  ["Quest Software","2026-04-14","Einmal entwickeln, überall skalieren: Die Ökonomie wiederverwendbarer Datenprodukte","https://whitepaper.silicon.de/resource/einmal-entwickeln-ueberall-skalieren-die-oekonomie-wiederverwendbarer-datenprodukte/","E-Book"],
  ["Sophos GmbH","2026-04-13","MDR AUF HÖCHSTEM NIVEAU","https://whitepaper.silicon.de/resource/mdr-auf-hoechstem-niveau/","Whitepaper"],
  ["Alteryx GmbH","2026-03-06","Data Intelligence skalieren im Finanzsektor","https://whitepaper.silicon.de/resource/data-intelligence-skalieren-im-finanzsektor/","E-Book"],
  ["Alteryx GmbH","2026-03-06","Der Leitfaden für moderne Data Analysts zur Erstellung KI-fähiger Daten","https://whitepaper.silicon.de/resource/der-leitfaden-fuer-moderne-data-analysts-zur-erstellung-ki-faehiger-daten/","Whitepaper"],
  ["Alteryx GmbH","2026-03-06","5 Schritte zu einer absolut sicheren Datenstrategie","https://whitepaper.silicon.de/resource/5-schritte-zu-einer-absolut-sicheren-datenstrategie/","Whitepaper"],
  ["Alteryx GmbH","2026-03-06","Mit Daten zur Transformation: Die Analytics-Reise von Siemens Energy","https://whitepaper.silicon.de/resource/mit-daten-zur-transformation-die-analytics-reise-von-siemens-energy/","E-Book"],
  ["Alteryx GmbH","2026-03-06","Das AI Data Clearinghouse für Enterprise Intelligence","https://whitepaper.silicon.de/resource/das-ai-data-clearinghouse-fuer-enterprise-intelligence/","Whitepaper"],
  ["Alteryx GmbH","2026-03-06","KI vertrauen lernen: Die Logik hinter Enterprise Agents und LLMs verstehen","https://whitepaper.silicon.de/resource/ki-vertrauen-lernen-die-logik-hinter-enterprise-agents-und-llms-verstehen/","Whitepaper"],
  ["Alteryx GmbH","2026-03-06","Über das Dashboard hinaus","https://whitepaper.silicon.de/resource/ueber-das-dashboard-hinaus/","Whitepaper"],
  ["Quest Software","2026-01-26","Cyberangriffe während des Angriffs stoppen","https://whitepaper.silicon.de/resource/cyberangriffe-waehrend-des-angriffs-stoppen/","Whitepaper"],
  ["Quest Software","2026-01-26","Identity Security – 5 kritische Herausforderungen","https://whitepaper.silicon.de/resource/identity-security-5-kritische-herausforderungen/","Whitepaper"],
  ["Quest Software","2026-01-26","Das BOOM-Modell für Cyber-Resilienz","https://whitepaper.silicon.de/resource/das-boom-modell-fuer-cyber-resilienz/","Whitepaper"],
  ["Checkmarx Germany GmbH","2026-01-23","The Future of Application Security in the Era of AI","https://whitepaper.silicon.de/resource/the-future-of-application-security-in-the-era-of-ai/","Whitepaper"],
  ["Fortinet & Capgemini","2026-01-23","Securing the Edge: Wie Fortinet und Capgemini die Zukunft der OT-Cybersicherheit voranbringen","https://whitepaper.silicon.de/resource/securing-the-edge-wie-fortinet-und-capgemini-die-zukunft-der-ot-cybersicherheit-voranbringen/","Podcast"],
  ["4ALLPORTAL","2026-01-16","Effizienz steigern, Prozesse vereinfachen und Medien konsistent verwalten","https://whitepaper.silicon.de/resource/effizienz-steigern-prozesse-vereinfachen-und-medien-konsistent-verwalten/","Whitepaper"],
  ["4ALLPORTAL","2026-01-16","Datenqualität sichern, Prozesse optimieren und Informationen konsistent bereitstellen","https://whitepaper.silicon.de/resource/datenqualitaet-sichern-prozesse-optimieren-und-informationen-konsistent-bereitstellen/","Whitepaper"],
  ["Fortinet GmbH","2026-01-14","Bericht zum Stand der Betriebstechnologie (OT) und Cybersecurity 2025","https://whitepaper.silicon.de/resource/bericht-zum-stand-der-betriebstechnologie-ot-und-cybersecurity-2025/","Whitepaper"],
  ["Fortinet & Capgemini","2026-01-07","Verbessern Sie die Sicherheit und Resilienz Ihrer OT-Systeme mit Capgemini und Fortinet","https://whitepaper.silicon.de/resource/verbessern-sie-die-sicherheit-und-resilienz-ihrer-ot-systeme-mit-capgemini-und-fortinet/","Whitepaper"],
].map(([c,d,t,u,f])=>({c,d,t,u,p:[portal],r:role,s:"Hoch",f}));

const [baseRows,weeklyRows]=await Promise.all([readFile(base,"utf8").then(JSON.parse),readFile(target,"utf8").then(JSON.parse)]);
const all=[...baseRows,...weeklyRows];
const urls=new Set(all.map(item=>item.u.replace(/\/$/,"")));
const keys=new Set(all.map(item=>`${item.c}|${item.d}|${item.t}`.toLocaleLowerCase("de").replace(/[^a-z0-9äöüß]+/g," ").trim()));
let nextId=Math.max(...all.map(item=>item.id))+1;
const inserted=[];
for(const item of additions){
  const urlKey=item.u.replace(/\/$/,"");
  const contentKey=`${item.c}|${item.d}|${item.t}`.toLocaleLowerCase("de").replace(/[^a-z0-9äöüß]+/g," ").trim();
  if(urls.has(urlKey)||keys.has(contentKey))continue;
  inserted.push({id:nextId++,...item});urls.add(urlKey);keys.add(contentKey);
}
if(inserted.length){await writeFile(target,JSON.stringify([...weeklyRows,...inserted],null,2)+"\n");}
console.log(`Silicon.de: ${inserted.length} neue Ressourcen, ${additions.length-inserted.length} bereits vorhanden.`);
