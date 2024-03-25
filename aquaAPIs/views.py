from django.shortcuts import render

# Create your views here.

def water(request):
    return render(request,'aquaAPIs/water.html')