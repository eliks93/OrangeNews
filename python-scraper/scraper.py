from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import pandas as pd
import requests

def create_article(data):
  URL = "http://localhost:3001/articles"
  r = requests.post(url = URL, params=data)
  response = r.json()
  print(response)

# CHROME_PATH = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
WINDOW_SIZE = "1920,1080"

chrome_options = Options()  
chrome_options.add_argument("--headless")  
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
# chrome_options.binary_location = CHROME_PATH

driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                          options=chrome_options
                         )  
def get_bbc():
  driver.get("https://www.bbc.com/news")

  content = driver.find_elements_by_class_name('gs-c-promo-heading')

  content[0].click()

  soup = BeautifulSoup(driver.page_source)
  headline = soup.find('h1', attrs={'class':'story-body__h1'}).text
  image = soup.find('img', attrs={'class':'js-image-replace'})['src']
  snippet_one = soup.find('p', attrs={'class':'story-body__introduction'})
  snippet_two = snippet_one.find_next('p')
  snippet_three = snippet_two.find_next('p')
  link = driver.current_url
  snippets = snippet_one.text + '\n' + snippet_two.text + '\n' + snippet_three.text
  article = {
    'headline': headline,
    'snippet': snippets,
    'image': image,
    'link': link,
    'publisher': 'The BBC'
  }
  create_article(article)
  
def get_new_york():
  driver.get("https://www.nytimes.com/")

  content = driver.find_element_by_class_name('css-1wgguqj')
  content.click()

  soup = BeautifulSoup(driver.page_source)
  headline = soup.find('span', attrs={'class':"balancedHeadline"}).text
  image = soup.find('img', attrs={'class':'css-11cwn6f'})['src']
  snippet_one = soup.find('p', attrs={'class':'css-exrw3m evys1bk0'})
  snippet_two = snippet_one.find_next('p')
  snippet_three = snippet_two.find_next('p')
  snippets = snippet_one.text + '\n' + snippet_two.text + '\n' + snippet_three.text
  link = driver.current_url
  article = {
    'headline': headline,
    'snippet': snippets,
    'image': image,
    'link': link,
    'publisher': 'The New York Times'
  }
  create_article(article)
  print(snippets)

get_new_york()
get_bbc()
