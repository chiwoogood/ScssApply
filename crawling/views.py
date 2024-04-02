from django.shortcuts import render

# Create your views here.

def trafilatura(request):
    return render(request,'crawling/test.html')