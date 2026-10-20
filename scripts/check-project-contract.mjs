import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const json=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),"utf8"));
const [hosting,contract]=await Promise.all([json("../.openai/hosting.json"),json("../.openai/project-contract.json")]);
assert.equal(hosting.project_id,contract.project_id,"Hosting project differs from the established production project.");
assert.equal(contract.github_repository,"wingthomaux/smarttech-B2BADGEN");
console.log(`Project contract verified: ${hosting.project_id}, canonical source ${contract.github_repository}.`);
