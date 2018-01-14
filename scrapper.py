from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import pymongo
from pymongo import MongoClient
import secret

def main(soup, period, regions, documents):
    if soup == None:
        init()
    elif period == None:
        get_period(soup)
    elif regions == None:
        get_regions(soup, period)
    elif documents == False:
        get_info(soup, period, regions)
    else:
        send_info(documents)

def init():
    url = "http://qualipraia.cetesb.sp.gov.br/qualidade-da-praia/"
    print("INICIALING RASPAGEM COM URL: " + url)
    html = urlopen(url)
    soup = BeautifulSoup(html, "lxml")
    print("RASPAGEM OK")
    print('------------------------------')
    main(soup, None, None, False)

def get_period(soup):
    period = soup.find('h3')
    print("Período:", end=' ')
    print(period.get_text())
    print('------------------------------')
    main(soup, period, None, False)

def get_regions(soup, period):
    regions = []
    first_macro_region = period.findNext('h2')
    current_macro = first_macro_region
    for element in first_macro_region.previous_sibling.find_all_next('h2'):
        if element.findNext().name == 'h2':
            macro = {'name':element.get_text(), 'micros':[]}
            current_macro = macro
            regions.append(macro)
        elif element.findNext().name == 'table':
            micro = {'name':element.get_text(), 'beach':"", 'local':"", 'quality':""}
            current_macro["micros"].append(micro)
    main(soup, period, regions, False)

def get_info(soup, period, regions):
    documents = []
    print("REGIÕES:")
    for macro in regions:
        print(f"\n>> {macro['name']} <<")
        for micro in macro['micros']:
            print(f"  {micro['name']}:")
            table = soup.find('h2', string=micro['name']).findNext('table')
            for row in table.findAll('tr')[1:]:
                micro['beach'] = row.findAll('td')[0].get_text().strip()
                micro['local'] = row.findAll('td')[1].get_text().strip()
                micro['quality'] = row.findAll('td')[2].get_text().strip()
                print(f"  + {micro['beach']} ({micro['local']}) => {micro['quality']}")
                document = {'macro':macro['name'], 'micro':micro['name'], 'beach':micro['beach'], 'local':micro['local'], 'quality':micro['quality']}
                documents.append(document)
            print("\n")
    print('------------------------------')
    main(soup, period, regions, documents)

def send_info(documents):
    uri = f"mongodb://{secret.username}:{secret.password}@ds155577.mlab.com:55577/cetesb-peg"
    client = MongoClient(uri)
    db = client['cetesb-peg']
    regions = db.regions
    del_result = regions.delete_many({})
    print(f"{del_result.deleted_count} registros apagados")
    result = regions.insert_many(documents)
    print(f"{regions.count()} registros inseridos")
    

if __name__ == "__main__":
    main(None, None, None, False)