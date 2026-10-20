import type {Metadata} from "next";
import {LegalPage} from "../../legal-pages";
export const metadata:Metadata={title:"Privacy policy | SmartTech",description:"Information on hosting, security, cookies, catalogue filters, and your rights.",alternates:{canonical:"/en/privacy",languages:{"de-DE":"/datenschutz","en":"/en/privacy"}}};
export default function Page(){return <LegalPage locale="en" kind="privacy"/>;}
