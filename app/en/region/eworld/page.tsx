import {EworldRegionPage,eworldRegionMetadata} from "../../../eworld-region-page";
export const metadata=eworldRegionMetadata("en");
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const params=await searchParams;return <EworldRegionPage locale="en" query={typeof params.q==="string"?params.q:""}/>;}
