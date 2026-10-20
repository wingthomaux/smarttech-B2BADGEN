import type {Metadata} from "next";
import {LegalPage} from "../legal-pages";
export const metadata:Metadata={title:"Datenschutzerklärung | SmartTech",description:"Hinweise zur Datenverarbeitung, Hosting, Cookies, Suche und Datenschutzrechten bei SmartTech.",alternates:{canonical:"/datenschutz",languages:{"de-DE":"/datenschutz","en":"/en/privacy"}}};
export default function Page(){return <LegalPage locale="de" kind="privacy"/>;}
