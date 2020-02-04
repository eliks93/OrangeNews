#!/usr/local/bin/python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import pandas as pd
import requests
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException



def create_article(data):
  URL = "http://localhost:3001/articles"
  r = requests.post(url = URL, data=data)
  response = r.json()
  print(response)

CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
WINDOW_SIZE = "1920,1080"
PATH_TO_EXTENSION = './extension_1_24_2_0.crx'

chrome_options = Options()
# chrome_options.add_extension(PATH_TO_EXTENSION)
user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'    
chrome_options.add_argument('user-agent={0}'.format(user_agent))
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--allow-running-insecure-content')
chrome_options.add_argument("--headless")  
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)

driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                          options=chrome_options
                         )  
def get_bbc():
  driver.get("https://www.bbc.com/news")

  content = driver.find_elements_by_class_name('gs-c-promo-heading')

  content[0].click()

  soup = BeautifulSoup(driver.page_source, 'html.parser')
  headline = soup.find('h1', attrs={'class':'story-body__h1'}).text
  image = soup.find('img').find_next('img')['src']
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
  print(image)
  create_article(article)
  print('create BBC article')
  
def get_new_york():
  driver.get("https://www.nytimes.com/")

  content = driver.find_element_by_class_name('balancedHeadline')
  content.click()
  headline = ''
  soup = BeautifulSoup(driver.page_source, 'html.parser')
  if soup.find('span', attrs={'class':"balancedHeadline"}).text:
    headline = soup.find('span', attrs={'class':"balancedHeadline"}).text
  else:
    print('find other thingy')
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
  print('create NYT article')

def get_cbc():
  driver.get("https://www.cbc.ca/news")
  content = driver.find_element_by_class_name('headline')
  content.click()
  try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "detailHeadline")))    
    print ("Page is ready!")
  except TimeoutException:
    print ("Loading took too much time!")
    return
  content = driver.page_source
  soup = BeautifulSoup(content, 'html.parser')
  headline = soup.find('h1').text
  image = soup.find('img')['src']
  snippet_one = soup.find('p')
  snippet_two = snippet_one.find_next('p')
  snippet_three = snippet_two.find_next('p')
  snippets = snippet_one.text + '\n' + snippet_two.text + '\n' + snippet_three.text
  link = driver.current_url
  article = {
    'headline': headline,
    'snippet': snippets,
    'image': image,
    'link': link,
    'publisher': 'The CBC'
  }
  create_article(article)
  print('create CBC article')

def get_cnn():
  print('getting cnn')
  driver.get("https://www.cnn.com/world")
  print('cnn got, attempting to find element')
  content = driver.find_element_by_tag_name('article')
  print('clicking element')
  driver.save_screenshot('before_click.png')
  content.click()
  driver.save_screenshot('after_click.png')

  try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "pg-headline")))
    print ("Page is ready!")
  except TimeoutException:
    print ("Loading took too much time!")
    return
  content = driver.page_source
  soup = BeautifulSoup(content, 'html.parser')
  headline = soup.find('h1').text
  image = 'https:' + soup.find('img', attrs={'media__image'}).find_next('img')['src']
  snippet_one = soup.find('p', attrs={'class':'zn-body__paragraph'})
  print(snippet_one)
  snippet_two = soup.find('div', attrs={'class':'zn-body__paragraph'})
  snippet_three = snippet_two.find_next('div')
  snippets = snippet_one.text + '\n' + snippet_two.text + '\n' + snippet_three.text
  link = driver.current_url
  article = {
    'headline': headline,
    'snippet': snippets,
    'image': image,
    'link': link,
    'publisher': 'CNN'
  }
  create_article(article)
  print(article)
  print('creating cnn article')



get_new_york()
get_bbc()
get_cbc()
get_cnn()
driver.close()
