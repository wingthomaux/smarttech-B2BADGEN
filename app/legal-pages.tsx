import Link from "@/app/public-link";
import {LanguageToggle} from "./language-toggle";

type Locale="de"|"en";
type Kind="imprint"|"privacy";
const email="thomas@interaktivierung.net";
const site="https://smarttech.b2badgen.com";
const privacyPath=(locale:Locale)=>locale==="en"?"/en/privacy":"/datenschutz";
const imprintPath=(locale:Locale)=>locale==="en"?"/en/imprint":"/impressum";

function Section({title,children}:{title:string;children:React.ReactNode}){
  return <section className="mt-9 border-t border-border pt-7">
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/85 sm:text-base">{children}</div>
  </section>;
}
function External({href,children}:{href:string;children:React.ReactNode}){
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">{children}</a>;
}
function Mail(){return <a href={"mailto:"+email} className="text-primary underline underline-offset-2">{email}</a>;}
function LegalNav({locale,kind}:{locale:Locale;kind:Kind}){
  const en=locale==="en";
  return <nav aria-label={en?"Legal information":"Rechtliche Informationen"} className="mt-6 flex flex-wrap gap-5 border-y py-4 text-sm font-medium">
    <Link href={imprintPath(locale)} aria-current={kind==="imprint"?"page":undefined} className={kind==="imprint"?"text-foreground underline underline-offset-4":"text-primary hover:underline"}>{en?"Imprint":"Impressum"}</Link>
    <Link href={privacyPath(locale)} aria-current={kind==="privacy"?"page":undefined} className={kind==="privacy"?"text-foreground underline underline-offset-4":"text-primary hover:underline"}>{en?"Privacy policy":"Datenschutzerklärung"}</Link>
  </nav>;
}
function Imprint({locale}:{locale:Locale}){
  const en=locale==="en";
  return <article aria-label={en?"Imprint and contributors":"Impressum und Mitwirkende"}>
    <Section title={en?"Provider and contact":"Anbieter und Kontakt"}>
      <p>{en?"Provider information under Section 5 of the German Digital Services Act (DDG):":"Anbieterangaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):"} <External href="https://www.gesetze-im-internet.de/ddg/__5.html">{en?"Legal provision":"Gesetzestext"}</External></p>
      <address className="not-italic font-medium">Thomas Wingenfeld<br/>Fraunhoferstraße 27a<br/>86167 Augsburg<br/>{en?"Germany":"Deutschland"}</address>
      <p>{en?"Email":"E-Mail"}: <Mail/></p>
      <p>{en
        ?"SmartTech is an independently edited B2B technology information service published by Thomas Wingenfeld under the name B2B AdGen Research. It provides references to technology providers, observed publications, curated knowledge items and portals. SmartTech is not the official website of any listed provider or linked publisher."
        :"SmartTech ist ein redaktionelles Informationsangebot von Thomas Wingenfeld unter der Bezeichnung B2B AdGen Research. Das Portal erschließt B2B-Technologieanbieter, beobachtete Veröffentlichungen, kuratierte Wissensobjekte und Quellenportale. SmartTech ist kein offizielles Angebot der aufgeführten Anbieter oder verlinkten Verlage."}</p>
    </Section>
    <Section title={en?"Editorial responsibility":"Redaktionelle Verantwortung"}>
      <p>{en?"Person responsible for journalistic and editorial content under Section 18(2) of the German Interstate Media Treaty (MStV): Thomas Wingenfeld, address as above.":"Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Absatz 2 Medienstaatsvertrag (MStV): Thomas Wingenfeld, Anschrift wie oben."} <External href="https://www.gesetze-bayern.de/Content/Document/MStV-18?view=Print">{en?"Legal provision":"Gesetzestext"}</External></p>
      <p>{en
        ?"Observed sources, curated additions and any future community contributions are identified separately. References, classifications and provider descriptions are subject to editorial review. Reports of errors, infringements or incorrect personal information may be sent to the email address above."
        :"Beobachtete Quellen, kuratierte Ergänzungen und gegebenenfalls künftige Community-Beiträge werden im Portal unterschieden. Quellenbelege, Klassifikationen und Anbieterbeschreibungen unterliegen redaktioneller Prüfung. Hinweise auf Fehler, Rechtsverletzungen oder unzutreffende personenbezogene Angaben können an die oben genannte E-Mail-Adresse gerichtet werden."}</p>
    </Section>
    <Section title={en?"Contributors and editorial perspectives":"Mitwirkende und redaktionelle Perspektiven"}>
      <ul className="list-disc space-y-3 pl-5">
        <li><strong>Thomas Wingenfeld</strong> – {en?"publisher, author and editor responsible for published content.":"Herausgeber, Autor und redaktionell Verantwortlicher für die veröffentlichten Inhalte."}</li>
        <li><strong>Codex {en?"by OpenAI":"von OpenAI"}</strong> – {en?"AI assistant supporting research, text structure, code implementation and testing. AI output may contain errors and does not replace source checking or the publisher's responsibility.":"KI-Assistent für Recherche, Textstrukturierung, technische Umsetzung und Tests. KI-Ausgaben können Fehler enthalten und ersetzen weder Quellenprüfung noch die Verantwortung des Herausgebers."}</li>
        <li><strong>Lucius, Pablo {en?"and":"und"} France</strong> – {en?"literary, AI-assisted editorial perspectives from Thomas Wingenfeld's literary universe: skeptical source reading, creative inquiry and openness about unresolved questions. They are not additional natural persons or legally responsible parties.":"literarische, KI-gestützt verwendbare redaktionelle Denkfiguren aus dem literarischen Universum von Thomas Wingenfeld: skeptische Quellenprüfung, kreative Fragestellung und Offenheit gegenüber unbelegten oder mehrdeutigen Aussagen. Sie sind keine zusätzlichen natürlichen Personen oder rechtlich Verantwortlichen."}</li>
      </ul>
      <p>{en?"Literary background":"Literarischer Hintergrund"}: <External href="https://www.amazon.de/interaktivierung-NET-Kunst-hilft-gegen-Maschinen/dp/B0CZ456KD7/">{en?"Book by Thomas Wingenfeld on Amazon":"Buch von Thomas Wingenfeld bei Amazon"}</External>.</p>
    </Section>
    <Section title={en?"Content, external links and rights":"Inhalte, externe Links und Rechte"}>
      <p>{en
        ?"The portal documents sources and editorial classifications at their respective published states. The existence of a publication is not an endorsement of the provider, a guarantee of suitability or a verification of commercial claims. Providers and source operators are responsible for their own external content."
        :"Das Portal dokumentiert Quellen und redaktionelle Zuordnungen zum jeweils erkennbaren Veröffentlichungsstand. Die Aufnahme einer Publikation ist weder eine Empfehlung des Anbieters noch eine Eignungszusage oder Bestätigung sämtlicher wirtschaftlicher Aussagen. Für externe Inhalte sind deren jeweilige Betreiber verantwortlich."}</p>
      <p>{en
        ?"External sources and the book link lead to third-party services whose content may change. Specific reports of unlawful content will be reviewed, and affected references corrected or removed where warranted."
        :"Externe Quellen und der Buchlink führen zu Angeboten Dritter, deren Inhalte sich ändern können. Konkrete Hinweise auf rechtswidrige Inhalte werden geprüft; betroffene Angaben oder Verweise werden gegebenenfalls berichtigt oder entfernt."}</p>
      <p>{en
        ?"Rights in quoted texts, brands and other third-party works remain with their respective owners. The naming of an AI assistant does not create independent copyright for that AI."
        :"Rechte an zitierten Texten, Marken und sonstigen fremden Werken verbleiben bei den jeweiligen Rechteinhabern. Die Nennung eines KI-Assistenten begründet keine eigenen Urheberrechte der KI."}</p>
      <p>{en?"For processing of personal data, see the":"Informationen zum Umgang mit personenbezogenen Daten enthält die"} <Link className="text-primary underline underline-offset-2" href={privacyPath(locale)}>{en?"SmartTech privacy policy":"SmartTech-Datenschutzerklärung"}</Link>. {en?"Provider details are based on the supplied EU AI Gigafactories imprint.":"Die Anbieterangaben wurden aus dem bereitgestellten Impressum von EU AI Gigafactories übernommen."}</p>
    </Section>
  </article>;
}
function Privacy({locale}:{locale:Locale}){
  const en=locale==="en";
  return <article aria-label={en?"Privacy policy":"Datenschutzerklärung"}>
    <Section title={en?"1. Controller and contact":"1. Verantwortlicher und Kontakt"}>
      <p>{en?"The controller for this SmartTech website is":"Verantwortlich für dieses SmartTech-Angebot ist"} Thomas Wingenfeld, Fraunhoferstraße 27a, 86167 Augsburg, {en?"Germany":"Deutschland"}. {en?"For data protection enquiries":"Für Datenschutzanfragen"}: <Mail/>. {en?"Further details can be found in the":"Weitere Angaben stehen im"} <Link className="text-primary underline" href={imprintPath(locale)}>{en?"imprint":"Impressum"}</Link>.</p>
      <p>{en
        ?"This policy covers smarttech.b2badgen.com and its delivery through the hosting platform. Linked, independently operated websites on b2badgen.com, interaktivierung.net, technology-provider domains and other external portals have their own privacy information."
        :"Diese Erklärung gilt für smarttech.b2badgen.com und die Auslieferung über die eingesetzte Hostingplattform. Eigenständige Angebote auf b2badgen.com, interaktivierung.net sowie verlinkte Anbieter- und Quellenportale haben eigene Datenschutzinformationen."}</p>
    </Section>
    <Section title={en?"2. Page requests, hosting and logs":"2. Seitenaufruf, Hosting und Protokolle"}>
      <p>{en
        ?"SmartTech uses Next.js/React and is hosted as a ChatGPT Sites project with Cloudflare-based delivery infrastructure. Unlike the static EU AI Gigafactories reference site, some SmartTech pages are generated or rendered by the application. When pages are requested, the systems involved may process IP addresses, timestamps, requested URLs, browser and operating-system information, referrers where transmitted, and technical error and security records."
        :"SmartTech verwendet Next.js/React und wird als ChatGPT-Sites-Projekt über eine Cloudflare-basierte Auslieferungsinfrastruktur bereitgestellt. Anders als die statische Referenzseite EU AI Gigafactories werden Teile von SmartTech durch die Anwendung erzeugt beziehungsweise gerendert. Beim Abruf können die beteiligten Systeme insbesondere IP-Adressen, Zeitpunkte, angeforderte URLs, Browser- und Betriebssystemangaben, gegebenenfalls übermittelte Referrer sowie technische Fehler- und Sicherheitsprotokolle verarbeiten."}</p>
      <p>{en
        ?"Purposes are page delivery, availability, troubleshooting and protection from abusive access. The legal basis for technically necessary operation is Article 6(1)(f) GDPR (legitimate interest in secure operation of the public information service)."
        :"Zwecke sind die Auslieferung der Seiten, Verfügbarkeit, Fehlerbehebung und Abwehr missbräuchlicher Zugriffe. Rechtsgrundlage des technisch notwendigen Betriebs ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse am sicheren Betrieb des öffentlich zugänglichen Informationsangebots)."}</p>
      <p>{en?"Recipients may include OpenAI and its hosting/delivery subprocessors. For users in the EEA, OpenAI identifies OpenAI Ireland Limited, 1st Floor, The Liffey Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, D01 YC43, Ireland. Its published subprocessor list includes Cloudflare, but not every listed processor necessarily handles data for every page request.":"Empfänger können OpenAI sowie mit Hosting und Auslieferung beauftragte Dienstleister sein. Für Nutzer im EWR nennt OpenAI OpenAI Ireland Limited, 1st Floor, The Liffey Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, D01 YC43, Irland. Die veröffentlichte Unterauftragnehmerliste nennt unter anderem Cloudflare; nicht jeder aufgeführte Dienstleister verarbeitet zwangsläufig Daten jedes Seitenaufrufs."} <External href="https://openai.com/policies/sub-processor-list/">{en?"Subprocessor list":"Unterauftragnehmerliste"}</External>, <External href="https://openai.com/policies/chatgpt-sites-data-processing-addendum/">{en?"ChatGPT Sites data-processing terms":"Datenverarbeitungsbedingungen für ChatGPT Sites"}</External>, <External href="https://openai.com/policies/eu-privacy-policy/">{en?"OpenAI EU privacy policy":"OpenAI-Datenschutzerklärung für Europa"}</External>.</p>
      <p>{en
        ?"Retention of hosting and security logs follows the applicable provider rules. The publisher has not verified a universally applicable maximum retention period and therefore does not promise deletion after a specific number of days."
        :"Die Speicherung von Hosting- und Sicherheitsprotokollen richtet sich nach den jeweils geltenden Regeln der Plattformdienstleister. Eine allgemein gültige maximale Löschfrist ist für den Herausgeber derzeit nicht verifiziert; deshalb wird keine pauschale Löschung nach einer bestimmten Zahl von Tagen zugesichert."}</p>
    </Section>
    <Section title={en?"3. Search, filters and technical functions":"3. Suche, Filter und technische Funktionen"}>
      <p>{en
        ?"SmartTech offers catalogue search and interactive category filters using JavaScript in the visitor's browser. Search terms and selections are used to display matching entries. Search terms, the selected portal, filters and the active tab are stored in the page URL and retained when switching language. The Share search button copies this URL to the clipboard; if clipboard access is unavailable, the link is displayed for manual copying. A shared URL therefore includes the search terms and selections. URLs and parameters sent to the server can therefore appear in technical request logs or be included in a URL shared by the visitor; browser-side filtering is not, by itself, a transmission to an AI model."
        :"SmartTech bietet Katalogsuche und interaktive Kategorienfilter, die per JavaScript im Browser passende Einträge anzeigen. Suchbegriffe und Auswahlzustände dienen der Darstellung von Treffern. Suchbegriffe, ausgewähltes Portal, Filter und aktiver Tab werden in der Seitenadresse gespeichert und beim Sprachwechsel beibehalten. Die Funktion Suche teilen kopiert diese Adresse in die Zwischenablage; falls dies technisch nicht möglich ist, wird der Link zum manuellen Kopieren angezeigt. Ein geteilter Link enthält daher auch die Suchbegriffe und Auswahlzustände. Beim Aufruf übermittelte URLs und Parameter können daher in technischen Anfrageprotokollen erscheinen oder bei einer Weitergabe der Adresse enthalten sein; ein rein browserseitiger Filtervorgang ist für sich genommen keine Übermittlung an ein KI-Modell."}</p>
      <p>{en
        ?"The inspected application code does not implement its own analytics tracker or persistent storage of catalogue searches in localStorage or sessionStorage. The browser may cache site files. The hosting platform's independent functions and storage are addressed separately below."
        :"Im geprüften Anwendungscode ist weder ein eigener Analysedienst noch eine dauerhafte Speicherung von Katalogsuchbegriffen in Local Storage oder Session Storage vorgesehen. Der Browser kann ausgelieferte Dateien zwischenspeichern. Unabhängige Funktionen und Speicherungen der Hostingplattform werden nachfolgend gesondert behandelt."}</p>
      <p>{en
        ?"The repository provides a helper for optional ChatGPT sign-in, but the inspected public catalogue pages do not require registration or sign-in. If sign-in, user accounts or community submissions are activated later, the privacy information must first be supplemented for the resulting data processing."
        :"Das Repository enthält eine Hilfsfunktion für eine mögliche ChatGPT-Anmeldung. Die geprüften öffentlichen Katalogseiten verlangen derzeit jedoch keine Registrierung oder Anmeldung. Werden Anmeldung, Benutzerkonten oder Community-Einreichungen künftig aktiviert, muss diese Datenschutzerklärung zuvor um die damit verbundene Verarbeitung ergänzt werden."}</p>
      <p>{en
        ?"Cloudflare D1 database and R2 object-storage bindings are not enabled in the inspected hosting configuration. Their presence as supported technologies or code dependencies does not establish active processing of visitor data."
        :"Cloudflare-D1-Datenbank und R2-Objektspeicher sind in der geprüften Hostingkonfiguration nicht aktiviert. Ihre technische Vorsehung im Projekt oder in Abhängigkeiten belegt keine aktive Verarbeitung von Besucherdaten über diese Dienste."}</p>
    </Section>
    <Section title={en?"4. Cookies and comparable storage":"4. Cookies und vergleichbare Speicherung"}>
      <p>{en
        ?"The inspected SmartTech application code does not set its own advertising or analytics cookies. Independently, the hosting and security platform may use cookies for bot protection, challenges or visitor handling. The following cookie names are known from an observation of the related EU AI Gigafactories ChatGPT Sites service on 5 October 2026; their presence, lifetime and purpose on SmartTech have not yet been confirmed by a production browser test:"
        :"Der geprüfte SmartTech-Anwendungscode setzt keine eigenen Werbe- oder Analyse-Cookies. Davon unabhängig kann die Hosting- und Sicherheitsplattform Cookies zur Bot-Abwehr, für Sicherheitsprüfungen oder zur Besucherbehandlung einsetzen. Die folgenden Cookie-Namen wurden am 5. Oktober 2026 bei dem verwandten ChatGPT-Sites-Angebot EU AI Gigafactories beobachtet; ihr konkretes Auftreten, ihre Laufzeit und ihre Verwendung auf SmartTech sind bislang nicht durch einen Browser-Test der produktiven Website bestätigt:"}</p>
      <ul className="list-disc space-y-2 pl-5">
        <li><code>__cf_bm</code> – {en?"Cloudflare bot protection; provider documentation describes expiry after 30 minutes of inactivity.":"Cloudflare-Bot-Abwehr; laut Anbieter Ablauffrist nach 30 Minuten Inaktivität."}</li>
        <li><code>cf_clearance</code> – {en?"Cloudflare challenge outcome; duration depends on configuration.":"Cloudflare-Sicherheitsprüfung; die Gültigkeit hängt von der Konfiguration ab."}</li>
        <li><code>__Host-appgarden-visitor</code> – {en?"Platform visitor cookie observed on the related site. Its exact purpose and binding retention period are not documented to the publisher; it is not classified as technically necessary without verification.":"Auf dem verwandten Angebot beobachtetes Plattform-Besuchercookie. Der genaue Zweck und die verbindliche Speicherdauer sind dem Herausgeber nicht dokumentiert; es wird ohne Prüfung nicht als technisch erforderlich eingestuft."}</li>
      </ul>
      <p>{en
        ?"A browser test of the deployed SmartTech domain is required before stating which cookies are actually used. Where consent is legally required for non-essential storage or access to terminal equipment, the applicable consent requirements remain in force; a disclosure alone does not replace that consent."
        :"Vor einer abschließenden Aufstellung der tatsächlich eingesetzten Cookies ist ein Browser-Test der veröffentlichten SmartTech-Domain erforderlich. Soweit für nicht notwendige Speicherung oder den Zugriff auf Endgeräte eine Einwilligung gesetzlich erforderlich ist, bleibt diese Pflicht bestehen; ein Hinweistext ersetzt eine solche Einwilligung nicht."} <External href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/">{en?"Cloudflare cookie documentation":"Cloudflare-Cookie-Dokumentation"}</External>.</p>
    </Section>
    <Section title={en?"5. Fonts and external resources":"5. Schriftarten und externe Ressourcen"}>
      <p>{en
        ?"The website integrates Geist and Geist Mono using next/font. The inspected source and build artifacts include locally hosted font files, rather than a deliberate direct browser load from Google Fonts. Whether production responses actually avoid third-party font requests should be checked through the browser network panel after deployment."
        :"Die Website bindet Geist und Geist Mono über next/font ein. Im geprüften Quell- und Buildstand sind lokal ausgelieferte Schriftdateien vorhanden, statt eines vorgesehenen direkten Nachladens von Google Fonts im Browser. Ob beim produktiven Aufruf tatsächlich keine Schriften von Drittservern angefordert werden, ist nach der Veröffentlichung im Netzwerkprotokoll des Browsers zu prüfen."}</p>
      <p>{en
        ?"External provider sites, original publications and other third-party services are predominantly linked, not automatically opened. Following a link establishes a connection to that site's operator and their separate privacy terms."
        :"Externe Anbieterwebsites, Originalpublikationen und sonstige Drittangebote werden überwiegend verlinkt und nicht automatisch geöffnet. Erst beim Aufrufen eines solchen Links verbindet sich der Browser mit dem jeweiligen Betreiber; dort gelten dessen Datenschutzinformationen."}</p>
    </Section>
    <Section title={en?"6. Contact by email":"6. Kontakt per E-Mail"}>
      <p>{en
        ?"If you send an email, the sender address, message and any attachments are processed for handling and responding to your enquiry. The email providers involved in transmission and delivery also process data. The legal basis is Article 6(1)(f) GDPR, or Article 6(1)(b) GDPR for contractual matters. Information is retained as necessary for handling requests and claims, subject to statutory retention duties. Contact is voluntary; the public catalogue does not provide a contact form or newsletter subscription."
        :"Wenn Sie eine E-Mail senden, werden Absenderadresse, Nachricht und gegebenenfalls Anhänge zur Bearbeitung und Beantwortung verarbeitet. An Übermittlung und Zustellung sind die jeweiligen E-Mail-Dienstleister beteiligt. Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO beziehungsweise bei vertragsbezogenen Anfragen Artikel 6 Absatz 1 Buchstabe b DSGVO. Angaben werden so lange aufbewahrt, wie dies zur Bearbeitung von Anfragen und Ansprüchen erforderlich ist; gesetzliche Aufbewahrungspflichten bleiben bestehen. Die Kontaktaufnahme ist freiwillig; der öffentliche Katalog bietet kein Kontaktformular und keine Newsletter-Anmeldung."}</p>
    </Section>
    <Section title={en?"7. AI-supported editorial work and personal information in content":"7. KI-gestützte Redaktion und personenbezogene Inhaltsangaben"}>
      <p>{en
        ?"AI tools, including OpenAI Codex, may be used for editorial research, structure, translation and software development. This does not mean that visitor search queries or filter clicks are passed to those tools; the inspected public pages contain no visitor AI chat."
        :"Bei Recherche, Strukturierung, Übersetzung und technischer Pflege können KI-Werkzeuge, insbesondere OpenAI Codex, mitwirken. Daraus folgt nicht, dass Suchbegriffe oder Filterklicks von Besuchern an solche Werkzeuge weitergeleitet werden; die geprüften öffentlichen Seiten enthalten keinen KI-Besucherchat."}</p>
      <p>{en
        ?"Publicly documented personal information, such as named authors or company representatives, may appear where relevant to sourced reporting. The legal basis, insofar as personal data are processed, is Article 6(1)(f) GDPR and the legitimate interest in traceable editorial information. Please report incorrect details or overriding legitimate interests to the controller."
        :"Öffentlich belegte personenbezogene Angaben, etwa zu Autoren oder Unternehmensvertretern, können erscheinen, soweit sie für nachvollziehbare Quellenberichterstattung relevant sind. Rechtsgrundlage ist insoweit Artikel 6 Absatz 1 Buchstabe f DSGVO und das berechtigte Interesse an überprüfbarer redaktioneller Information. Unzutreffende Angaben oder überwiegende schutzwürdige Belange können dem Verantwortlichen gemeldet werden."}</p>
    </Section>
    <Section title={en?"8. Third-country processing":"8. Verarbeitung außerhalb des Europäischen Wirtschaftsraums"}>
      <p>{en
        ?"Hosting services and other processors may process personal data outside the EEA, in particular in the United States. OpenAI describes adequacy decisions or EU Standard Contractual Clauses as relevant safeguards in its data-processing terms. Applicable recipients, locations and safeguards depend on the processing and contractual arrangements; details may be requested from the controller."
        :"Bei Hosting und sonstigen Dienstleistern kann es zu Verarbeitungen außerhalb des Europäischen Wirtschaftsraums kommen, insbesondere in den USA. OpenAI beschreibt Angemessenheitsbeschlüsse und EU-Standardvertragsklauseln als mögliche Schutzmechanismen in seinen Datenverarbeitungsbedingungen. Empfänger, Orte und Schutzmaßnahmen hängen von der konkreten Verarbeitung und Vertragslage ab; nähere Angaben können beim Verantwortlichen erfragt werden."}</p>
    </Section>
    <Section title={en?"9. Your rights":"9. Ihre Rechte"}>
      <p>{en
        ?"Subject to the legal conditions, you may request access, rectification, erasure, restriction, data portability and withdrawal of consent with future effect, where consent is the legal basis. You may object to processing based on Article 6(1)(f) GDPR for reasons relating to your particular situation."
        :"Nach Maßgabe der gesetzlichen Voraussetzungen bestehen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Eine erteilte Einwilligung kann mit Wirkung für die Zukunft widerrufen werden. Gegen Verarbeitungen auf Grundlage von Artikel 6 Absatz 1 Buchstabe f DSGVO können Sie aus Gründen Ihrer besonderen Situation Widerspruch einlegen."}</p>
      <p>{en?"Please contact":"Bitte wenden Sie sich hierzu an"} <Mail/>. {en?"You may also lodge a complaint with a data protection supervisory authority, especially at your residence, workplace or the place of the alleged infringement. For private controllers based in Bavaria, the Bavarian State Office for Data Protection Supervision is one possible authority.":"Sie können sich zudem bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere am Aufenthaltsort, Arbeitsplatz oder Ort des vermuteten Verstoßes. Für private Verantwortliche mit Sitz in Bayern ist das Bayerische Landesamt für Datenschutzaufsicht eine mögliche Anlaufstelle."} <External href="https://www.lda.bayern.de/de/beschwerde.html">{en?"Complaint information":"Informationen zur Beschwerde"}</External>.</p>
    </Section>
    <Section title={en?"10. Version and changes":"10. Stand und Änderungen"}>
      <p>{en?"Last editorial update":"Redaktioneller Stand"}: 20. Oktober 2026. {en
        ?"This document reflects the application configuration inspected for the current proposed code revision. Statements requiring a production browser test, especially exact platform cookies and retention periods, are expressly marked as unverified. This policy must be adapted when features, service providers or legal requirements change."
        :"Diese Erklärung berücksichtigt den geprüften Anwendungs- und Konfigurationsstand der vorliegenden Codeänderung. Angaben, die einen produktiven Browser-Test erfordern, insbesondere konkrete Plattformcookies und deren Laufzeiten, sind ausdrücklich als noch nicht bestätigt gekennzeichnet. Bei Änderungen von Funktionen, Dienstleistern oder rechtlichen Anforderungen wird die Erklärung angepasst."} <External href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679">{en?"EU General Data Protection Regulation":"Datenschutz-Grundverordnung"}</External>.</p>
    </Section>
  </article>;
}
export function LegalPage({locale,kind}:{locale:Locale;kind:Kind}){
  const en=locale==="en",privacy=kind==="privacy";
  const other=privacy?imprintPath(locale):privacyPath(locale);
  const translated=privacy?privacyPath(en?"de":"en"):imprintPath(en?"de":"en");
  return <main id="legal-content" className="mx-auto max-w-[920px] px-5 py-10 lg:px-10">
    <a href="#legal-content" className="sr-only focus:not-sr-only">{en?"Skip to legal content":"Direkt zum Inhalt"}</a>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Link href={en?"/en":"/"} className="text-sm font-semibold text-primary hover:underline">← {en?"Back to SmartTech":"Zurück zu SmartTech"}</Link>
      <LanguageToggle locale={locale} href={translated}/>
    </div>
    <p className="section-kicker mt-10">{en?"Legal information · 20 October 2026":"Rechtliche Informationen · 20. Oktober 2026"}</p>
    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{privacy?(en?"Privacy policy":"Datenschutzerklärung"):(en?"Imprint and contributors":"Impressum und Mitwirkende")}</h1>
    <LegalNav locale={locale} kind={kind}/>
    {privacy?<Privacy locale={locale}/>:<Imprint locale={locale}/>}
    <div className="mt-12 border-t pt-6 text-sm"><Link className="text-primary underline underline-offset-2" href={other}>{privacy?(en?"Imprint":"Zum Impressum"):(en?"Privacy policy":"Zur Datenschutzerklärung")}</Link> · <a className="text-primary underline underline-offset-2" href={site}>{en?"SmartTech home":"SmartTech-Startseite"}</a></div>
  </main>;
}
