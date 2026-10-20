import {RegionDetail} from "@/app/region-pages";
import {getRegion,regionPath} from "@/app/regions";
import {notFound} from "next/navigation";
type Props={params:Promise<{slug:string}>;searchParams:Promise<{q?:string;kind?:string}>};
export async function generateMetadata({params,searchParams}:Props){const {slug}=await params;const region=getRegion(slug);if(!region)notFound();const search=await searchParams;return {title:`Anbieter in ${region.name.de} | SmartTech`,description:`Anbieter mit belegten Standorten in ${region.name.de}: Unternehmensprofile, Standortarten und offizielle Quellen.`,alternates:{canonical:regionPath(slug,"de"),languages:{"de-DE":regionPath(slug),en:regionPath(slug,"en")}},...((search.q||search.kind)?{robots:{index:false,follow:true}}:{})}}
export default async function Page({params,searchParams}:Props){const {slug}=await params;const {q,kind}=await searchParams;return <RegionDetail slug={slug} locale={"de"} query={q} kind={kind}/>}
