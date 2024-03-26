from django.urls import path
from . import views

app_name = 'dashs'

urlpatterns = [
    path('index/', views.index, name='index'),
]