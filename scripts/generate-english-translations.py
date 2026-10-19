#!/usr/bin/env python3
"""Generate the checked-in English catalogue without sending catalogue data away.

Requires the local Argos Translate German-to-English model. The generated JSON is
the only runtime dependency; builds and deployments never need the model.
"""

import json
from datetime import datetime, timezone
from pathlib import Path

import ctranslate2
import sentencepiece

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "app" / "catalog.generated.json"
OUTPUT_PATH = ROOT / "app" / "translations.en.generated.json"
MODEL_ROOT = Path.home() / ".local/share/argos-translate/packages/translate-de_en-1_3"
FIELDS = ("title", "space", "challenge", "solution", "delivery", "lifecycle", "format", "note", "stage")

catalog = json.loads(CATALOG_PATH.read_text())
previous = {"translations": {}}
if OUTPUT_PATH.exists():
    previous = json.loads(OUTPUT_PATH.read_text())

strings: dict[str, None] = {}
for item in catalog["knowledge"]:
    for field in FIELDS:
        value = item.get(field)
        if isinstance(value, str) and value.strip():
            strings[value.strip()] = None
    for value in item.get("related", []):
        if value.strip():
            strings[value.strip()] = None
for provider in catalog["companies"]:
    for item in provider["items"]:
        if item.get("t", "").strip():
            strings[item["t"].strip()] = None
for value in ("Beobachtet", "Kuratiert", "Community", "Anbieterzuordnung"):
    strings[value] = None

translations = dict(previous.get("translations", {}))
pending = [value for value in strings if value not in translations]
if pending:
    if not (MODEL_ROOT / "model/model.bin").exists():
        raise SystemExit("Missing local Argos Translate de_en 1.3 model")
    processor = sentencepiece.SentencePieceProcessor(model_file=str(MODEL_ROOT / "sentencepiece.model"))
    translator = ctranslate2.Translator(str(MODEL_ROOT / "model"), device="cpu")
    for offset in range(0, len(pending), 512):
        source = pending[offset : offset + 512]
        tokens = [processor.encode(value, out_type=str) for value in source]
        results = translator.translate_batch(tokens, batch_type="tokens", max_batch_size=2048)
        for value, result in zip(source, results, strict=True):
            translations[value] = processor.decode(result.hypotheses[0]).strip() or value
        print(f"Translated {min(offset + len(source), len(pending))}/{len(pending)} strings")

ordered = {value: translations.get(value, value) for value in sorted(strings, key=str.casefold)}
payload = {
    "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    "sourceCount": len(strings),
    "translations": ordered,
}
OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n")
print(f"Wrote {len(strings)} English translations to {OUTPUT_PATH}")
