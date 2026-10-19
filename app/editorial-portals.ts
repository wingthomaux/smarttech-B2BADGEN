import {euaigfCompanies,euaigfUrl} from "./euaigf-source";

// Editorial source references are separate from validated SmartTech knowledge items.
export const editorialPortalEntries = [
  {portal:"EU AI Gigafactories",title:"EU AI Gigafactories Research Monitor",url:euaigfUrl,providers:euaigfCompanies},
  {portal:"Interaktivierungs-Atlas",title:"Adobe Creative Cloud",url:"https://atlas.b2badgen.com/artikel/adobe-creative-cloud/",providers:["Adobe","Adobe Systems Europe"]},
  {portal:"Interaktivierungs-Atlas",title:"Siemens Industrial Copilot",url:"https://atlas.b2badgen.com/artikel/siemens-industrial-copilot/",providers:["Siemens","Siemens Digital Industries Software"]},
  {portal:"Interaktivierungs-Atlas",title:"Agentforce",url:"https://atlas.b2badgen.com/artikel/agentforce/",providers:["Salesforce"]},
  {portal:"Interaktivierungs-Atlas",title:"NVIDIA Agent Toolkit",url:"https://atlas.b2badgen.com/artikel/nvidia-agent-toolkit/",providers:["NVIDIA"]},
  {portal:"Interaktivierungs-Atlas",title:"ServiceNow AI Agents",url:"https://atlas.b2badgen.com/artikel/servicenow-ai-agents/",providers:["ServiceNow"]},
  {portal:"heise Business Services",title:"Falsche Identitäten: So schützen Sie sich vor Deepfakes und anderen Bedrohungen",url:"https://business-services.heise.de/security/authentifizierung-zugangssysteme/beitrag/falsche-identitaeten-so-schuetzen-sie-sich-vor-deepfakes-und-anderen-bedrohungen-5111",providers:["Ergon Informatik AG"]},
  {portal:"Whitepaper CIO.de",title:"Identity First: Warum Vertrauen der neue Perimeter wird",url:"https://whitepaper.cio.de/resources/identity-first-warum-vertrauen-der-neue-perimeter-wird-2",providers:["Ergon Informatik AG"]},
];

export function editorialEntriesForPortal(name:string){return editorialPortalEntries.filter(item=>item.portal===name)}
export function editorialEntriesForProvider(name:string){return editorialPortalEntries.filter(item=>item.providers.includes(name))}
