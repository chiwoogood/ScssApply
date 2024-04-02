import trafilatura

url = "https://www.water.or.kr/"

html = trafilatura.fetch_url(url)

text = trafilatura.extract(html)

print(text)