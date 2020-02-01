from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import pandas as pd

# CHROME_PATH = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
WINDOW_SIZE = "1920,1080"

chrome_options = Options()  
# chrome_options.add_argument("--headless")  
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
# chrome_options.binary_location = CHROME_PATH

driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                          options=chrome_options
                         )  

headline=[]
snippet=[] #List to store price of the product
image=[] #List to store rating of the product
link=[]
driver.get("https://www.bbc.com/news")

content = driver.find_elements_by_class_name('gs-c-promo-heading')
# soup = BeautifulSoup(content)

# target = soup.find('a', href=True, attrs={'class':'gs-c-promo-heading'})
content[0].click()

print(BeautifulSoup(driver.page_source))