from django.urls import path
from . import views

app_name = 'crawling'

urlpatterns = [
    path('trafilatura', views.trafilatura, name='trafilatura'),

]