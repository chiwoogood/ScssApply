from django.urls import path

from . import views

app_name="front"

urlpatterns = [
    path('home/',views.home,name="home"),
    path('water/',views.water,name="water"),
    path('map/',views.map,name="map"),
]