import {RegionDetail} from "@/app/region-pages";
import {getRegion,regionPath} from "@/app/regions";
import {notFound} from "next/navigation";
type Props={params:Promise<{slug:string}>;searchParams:Promise<{q?:string;kind?:string}>};
export async function generateMetadata({params,searchParams}:Props){const {slug}=await params;const region=getRegion(slug);if(!region)notFound();const search=await searchParams;return {title:`Providers in ${region.name.en} | SmartTech`,description:`Providers with documented locations in ${region.name.en}: company profiles, location types and official sources.`,alternates:{canonical:regionPath(slug,"en"),languages:{"de-DE":regionPath(slug),en:regionPath(slug,"en")}},...((search.q||search.kind)?{robots:{index:false,follow:true}}:{})}}
export default async function Page({params,searchParams}:Props){const {slug}=await params;const {q,kind}=await searchParams;return <RegionDetail slug={slug} locale={"en"} query={q} kind={kind}/>}
