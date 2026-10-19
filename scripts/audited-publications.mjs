// Explicit editorial exclusions retain raw source history while defining active coverage.
export function activeAuditedPublications(publications,audit){
  const excluded=new Set(audit.filter(row=>row.decision==="excluded").flatMap(row=>row.articles.map(item=>item.url)));
  return publications.filter(item=>!excluded.has(item.u));
}
