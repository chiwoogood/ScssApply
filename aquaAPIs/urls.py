from django.urls import path
from . import views

app_name = 'aquaAPIs'

urlpatterns = [
    path('water/', views.water, name='water'),
]