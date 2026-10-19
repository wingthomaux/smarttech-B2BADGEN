import type {KnowledgeItem} from "./catalog";
import {taxonomyFacetPath} from "./catalog-paths";
import {Fact,TaxonomyLink} from "./detail-components";
import {englishText} from "./english";
import {mediaSpace} from "./media-taxonomy";

export function MediaTaxonomyFacts({item,locale="de"}:{item:KnowledgeItem;locale?:"de"|"en"}){
  if(!item.mediaArea)return null;
  const en=locale==="en";
  const tx=(value:string)=>en?englishText(value):value;
  const links=(values:string[],facet:"channel"|"topic")=>values.map((value,index)=><span key={value}>{index>0&&" · "}<TaxonomyLink href={taxonomyFacetPath(mediaSpace,facet,value,locale)}>{tx(value)}</TaxonomyLink></span>);
  return <>
    <Fact label={en?"Media area":"Medienbereich"} value={<TaxonomyLink href={taxonomyFacetPath(mediaSpace,"area",item.mediaArea,locale)}>{tx(item.mediaArea)}</TaxonomyLink>}/>
    {!!item.relatedMediaAreas?.length&&<Fact label={en?"Additional media areas":"Weitere Medienbereiche"} value={item.relatedMediaAreas.map((area,index)=><span key={area}>{index>0&&" · "}<TaxonomyLink href={taxonomyFacetPath(mediaSpace,"area",area,locale)}>{tx(area)}</TaxonomyLink></span>)}/>}
    {!!item.channels?.length&&<Fact label={en?"Channels":"Kanäle"} value={links(item.channels,"channel")}/>}
    {!!item.topics?.length&&<Fact label={en?"Cross-cutting topics":"Querschnittsthemen"} value={links(item.topics,"topic")}/>}
  </>;
}
