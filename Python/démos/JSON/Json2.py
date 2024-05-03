import json
import os
path = "démos/JSON/data.json"

if os.path.exists(path):
    with open(path, 'r',encoding='utf8') as fichier:
        data = json.load(fichier)
        print(data)
else:
    with open(path,'w',encoding='utf8') as fichier:
        json.dump({'hunger': True, 'moné': False}, fichier, indent=4, ensure_ascii=False)

