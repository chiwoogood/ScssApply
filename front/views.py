from django.shortcuts import render
import requests
# Create your views here.

def home(request):
    return render(request,'front/home.html')

def map(request):
    return render(request,'front/map.html')


def water(request):
    return render(request,'front/water.html')


def hello(request):
    return render(request,'front/templatebox.html')
# def water(request):
#     url = 'http://opendata.kwater.or.kr/openapi-data/service/pubd/waterinfos/waterquality/watersgcl/codelist'
#     pa
#     return render(request,'front/water.html')


def temp(request):
    return render(request,'front/temp1.html')


def nav(request):
    return render(request,'front/nav.html')

def footer(request):
    return render(request,'front/footer.html')



# import requests

# url = 'http://opendata.kwater.or.kr/openapi-data/service/pubd/waterinfos/waterquality/watersgcl/codelist'
# params ={'serviceKey' : '서비스키', '_type' : 'xml' }

# response = requests.get(url, params=params)
# print(response.content)