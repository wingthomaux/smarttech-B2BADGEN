import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {headers} from "next/headers";
import {DocumentLanguage} from "./document-language";
import {SiteLegalFooter} from "./site-legal-footer";
const geist=Geist({variable:"--font-geist",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});
export const metadata:Metadata={metadataBase:new URL("https://smarttech.b2badgen.com"),title:{default:"SmartTech – Offener Technologiewissens-Katalog",template:"%s"},description:"Whitepaper, Studien, Webcasts und Fachbeiträge über Anbieter- und Portalgrenzen hinweg entdecken.",alternates:{canonical:"/"},icons:{icon:{url:"/favicon.svg",type:"image/svg+xml"},shortcut:"/favicon.svg"},openGraph:{type:"website",locale:"de_DE",siteName:"SmartTech",title:"SmartTech – Offener Technologiewissens-Katalog",description:"Kaufbares B2B-Technologiewissen über Anbieter- und Portalgrenzen hinweg entdecken.",url:"/"}};
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){const language=(await headers()).get("x-smarttech-language")==="en"?"en":"de";return <html lang={language}><body className={`${geist.variable} ${mono.variable} antialiased`}><DocumentLanguage/>{children}<SiteLegalFooter/></body></html>}
