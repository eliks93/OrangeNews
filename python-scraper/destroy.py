import requests

def destroy_articles():
  URL = "http://localhost:3001/articles"
  r = requests.delete(url = URL)
  response = r.json()
  print(response)

destroy_articles()