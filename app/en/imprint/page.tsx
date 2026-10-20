import type {Metadata} from "next";
import {LegalPage} from "../../legal-pages";
export const metadata:Metadata={title:"Imprint and contributors | SmartTech",description:"Provider and editorial responsibility information for SmartTech.",alternates:{canonical:"/en/imprint",languages:{"de-DE":"/impressum","en":"/en/imprint"}}};
export default function Page(){return <LegalPage locale="en" kind="imprint"/>;}
