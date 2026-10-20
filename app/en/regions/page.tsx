import {RegionOverview} from "@/app/region-pages";
export const metadata={"title": "Regions – local providers | SmartTech", "description": "Find providers by country, federal state and canton: documented locations with official sources and links to SmartTech profiles.", "alternates": {"canonical": "/en/regions", "languages": {"de-DE": "/regionen", "en": "/en/regions"}}};
export default function Page(){return <RegionOverview locale="en"/>}
