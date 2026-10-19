import {providerFamily} from "./provider-normalization";

type PublicationLike={id:number;c:string};

const hZwoBProviderByPublicationId:Record<number,string>={
  46:"enclaive",
  130:"STARFACE",
  196:"Gamma Communications",
  282:"Gamma Communications",
  375:"enclaive",
  754:"Gamma Communications",
  998:"estos",
  1214:"enclaive",
  1290:"enclaive",
  1426:"STARFACE",
  1719:"Gamma Sales",
  1894:"Gamma Sales",
  1945:"STARFACE",
  2309:"STARFACE",
  2310:"estos",
  2577:"STARFACE",
  2620:"enclaive",
  2889:"enclaive",
  2999:"estos",
  3181:"STARFACE",
  3269:"Gamma Communications",
  3367:"STARFACE",
  3503:"Gamma Sales",
  3568:"enclaive",
};

export const hZwoBIntermediary="H Zwo B Kommunikations GmbH";

export function publicationAttribution(item:PublicationLike){
  const provider=hZwoBProviderByPublicationId[item.id];
  return provider?{provider,via:hZwoBIntermediary}:{provider:providerFamily(item.c)};
}

export function publicationProvider(item:PublicationLike){return publicationAttribution(item).provider}
