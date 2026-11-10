import {FunctionsPage,functionMetadata} from "@/app/function-pages";
import {functionProfiles} from "@/app/function-catalog";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return functionProfiles.map(item=>({slug:item.slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;return functionMetadata("de",slug);}
export default async function Page({params}:Props){const {slug}=await params;return <FunctionsPage locale="de" slug={slug}/>;}
