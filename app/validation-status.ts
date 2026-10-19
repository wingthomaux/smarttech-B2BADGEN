import validationLedgerData from "./validation-ledger.json";

type ValidationBatch={id:string;reviewedAt:string;assetIds:number[]};
type ValidationLedger={version:number;batches:ValidationBatch[]};

const validationLedger=validationLedgerData as ValidationLedger;
const validationByKnowledgeId=new Map<number,{batchId:string;reviewedAt:string}>();

for(const batch of validationLedger.batches){
  for(const assetId of batch.assetIds){
    if(validationByKnowledgeId.has(assetId))throw new Error(`Asset ${assetId} is present in more than one validation batch`);
    validationByKnowledgeId.set(assetId,{batchId:batch.id,reviewedAt:batch.reviewedAt});
  }
}

export function validationForKnowledge(knowledgeId:number){return validationByKnowledgeId.get(knowledgeId)}
export function isEditoriallyValidated(knowledgeId:number){return validationByKnowledgeId.has(knowledgeId)}
