from django.shortcuts import render

# Create your views here.

def trafilatura(request):
    return render(request,'crawling/test.html')


def virtualkeyboard(request):
    return render(request,'crawling/test2.html')