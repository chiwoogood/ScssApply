from django.shortcuts import render
import requests
from datetime import datetime
import json

# import logging
# logger = logging.getLogger(__name__)

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

    response = requests.get(url, params=params)
    temp = response
    context = {
        'temps' : temp
    }

    return render(request,'aquaAPIs/province.html',context)




def aquaMetro(request): #한국수자원공사_광역정수장 수질
    # API URL : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=3072578
    # API KEY : QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==
    url = 'http://opendata.kwater.or.kr/openapi-data/service/pubd/waterways/wdr/dailwater/list'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'fcode' : 'A002', 'stdt' : '2018-10-01', 'eddt' : '2018-10-05', 'numOfRows' : '10', 'pageNo' : '1' }

    response = requests.get(url, params=params)
    temp = response
    context = {
        'temps' : temp
    }
    return render(request, 'aquaAPIs/metro.html',context)


def weather(request):
    # API URL : http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
    # API KEY : QLU%2BOoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp%2Fk8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw%3D%3D
    today = datetime.today().strftime('%Y%m%d')
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'dataType' : 'json', 'base_date' : today, 'base_time' : '0600', 'nx' : '54', 'ny' : '121' }
    response = requests.get(url, params=params)
    decoded_response = response.text
    context = {
        'temps' : decoded_response
    }

    return render(request,'aquaAPIS/weather.html',context)


def sujcode(request): # 정수장 코드 수집
    # API URL : http://apis.data.go.kr/B500001/rwis/waterQuality/fcltylist/codelist
    # API KEY : 

    url = 'http://apis.data.go.kr/B500001/rwis/waterQuality/fcltylist/codelist'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'fcltyDivCode' : '2', 'numOfRows' : '100', 'pageNo' : '100' }

    response = requests.get(url, params=params)
    temp = response
    context = {
        'temps': temp,
    }
    return render(request,'aquaAPIs/sujcode.html',context)


def seoul(request):
    url = 'http://openapi.seoul.go.kr:8088/4943646d766a6d6831313565486b6375/json/AreaQltwtrSttus/1/2000/'

    response = requests.get(url)
    if response.status_code == 200:
        # API로부터 받아온 JSON 데이터를 파이썬 객체로 변환합니다.
        data = response.json()

        # 필요한 데이터를 추출하여 context에 담습니다.
        # 예를 들어, 'data' 키에 필요한 데이터를 담습니다.
        context = {'data': data}

        # 템플릿에 context를 전달하여 렌더링합니다.
        return render(request, 'aquaAPIs/seoul.html', context)
    else:
        # API 요청이 실패한 경우에는 오류를 처리합니다.
        return render(request, 'aquaAPIs/error.html')