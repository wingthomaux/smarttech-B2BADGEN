import accountOwnersData from "./account-owners.generated.json";
import directExtensionsData from "./account-owner-direct-extensions.json";
import inferredOwnersData from "./account-owner-inferences.json";

type AccountOwners={generatedAt:string;sourceFile:string;matchedProviders:number;matches:Record<string,string>};
const accountOwners=accountOwnersData as AccountOwners;
const directExtensions=directExtensionsData.matches as Record<string,string>;
const inferredOwners=inferredOwnersData.matches as Record<string,string>;

export function ownerCodeForProvider(provider:string){return accountOwners.matches[provider]||directExtensions[provider]||inferredOwners[provider]}
export function ownerMatchTypeForProvider(provider:string){
  if(accountOwners.matches[provider]||directExtensions[provider])return "direct" as const;
  if(inferredOwners[provider])return "inferred" as const;
}
export function providerAccountLabel(provider:string){const code=ownerCodeForProvider(provider);return code?`${provider} (${code})`:provider}
