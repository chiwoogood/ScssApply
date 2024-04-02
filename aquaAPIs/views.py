from django.shortcuts import render
import requests, json, pandas
from datetime import datetime
import xml.etree.ElementTree as ET

def asciiToXML(ascii_code_str):
    ascii_codes = ascii_code_str.split()  # 공백을 기준으로 ASCII 코드 값들을 분리
    ascii_chars = [chr(int(code)) for code in ascii_codes]  # 각 코드 값을 해당하는 ASCII 문자로 변환
    return ''.join(ascii_chars)  # ASCII 문자열로 변환하여 반환

def parseXMLResponse(xml_string):
    try:
        root = ET.fromstring(xml_string)
        data = {}
        for child in root:
            data[child.tag] = child.text
        return data
    except ET.ParseError as e:
        # XML 파싱 오류가 발생했을 경우
        print("XML 파싱 오류:", e)
        return None

def water(request):
    return render(request,'aquaAPIs/water.html')

def liveAqua(request): #한국수자원공사_실시간 수도정보 수질(시간) 조회 서비스
    # API URL : https://www.data.go.kr/iim/api/selectAPIAcountView.do
    # API KEY : QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==
    url = 'http://apis.data.go.kr/B500001/rwis/waterQuality/list'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'stDt' : '2015-11-18', 'stTm' : '00', 'edDt' : '2015-11-18', 'edTm' : '24', 'fcltyMngNo' : '4824012333', 'sujCode' : '333', 'liIndDiv' : '1', 'numOfRows' : '10', 'pageNo' : '1' }

    response = requests.get(url, params=params)
    temp = response
    context = {
        'temps' : temp
    }

    return render(request,'aquaAPIs/liveAqua.html',context)


def aquaProvince(request): # 한국수자원공사_지방상수도 수질 정보
    # API URL : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15099093
    # API KEY : QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==

    url = 'http://apis.data.go.kr/B500001/waterinfos/waterquality/daywater/daywaterlist'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'pageNo' : '1', 'numOfRows' : '10', 'sgccd' : '48310', 'sitecd' : '21002', 'stdt' : '20190608', 'eddt' : '20190618', '_type' : 'json' }
    # asciiToJson()
    response = requests.get(url, params=params)
    temp = asciiToJson(response.content)
    context = {
        'temps' : temp
    }

    return render(request,'aquaAPIs/province.html',context)




def aquaMetro(request):
    # API URL : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=3072578
    # API KEY : QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==

    # url = 'http://opendata.kwater.or.kr/openapi-data/service/pubd/waterways/wdr/waterfltplt/list'
    # params = {'serviceKey': 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw=='}
    
    # response = requests.get(url, params=params)

    # if response.status_code == 200:
    #     # decodedData = parseXMLResponse(response.content)
    #     context = {
    #         'temps': response.content
    #         }
    #     return render(request, 'aquaAPIs/metro.html', context)
    # else:
    #     return render(request, 'aquaAPIs/error.html', context)
    serviceKey = 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw=='
    url = 'http://opendata.kwater.or.kr/openapi-data/service/pubd/waterways/wdr/waterfltplt/list'
    params ={'serviceKey' : serviceKey}

    response = requests.get(url, params=params)
    temp = asciiToXML(response.content)
    context = {
        'temps' : temp
    }
    return render(request,'aquaAPIs/metro.html',context)


def weather(request):
    # API URL : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
    # API KEY : QLU%2BOoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp%2Fk8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw%3D%3D

    today = datetime.today().strftime('%Y%m%d')
    current_time = datetime.now().strftime("%H%M")
    weatherData = dict()
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'dataType' : 'json', 'base_date' : today, 'base_time' : current_time, 'nx' : '54', 'ny' : '121' }
    responseData = requests.get(url, params=params).text
    toJsonData = json.loads(responseData)
    bodyData = toJsonData['response']['body']['items']['item']
    for temp in bodyData:
        weatherData[temp['category']] = temp['obsrValue']
    # value = [dic[temp['category']] : temp['obsrValue'] for temp in bodyData]
    #[('PTY', '0'), ('REH', '63'), ('RN1', '0'), ('T1H', '17'), ('UUU', '3.2'), ('VEC', '272'), ('VVV', '0'), ('WSD', '3.2')]
    # PTY (강수 형태): 관측된 값은 0입니다. 이는 강수가 없음을 나타냅니다.
    # REH (상대 습도): 관측된 값은 63%입니다.
    # RN1 (1시간 강수량): 관측된 값은 0입니다. 이는 최근 1시간 동안의 강수량이 없음을 나타냅니다.
    # T1H (1시간 기온): 관측된 값은 17°C입니다. 현재 온도를 나타냅니다.
    # UUU (동풍 성분): 관측된 값은 3.2입니다. 동쪽으로 향하는 풍향을 나타냅니다.
    # VEC (풍향): 관측된 값은 272입니다. 풍향을 나타냅니다.
    # VVV (남풍 성분): 관측된 값은 0입니다. 남쪽으로 향하는 풍향을 나타냅니다.
    # WSD (풍속): 관측된 값은 3.2입니다. 풍속을 나타냅니다.
    
    context = {
        'weatherData' : weatherData
    }
    return render(request,'aquaAPIS/weather.html',context)


def sujcode(request): # 정수장 코드 수집
    # API URL : http://apis.data.go.kr/B500001/rwis/waterQuality/fcltylist/codelist
    # API KEY : QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==

    url = 'http://apis.data.go.kr/B500001/rwis/waterQuality/fcltylist/codelist'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'fcltyDivCode' : '2', 'numOfRows' : '100', 'pageNo' : '100' }

    response = requests.get(url, params=params)
    temp = response
    context = {
        'temps': temp,
    }
    return render(request,'aquaAPIs/sujcode.html',context)


def aquaSeoul(request):
    ranges = [(1, 1000), (1001, 2000), (2001, 2903)]
    serviceKey = '4943646d766a6d6831313565486b6375'
    allData = []
    for start, end in ranges:
        url = f"http://openapi.seoul.go.kr:8088/{serviceKey}/json/AreaQltwtrSttus/{start}/{end}/"
        response = requests.get(url)
        
        if response.status_code == 200:
            allData.append(response.json())
        else:
            return render(request, 'aquaAPIs/error.html')
    context = {
        'data': allData,
    }
    
    return render(request, 'aquaAPIs/seoul.html', context)
            




