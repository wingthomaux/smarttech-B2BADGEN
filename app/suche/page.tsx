import {RecoverySearchPage,recoveryMetadata} from "../recovery-search-page";
export const metadata=recoveryMetadata("de");
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const params=await searchParams;return <RecoverySearchPage locale="de" query={typeof params.q==="string"?params.q:""}/>;}
