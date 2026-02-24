from bs4 import BeautifulSoup
import requests
import time
from databaseFunc import insertData, getSpecificItemData
import time

def webRequest(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    attemps = 5
    for i in range(attemps):
        try:
            response = requests.get(url, headers=headers, timeout=20)

            if response.status_code == 200:
                return response.json()
            else:
                print('Request Failed, Trying Again...')
                time.sleep(5)
                
        except(requests.exceptions.ConnectionError):
            print('Request Failed, Trying Again...')
            time.sleep(5)

def webhallenSoup(webhallenResponse):
    for p in webhallenResponse['products']:
        
        link = 'https://www.webhallen.com/se/product/' + str(p.get('id'))
        
        stockChange = insertData('webhallen', 
                                 p.get('id'), 
                                 p.get('name'), 
                                 link, p.get('price', {}).get('price'), 
                                 p.get('stock', {}).get('web', {}) if isinstance(p.get('stock'), dict) else 0)
        
        if stockChange:
            print("New Stock For " + p.get('name') + "! Link: " + link)            

def checkSites():
    #print('Checking Webhallen...')
    #Pokemon
    webhallenSoup(webRequest('https://www.webhallen.com/api/productdiscovery/category/4661?page=1&touchpoint=DESKTOP&totalProductCountSet=false'))
    #OnePiece
    webhallenSoup(webRequest('https://www.webhallen.com/api/productdiscovery/category/16961?page=1&touchpoint=DESKTOP&totalProductCountSet=false'))
    
def main():
    try:
        while(True):
            checkSites()
            time.sleep(100)
    except(KeyboardInterrupt):
        print('Quitting Program...')
    
main()

#for itemData in getSpecificItemData('Pokemon Team Rocket Tin'):
    #print(itemData)
