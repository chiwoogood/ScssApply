from django.urls import path

from . import views

app_name="drf"

urlpatterns = [
    path('home/',views.home,name="home"),
]