import type {KnowledgeItem,Provider} from "./catalog";

// Search and detail pages share the generated catalogue, including new source batches.
export function buildSearchCatalog(catalog:{knowledge:KnowledgeItem[];companies:Provider[]}){
  const knowledgeById=new Map(catalog.knowledge.map(item=>[item.id,item]));
  return {
    knowledge:catalog.knowledge,
    publications:catalog.companies.flatMap(company=>company.items),
    companies:catalog.companies.map(company=>({...company,knowledge:company.knowledge.map(id=>knowledgeById.get(id)).filter((item):item is KnowledgeItem=>!!item)})),
  };
}
