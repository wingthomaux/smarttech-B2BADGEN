import {writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";

// Individually checked public landing pages. A gated PDF behind a form is not
// represented as downloaded or independently reviewed.
const rows=[
  // Colocation and actual server housing, not generic data-centre equipment.
  ["colocation","NorthC","Colocation und Server-Housing in regionalen Rechenzentren","https://www.northcdatacenters.com/de/serviceleistungen/colocation/"],
  ["colocation","NorthC","Colocation per Rack für eigene IT","https://www.northcdatacenters.com/de/sonderaktion-neukunden/"],
  ["colocation","NorthC","Colocation im Rechenzentrum München","https://www.northcdatacenters.com/de/northc-datacenters/muenchen-2/"],
  ["colocation","NorthC","Racks und Cages für Colocation","https://www.northcdatacenters.com/de/serviceleistungen/colocation/racks-cages/"],
  ["colocation","NorthC","Die richtige Antwort: NorthC Colocation","https://www.northcdatacenters.com/de/blogs/die-richtige-antwort-northc-colocation/"],
  ["colocation","NorthC","Colocation-Rechenzentren und Cyber Security","https://www.northcdatacenters.com/de/blogs/colocation-rechenzentren-und-ihre-bedeutung-fuer-die-cyber-security/"],
  ["colocation","NorthC","Rechenzentrum-Outsourcing: Colocation oder Eigenbetrieb","https://www.northcdatacenters.com/de/blogs/rechenzentrum-outsourcing/"],
  ["colocation","NorthC","Regionale Rechenzentren als Cloud- und Carrier-neutrale Verbindung","https://www.northcdatacenters.com/de/blogs/herausforderungen-bei-der-cloud-first-und-data-first-strategie/"],
  ["colocation","CBXNET combox internet","Housing für Racks und einzelne Server in Berlin","https://www.cbxnet.de/it-infrastruktur/housing-rechenzentrum-racks-compartments-server-appliances/"],
  ["colocation","CBXNET combox internet","Server-Housing und Colocation im CBXNET Shop","https://www.cbxnet.de/shop/"],
  ["colocation","CBXNET combox internet","Wechsel in ein redundantes Colocation-Rechenzentrum","https://www.cbxnet.de/unternehmen/pressemeldungen/meldung/?tx_ttnews%5Btt_news%5D=123"],
  ["colocation","CBXNET combox internet","CBXNET Colocation über dcOrbis","https://www.cbxnet.de/unternehmen/pressemeldungen/meldung/?tx_ttnews%5Btt_news%5D=102"],
  ["colocation","M-net","M-net Rechenzentren und Housing in Bayern","https://www.m-net.de/geschaeftskunden/vernetzung/rechenzentrum"],
  // MES and manufacturing operations management with a named system.
  ["mes","Siemens Digital Industries Software","Cloud-basiertes MES für Prozess- und diskrete Fertigung","https://resources.sw.siemens.com/en-US/white-paper-cloud-based-manufacturing-execution-software-mes-process-discrete/"],
  ["mes","Siemens Digital Industries Software","Manufacturing Execution für digitale Teilefertigung","https://resources.sw.siemens.com/en-US/white-paper-manufacturing-execution-system-mes-digital-part-production/"],
  ["mes","Siemens Digital Industries Software","Flexibleres Manufacturing Execution System durch Low-Code","https://resources.sw.siemens.com/en-US/white-paper-efficient-manufacturing-execution-systems/"],
  ["mes","Siemens Digital Industries Software","MES in der Elektronikfertigung","https://resources.sw.siemens.com/en-US/white-paper-smart-manufacturing-in-electronics/"],
  ["mes","Siemens Digital Industries Software","Den Wert von Opcenter MES ausschöpfen","https://resources.sw.siemens.com/en-US/white-paper-realize-the-full-value-of-opcenter/"],
  ["mes","Siemens Digital Industries Software","MES für Photonik und Optoelektronik","https://resources.sw.siemens.com/en-US/white-paper-using-an-advanced-manufacturing-execution-system/"],
  ["mes","Siemens Digital Industries Software","Opcenter MES für Konsumgüterfertigung","https://resources.sw.siemens.com/en-US/white-paper-realize-the-full-value-of-opcenter-for-flexible-and-predictable-cpg/"],
  ["mes","Siemens Digital Industries Software","Manufacturing Operations Management modular einführen","https://resources.sw.siemens.com/en-US/white-paper-future-of-mom/"],
  ["mes","Siemens Digital Industries Software","MES für den Industriemaschinenbau","https://resources.sw.siemens.com/en-US/infographic-manufacturing-execution-solution-industrial-machinery/"],
  ["mes","Siemens Digital Industries Software","MES und intelligente Fertigung verbinden","https://resources.sw.siemens.com/en-US/infographic-improve-manufacturing-execution-smart-manufacturing/"],
  ["mes","Siemens Digital Industries Software","Opcenter Manufacturing Execution für Halbleiter und Elektronik","https://resources.sw.siemens.com/en-US/infographic-opcenter-manufacturing-execution/"],
  // Vehicle fleets only; similarly named software-fleet managers are excluded.
  ["fleet","Samsara","Leitfaden für ein Fleet-Safety-Programm","https://www.samsara.com/guides/fleet-safety"],
  ["fleet","Geotab","Fleet Telematics: Sicherheit und Effizienz 2026","https://www.geotab.com/blog/fleet-telematics-safety-efficiency-guide/"],
  ["fleet","Samsara","Fleet-Safety-Analytics für Fahrersicherheit","https://www.samsara.com/guides/fleet-safety-analytics"],
  ["fleet","Geotab","Telematik für Fahrzeugflotten: Funktionen und Nutzen","https://www.geotab.com/blog/what-is-telematics/"],
  ["fleet","Samsara","Fleet Management: Software und Fahrzeugtelematik","https://www.samsara.com/guides/what-is-fleet-management"],
  ["fleet","Samsara","Technologie für den Flottenbetrieb","https://www.samsara.com/guides/fleet-technology"],
  ["fleet","Geotab","Flottenmanagement für Verbrenner und Elektrofahrzeuge","https://www.geotab.com/blog/what-is-fleet-management/"],
  ["fleet","Samsara","Technologien für die Flottensicherheit","https://www.samsara.com/guides/fleet-safety-technology"],
  ["fleet","Geotab","Telematik-Trends für Flotten 2026","https://www.geotab.com/blog/telematics-trends/"],
  ["fleet","Samsara","Flottenoptimierung mit Telematik und Routenplanung","https://www.samsara.com/guides/fleet-optimization"],
  // ERP resources from the vendors themselves.
  ["erp","Infor","ERP in der Cloud: Umstieg auf geschäftskritische Anwendungen","https://www.infor.com/de-de/resources/cloud-erp-systems-why-there-is-no-way-around-them"],
  ["erp","Infor","ERP-Lösung für den Elektrogroßhandel","https://www.infor.com/de-de/resources/erp-solution-for-electrical-wholesale-more-efficiency-higher-customer-satisfaction"],
  ["erp","Infor","Produktivität und Agilität durch modernes ERP","https://www.infor.com/de-de/resources/improve-productivity-and-agility-with-modern-erp"],
  ["erp","Infor","KI-gestütztes ERP mit Infor CloudSuite","https://www.infor.com/de-de/resources/infor-closes-digital-divide-with-ai-driven-erp"],
  ["erp","SoftENGINE","ERP im B2B-Handel: Anforderungen und Lösungen","https://www.softengine.de/erp-im-b2b-handel-anforderungen-loesungen-softengine/"],
  ["erp","Infor","Branchenspezifisches Cloud-ERP für den Handel","https://www.infor.com/de-de/resources/distribution-specific-cloud-erp"],
  // Product pages are kept distinct from already indexed portal whitepapers.
  ["crm","ADITO Software GmbH","ADITO CRM für Vertrieb, Marketing und Service","https://www.adito.de/crm/"],
  ["crm","SAP","SAP Sales Cloud für Vertriebsautomatisierung","https://www.sap.com/germany/products/crm/sales-cloud.html"],
  ["crm","Salesforce","Salesforce Sales Cloud für CRM-Vertrieb","https://www.salesforce.com/de/sales/cloud/"],
  ["crm","SAP","SAP Service Cloud für Kundenservice im CRM","https://www.sap.com/germany/products/crm/service-cloud.html"],
  ["sase","Fortinet","Fortinet Unified SASE: Netzwerk und Sicherheit","https://www.fortinet.com/de/solutions/unified-sase"],
  ["sase","Versa","SASE mit SD-WAN und Secure Service Edge","https://versa-networks.com/de/resources/white-papers/sd-wan-and-secure-service-edge-for-dod-and-ultra-secure-deployments/"],
  ["sase","Fortinet","Fortinet Unified SASE für sicheren Zugriff","https://www.fortinet.com/de/solutions/unified-sase/secure-access"],
  ["sase","Versa","Souveräne SASE-Bereitstellung","https://versa-networks.com/products/sovereign-sase/"],
  ["sase","Fortinet","Kaufleitfaden für Unified SASE","https://www.fortinet.com/resources/buyers-guide/buyers-guide-to-sase"],
  ["gpu","NVIDIA","DGX-Systeme für skalierbare KI-Infrastruktur","https://www.nvidia.com/de-de/data-center/dgx-systems/"],
  ["ot","Fortinet","Fortinet OT Security Platform für industrielle Netze","https://www.fortinet.com/de/solutions/ot-security"],
  ["ot","Tenable","Tenable One OT Exposure für konvergente IT und OT","https://de.tenable.com/products/ot-security"],
  ["ot","Fortinet","FortiNDR zur Erkennung und Reaktion in OT","https://www.fortinet.com/de/solutions/ot-security/fortindr"],
  ["colocation","NorthC","Hochsicherheits-Rack für eigene IT-Systeme","https://www.northcdatacenters.com/de/wissen/online-fuer-immer-und-ewig/"],
  ["crm","ADITO Software GmbH","Opportunity Management mit ADITO CRM","https://www.adito.de/crm/einsatzbereiche/vertrieb/opportunity-management.html"],
  ["fleet","Geotab","GPS-Flottenortung im technischen Außendienst","https://www.geotab.com/blog/field-service-gps-fleet-tracking/"],
];

const taxonomy={
  colocation:["Digitale Infrastruktur","Sicherheit und Resilienz","Colocation und Server-Housing","Rechenzentrumsfläche, Strom, Kühlung und Konnektivität","Auswahl, Migration und Betrieb","Produktseite"],
  mes:["Produktion und Produkte","Qualität und Geschwindigkeit","Manufacturing Execution System (MES)","Fertigungssoftware und Integration","Planung, Fertigung und Qualitätssicherung","Ressource"],
  fleet:["Mobilität und Logistik","Kosten und Produktivität","Flottenmanagement und Fahrzeugtelematik","Telematikplattform, Daten und Betriebsprozesse","Auswahl, Einführung und Flottenbetrieb","Leitfaden"],
  erp:["Unternehmen und Verwaltung","Kosten und Produktivität","Enterprise Resource Planning (ERP)","Unternehmenssoftware und Integration","Auswahl, Einführung und Betrieb","Ressource"],
  crm:["Unternehmen und Verwaltung","Umsatz und Wachstum","Customer Relationship Management (CRM)","Vertriebs- und Kundenservice-Software","Auswahl, Einführung und Betrieb","Produktseite"],
  sase:["Digitale Infrastruktur","Sicherheit und Resilienz","Secure Access Service Edge (SASE)","Netzwerk- und Sicherheitsplattform","Auswahl, Einführung und Betrieb","Ressource"],
  gpu:["Digitale Infrastruktur","Qualität und Geschwindigkeit","GPU- und KI-Infrastruktur","Beschleunigte Hardwareplattform","Auswahl, Skalierung und Betrieb","Produktseite"],
  ot:["Produktion und Produkte","Sicherheit und Resilienz","OT-Sicherheitsplattform","Sicherheitssoftware und Integration","Absicherung und Betrieb","Produktseite"],
};
const output=rows.map(([topic,provider,title,url],index)=>{
  const [space,challenge,solution,delivery,lifecycle,format]=taxonomy[topic];
  return {id:720000+index,title,provider,space,challenge,solution,delivery,lifecycle,origin:"Kuratiert",format,url,
    note:`Öffentliche Originalseite von ${provider}; der beschriebene Lösungsbezug wurde auf der Landingpage geprüft. Ein möglicher Download hinter einem Formular wurde nicht als gelesen bewertet.`,
    stage:"Redaktionell geprüft",solutionTopics:[topic],providerUrl:new URL(url).origin,addedAt:"2026-09-29"};
});
if(new Set(output.map(item=>item.url)).size!==output.length)throw Error("Duplicate source URLs");
await writeFile(fileURLToPath(new URL("../app/official-expansion-solutions-20260929.json",import.meta.url)),`${JSON.stringify(output,null,2)}\n`);
console.log(`Generated ${output.length} individually sourced solution resources.`);
