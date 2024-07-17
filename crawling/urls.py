from django.urls import path
from . import views

app_name = 'crawling'

urlpatterns = [
    path('trafilatura', views.trafilatura, name='trafilatura'),
    path('virtualkeyboard',views.virtualkeyboard,name='virtualkeyboard'),
    path('test',views.test,name='test'),
    path('send_phone_verification_code',views.send_phone_verification_code,name='send_phone_verification_code'),
    path('test4',views.test4,name='test4'),
    path('daegu',views.daegu,name='daegu'),
    path('water',views.water,name='water'),
    path('code',views.code,name='code'),
]