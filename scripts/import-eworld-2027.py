"""Import the user-supplied semicolon CSV. Never copy contacts or account notes."""
import csv,json,re,unicodedata,sys,collections
from pathlib import Path
root=Path(__file__).resolve().parents[1]
catalog=json.loads((root/'app/catalog.generated.json').read_text())
def norm(s):
 s=unicodedata.normalize('NFKD',s.casefold()).replace('ß','ss')
 s=re.sub(r'\b(gmbh|co|kg|ag|inc|ltd|limited|llc|se|corporation)\b','',s)
 return re.sub(r'[^a-z0-9]','',s)
previous=root/'app/eworld-2027.generated.json'
event_only={entry['provider'] for entry in json.loads(previous.read_text()) if not entry['existing']} if previous.exists() else set()
index=collections.defaultdict(set)
for p in catalog['companies']:
 if p['name'] in event_only:continue
 for alias in [p['name']]+p['variants']:index[norm(alias)].add(p['name'])
manual={'Power Plus Communications AG':'Power Plus Communications AG (PPC)'}
rows=list(csv.DictReader(open(sys.argv[1],encoding='utf-8-sig'),delimiter=';'))
assert len(rows)==798
result=[]
for row in rows:
 name=row['Aussteller'].strip(); matches=index[norm(name)]
 assert len(matches)<2,(name,matches)
 provider=manual.get(name) or (next(iter(matches)) if matches else name)
 url=row['Ausstellerprofil-URL']; assert url.startswith('https://community.e-world-essen.com/organizations/allExhibitors/')
 description=' '.join(row['Unternehmen – Kurzinfo (Profiltext, gekürzt)'].split())
 # Keep a clearly marked short source excerpt, without synthetic portfolio claims.
 if len(description)>420:description=description[:417].rsplit(' ',1)[0]+'…'
 result.append(dict(name=name,provider=provider,existing=bool(matches or name in manual),url=url,city=row['Ort'].strip(),country=row['Land'].strip(),exhibitorType=row['Ausstellerart'].strip(),hall=row['Halle'].strip(),stand=row['Stand'].strip(),description=description,sourceDate=row['Abrufdatum']))
assert len({x['provider'] for x in result})==len(result)
(root/'app/eworld-2027.generated.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('Existing:',sum(x['existing'] for x in result),'New:',sum(not x['existing'] for x in result),'Without description:',sum(not x['description'] for x in result))
