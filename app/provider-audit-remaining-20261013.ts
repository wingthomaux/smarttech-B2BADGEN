import records from "./provider-audit-remaining-20261013.json";
const pending=new Map(records.filter(row=>!["profiled","normalized","excluded"].includes(row.decision)).map(row=>[row.name,row]));
export const providerAuditFor=(name:string)=>pending.get(name);
export const hasPendingProviderAudit=(name:string)=>pending.has(name);
