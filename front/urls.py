from django.urls import path

from . import views

app_name="front"

urlpatterns = [
    path('home/',views.home,name="home"),
]