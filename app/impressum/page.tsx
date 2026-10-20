import type {Metadata} from "next";
import {LegalPage} from "../legal-pages";
export const metadata:Metadata={title:"Impressum und Mitwirkende | SmartTech",description:"Anbieterkennzeichnung und redaktionelle Verantwortung für SmartTech.",alternates:{canonical:"/impressum",languages:{"de-DE":"/impressum","en":"/en/imprint"}}};
export default function Page(){return <LegalPage locale="de" kind="imprint"/>;}
