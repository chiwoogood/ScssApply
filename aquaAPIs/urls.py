from django.urls import path
from . import views

app_name = 'aquaAPIs'

urlpatterns = [
    path('water/', views.water, name='water'),
    path('liveAqua/',views.liveAqua,name='liveAqua'),
    path('aquaProvince/',views.aquaProvince,name='aquaProvince'),
    path('aquaMetro/',views.aquaMetro,name='aquaMetro'),
    path('weather/',views.weather,name='weather'),
    path('sujcode/',views.sujcode,name='sujcode'),
    path('seoul/',views.seoul,name='seoul'),
]