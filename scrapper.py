from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

def main(soup, period, regions, has_info):
    if soup == None:
        init()
    elif period == None:
        get_period(soup)
    elif regions == None:
        get_regions(soup, period)
    elif has_info == False:
        get_info(soup, period, regions)
    else:
        send_info(regions)

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
            print("\n")
    print('------------------------------')

def send_info(regions):
    print("top")

if __name__ == "__main__":
    main(None, None, None, False)