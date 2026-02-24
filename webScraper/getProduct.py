import sys
from databaseFunc import getSpecificItemData
import json

productName = sys.argv[1]

results = getSpecificItemData(productName)

if results:
    print(json.dumps(results))
else:
    print(json.dumps([]))