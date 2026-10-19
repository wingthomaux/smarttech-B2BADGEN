import {PortalDetail} from "@/app/portal-pages";
import {getPortal,portalPath} from "@/app/portal-directory";
import {notFound} from "next/navigation";
type Props={params:Promise<{slug:string}>;searchParams:Promise<{page?:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const portal=getPortal(slug);if(!portal)notFound();return {title:`${portal.title??portal.name} | SmartTech`,description:portal.descriptionEn,alternates:{canonical:portalPath(portal.name,"en"),languages:{"de-DE":portalPath(portal.name),en:portalPath(portal.name,"en")}}}}
export default async function Page({params,searchParams}:Props){const {slug}=await params;const {page}=await searchParams;return <PortalDetail slug={slug} page={page} locale="en"/>}
