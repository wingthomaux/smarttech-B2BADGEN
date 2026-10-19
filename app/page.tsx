import SmartTechPortal from "./smarttech-portal";
import {safeJsonLd} from "./detail-components";
import type {Metadata} from "next";
export const metadata:Metadata={alternates:{canonical:"/",languages:{"de-DE":"/","en":"/en"}}};
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const taxonomyQuery=await searchParams;const jsonLd={"@context":"https://schema.org","@type":"CollectionPage","@id":"https://smarttech.b2badgen.com/","url":"https://smarttech.b2badgen.com/","name":"SmartTech – Offener Technologiewissens-Katalog",description:"Offener Katalog für kaufbares B2B-Technologiewissen, Anbieter, Lösungen, Whitepaper, Studien und Fachbeiträge.",inLanguage:"de",isPartOf:{"@type":"WebSite",name:"SmartTech",url:"https://smarttech.b2badgen.com/"}};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/><SmartTechPortal taxonomyQuery={taxonomyQuery}/></>}
