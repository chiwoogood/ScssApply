import requests

url = 'http://apis.data.go.kr/B500001/waterinfos/waterquality/watersgcl/watersgclcodelist'
params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', '_type' : 'json' }

response = requests.get(url, params=params)
data = response.json()
print(data)




    