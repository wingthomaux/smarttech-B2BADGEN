// Repeated catalogue strings are stored once. Negative integers reference the
// dictionary; source IDs, scores and publication offsets are non-negative.
export function decodePortalData(strings:string[],value:unknown):unknown{
  if(typeof value==="number"&&value<0)return strings[-value-1];
  if(Array.isArray(value))return value.map(item=>decodePortalData(strings,item));
  if(value&&typeof value==="object")return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,decodePortalData(strings,item)]));
  return value;
}
