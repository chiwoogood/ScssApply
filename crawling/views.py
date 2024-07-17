from django.shortcuts import render
from django.http import JsonResponse
import json
import requests
import base64
import time
import hmac
import hashlib
import random, string
from .models import Phone_verification
from django.views.decorators.csrf import csrf_exempt
import xmltodict

# Create your views here.

def trafilatura(request):
    return render(request,'crawling/test.html')


def virtualkeyboard(request):
    return render(request,'crawling/test2.html')

def test(request):
    return render(request,'crawling/test3.html')

@csrf_exempt
def send_phone_verification_code(request):
    if request.method == 'POST':
        msg = ""
        result = True

        user_phone_number = request.POST.get("user_phone_number").strip().replace('-', '').replace(' ', '')

        if user_phone_number == "":
            msg = "휴대폰 번호를 입력해주세요"
            result = False

        else:
            # 인증코드 6자리 만들기
            string_pool = string.digits
            code = ""
            for i in range(6):
                code += random.choice(string_pool)

            ########################################################################################################################
            #### 문자 보내는 코드
            ######################################################################################################################## 
            timestamp = int(time.time() * 1000)
            timestamp = str(timestamp)

            service_id = "ncp:sms:kr:277020026989:sms_kakao"                  # SMS project의 서비스 id
            access_key = "52aCYk0ubOcUJZd57WdX"                         # 네이버클라우드의 마이페이지/계정관리/인증키관리에서 발급받은 access key
            secret_key = "RtVgKabUaLTyA98qUvd4ZRIt1hjZ3q2r4wfZHO3g"     # 네이버클라우드의 마이페이지/계정관리/인증키관리에서 발급받은 secret key
            secret_key = bytes(secret_key, 'UTF-8')

            url = "https://sens.apigw.ntruss.com"
            requestUrl = "/sms/v2/services/"
            requestUrl2 = "/messages"

            uri = requestUrl + service_id + requestUrl2
            apiUrl = url + uri

            method = "POST"
            message = method + " " + uri + "\n" + timestamp + "\n" + access_key
            message = bytes(message, 'UTF-8')
            signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

            content = "Smart PureWater System 인증번호 입니다. [%s]" % code

            messages = {
                "to" : user_phone_number
            }
            body = {
                "type" : "SMS",
                "contentType" : "COMM",
                "from" : "0315260074",
                "subject" : "subject",
                "content" : content,
                "messages" : [messages],
            }
            body2 = json.dumps(body)

            headers = {
                'Content-Type' : 'application/json; charset=utf-8',
                'x-ncp-apigw-timestamp' : timestamp,
                'x-ncp-iam-access-key' : access_key,
                'x-ncp-apigw-signature-v2' : signingKey,
            }

            res = requests.post(apiUrl, headers=headers, data=body2)

            if '202' in str(res):
                try:
                    phone_verification = Phone_verification.objects.get(phone_number=user_phone_number)

                    phone_verification.code = code
                    phone_verification.save()
                    
                except Phone_verification.DoesNotExist as e:
                    phone_verification = Phone_verification(phone_number=user_phone_number, code=code)
                    phone_verification.save()

                msg = "인증번호를 전송하였습니다."
                result = True

            else:
                msg = "인증번호를 전송에 실패하였습니다."

        context = { 
                    'msg' : msg,
                    'result' : result,
                }

    return JsonResponse(context)



def test4(request):
    return render(request,'crawling/test4.html')


def daegu(request):
    url = 'http://www.dgwater.go.kr:8080/openapi-data/service/rest/InqireWaterQualityInfoSrvc/getWaterQualityStatisticsInfo'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'year' : '2023' }

    response = requests.get(url, params=params)

    
    data_dict = xmltodict.parse(response.content)
    context = {'datas' : data_dict.values() }
    return render(request,'crawling/daegu.html', context)


def hello(a:int, b:int) -> int:
    return 0


def daegu_map():
    return 0


def water(request):
    url = 'http://opendata.kwater.or.kr/openapi-data/service/pubd/waterways/wdr/waterfltplt/list'
    params = {'serviceKey': 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'numOfRows' : '10', 'pageNo' : '5'}

    response = requests.get(url, params=params)
    response.encoding = 'UTF-8'  # Ensure the response is interpreted as UTF-8
    data_dict = xmltodict.parse(response.text)  # Parse the response text, not content

    context = {
        'datas': data_dict['response']['body']['items']['item']  # Extract relevant data
    }

    return render(request, 'crawling/water.html', context)

def code(request):
    url = 'http://apis.data.go.kr/B500001/rwis/waterQuality/fcltylist/codelist'
    params ={'serviceKey' : 'QLU+OoN9aE8uCyPs2GsKpDWYyZENcFs7mMQOWiisTp/k8xHzZASS9ARC0Fe6nA3UL1v8khWxpxb98IpsGOEISw==', 'fcltyDivCode' : '2', 'numOfRows' : '10', 'pageNo' : '4' }
    
    response = requests.get(url, params=params)
    print(response.content)
    response.encoding = 'UTF-8'  # Ensure the response is interpreted as UTF-8
    data_dict = xmltodict.parse(response.text)  # Parse the response text, not content
    context={'datas': data_dict['response']['body']['items']['item']}
    return render(request,'crawling/code.html',context)


def daeguCrawling(request):
    return render(request,'crawling/daeguCrawling.html')