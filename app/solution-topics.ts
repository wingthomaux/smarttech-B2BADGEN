// Editorial entry points into existing knowledge items. Matching is deliberately
// limited to the offering and its title; provider names are not product evidence.
export const solutionTopics=[
  {id:"marketing-automation",de:"Marketing Automation",en:"Marketing automation",pattern:/Marketing.Automation|Sales.Automation|E.Mail.Marketing|Lead.Management/i},
  {id:"dam",de:"Digital Asset Management / DAM",en:"Digital asset management / DAM",pattern:/Digital.Asset.Management|\bDAM\b/i},
  {id:"pim",de:"Produktinformationen / PIM",en:"Product information / PIM",pattern:/Produktinformation|Product.Information|\bPIM\b/i},
  {id:"cms",de:"CMS / Digital Experience",en:"CMS / digital experience",pattern:/\bCMS\b|Content.Management.System|Digital.Experience|\bDXP\b/i},
  {id:"sales-enablement",de:"Sales Enablement",en:"Sales enablement",pattern:/Sales.Enablement|Sales.Content|Social.Selling/i},
  {id:"social-media",de:"Social-Media-Management",en:"Social media management",pattern:/Social.Media|Social.Listening|Community.Management/i},
  {id:"crm",de:"CRM",en:"CRM",pattern:/\bCRM\b|Customer.Relationship.Management|Kundenbeziehungsmanagement/i},
  {id:"erp",de:"ERP",en:"ERP",pattern:/\bERP\b|Enterprise.Resource.Planning/i},
  {id:"ecm",de:"Dokumentenmanagement / ECM",en:"Document management / ECM",pattern:/\bECM\b|Dokumentenmanagement|Document.Management|Content.Management|DMS\b/i},
  {id:"iam",de:"IAM / Zero Trust",en:"IAM / Zero Trust",pattern:/\bIAM\b|Identity|Identit.t|Access.Management|Zugriffsmanagement|Zero.Trust/i},
  {id:"endpoint",de:"Endpoint-Schutz / EDR / XDR",en:"Endpoint security / EDR / XDR",pattern:/Endpoint|\bEDR\b|\bXDR\b/i},
  {id:"sase",de:"SASE / SD-WAN / sichere Netze",en:"SASE / SD-WAN / secure networks",pattern:/\bSASE\b|Secure.Access.Service.Edge|\bSD.WAN\b/i},
  {id:"siem",de:"SIEM / SOC",en:"SIEM / SOC",pattern:/\bSIEM\b|\bSOC\b|Security.Information.Event.Management|Security.Operations.Cent(?:er|re)/i},
  {id:"awareness",de:"Security Awareness",en:"Security awareness",pattern:/Security.Awareness|Sicherheitsbewusst|Phishing.Simulation|Cyber.Awareness/i},
  {id:"backup",de:"Backup / Cyber Recovery",en:"Backup / cyber recovery",pattern:/Backup|Datensicherung|Cyber.Recovery|Disaster.Recovery|Wiederherstellung/i},
  {id:"uc",de:"Cloud-Telefonie / UC",en:"Cloud telephony / UC",pattern:/Telefonie|Telephony|Unified.Communications|\bUCaaS\b|Telefonanlage/i},
  {id:"colocation",de:"Colocation",en:"Colocation",pattern:/Colocation|Co.Location/i},
  {id:"gpu",de:"KI- / GPU-Infrastruktur",en:"AI / GPU infrastructure",pattern:/\bGPU\b|KI.Infrastruktur|AI.Infrastructure|AI.Factory|KI.Rechenzentrum/i},
  {id:"analytics",de:"Datenintegration / Analytics",en:"Data integration / analytics",pattern:/Datenintegration|Data.Integration|Analytics|Analytik|Data.Pipeline/i},
  {id:"twin",de:"Digital Twin / PLM",en:"Digital twin / PLM",pattern:/Digital.Twin|Digitaler.Zwilling|\bPLM\b|Product.Lifecycle.Management/i},
  {id:"mes",de:"Produktionsplanung / MES",en:"Production planning / MES",pattern:/Produktionsplanung|Fertigungsplanung|\bMES\b|Manufacturing.Execution/i},
  {id:"robotics",de:"Industrielle Robotik",en:"Industrial robotics",pattern:/Robotik|Robot(ic|er)|Cobots?|Automatisierungsrobot/i},
  {id:"ot",de:"OT-Sicherheit",en:"OT security",pattern:/OT.Sicherheit|OT.Security|Industrial.Security|industrielle.Cybersicherheit/i},
  {id:"fleet",de:"Flottenmanagement / Telematik",en:"Fleet management / telematics",pattern:/Flottenmanagement|Fleet.Management|Telematik|Telematics/i},
  {id:"health",de:"Klinik-IT / Gesundheitsdaten",en:"Hospital IT / health data",pattern:/Gesundheitsdaten|Health.Data|Klinik.IT|Hospital.IT|Interoperab|Krankenhaus.IT/i},
] as const;

export type SolutionTopic=(typeof solutionTopics)[number];
// Explicit, reviewed associations supplement conservative title matching.
// They do not overwrite the item's original taxonomy or editorial stage.
const associations:Record<string,{include?:readonly number[];exclude?:readonly number[]}>= {
  crm:{include:[4700,4699,4697,3049,1208,1779,1313,610016,660005]},
  erp:{exclude:[1663]}, // ErP 2026 is an energy-efficiency directive for fans.
  ecm:{include:[3961,4106,2574,2642,1218,3750,4117,1013,1480,4636,1015],exclude:[2675]}, // DMS & Cie. is a name, not a DMS product.
  endpoint:{include:[1830]},
  siem:{include:[1528,1162,2063,1991,2062]},
  awareness:{include:[3248,3473,3475,4354,4694,3477,4814,4309,3668,2804]},
  uc:{include:[670001,670002,670011,670013],exclude:[620000,620010]},
  colocation:{include:[2416,4631,650003]},
  gpu:{include:[500001,500003,500006,200034],exclude:[1428]},
  analytics:{include:[2879,3106,2572,4501,3702,2806,2304,1631],exclude:[1372,1373,1374]},
  mes:{include:[200248,200263]},
  ot:{include:[12,3357,4810,2709,3251,1886,200014,200430]},
  fleet:{include:[2544,1516,1514,1509,1508,2058],exclude:[4660,2836]},
  health:{include:[7,15,16,17,41,1729,1727,300001,300002,300003,300004,300005,300006,300007,300008,300010,300012,300013,300014,300015],exclude:[1723]},
};
export function matchesSolutionTopic(item:{id?:number;title:string;solution:string;space:string;solutionTopics?:readonly string[]},topic:SolutionTopic){
  if(topic.id==="health"&&item.space!=="Gesundheit und Life Sciences")return false;
  const assignment=associations[topic.id];
  if(item.id!==undefined&&assignment?.exclude?.includes(item.id))return false;
  if(item.solutionTopics?.includes(topic.id))return true;
  if(item.id!==undefined&&assignment?.include?.includes(item.id))return true;
  return topic.pattern.test(`${item.title} ${item.solution}`);
}

export function matchesFreeText(value:string,term:string){
  const needle=term.trim();
  if(!needle)return true;
  // Acronyms must not match longer words: SIEM ≠ Siemens, ERP ≠ Enterprise.
  if(/^[A-Za-z0-9]{2,4}$/.test(needle)){
    const escaped=needle.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`,"iu").test(value);
  }
  return value.toLocaleLowerCase().includes(needle.toLocaleLowerCase());
}
