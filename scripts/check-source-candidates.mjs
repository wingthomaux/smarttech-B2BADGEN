import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const [config,state,queue]=await Promise.all([
  readFile(new URL("../public/data/source-candidates/weka-downloads.config.json",import.meta.url),"utf8").then(JSON.parse),
  readFile(new URL("../public/data/source-state/weka-downloads.json",import.meta.url),"utf8").then(JSON.parse),
  readFile(new URL("../public/data/source-review/weka-downloads.pending.json",import.meta.url),"utf8").then(JSON.parse),
]);
assert.equal(config.status,"active_with_review_gate");
assert.equal(config.automaticPublication,false);
assert.equal(config.approvedInventory.itemCount,61);
assert.equal(config.approvedInventory.publicationYear,2026);
assert.equal(config.newItemDetection,"persistent_url_set_difference");
assert.equal(config.publicationDateSource,"original_page_metadata_not_sitemap_lastmod");
assert.equal(state.sourceId,config.id);
assert(state.knownUrls.length>=100);
assert.equal(new Set(state.knownUrls).size,state.knownUrls.length);
assert.equal(queue.sourceId,config.id);
assert(queue.items.every(item=>item.status==="pending_original_page_review"));
console.log(`Validated active WEKA source with ${config.approvedInventory.itemCount} approved publications, ${state.knownUrls.length} monitored URLs and ${queue.items.length} pending candidates.`);
