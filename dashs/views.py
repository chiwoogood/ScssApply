from django.shortcuts import render


def dashboard(request):
    return render(request,'dashs/dashboard.html')


def index(request):
    return render(request,'dashs/index.html')