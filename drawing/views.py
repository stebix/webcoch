from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def index(request):
    return HttpResponse('Hello World - You are at the drawing index!')


def drawing(request):
    return render(request, 'drawing/drawing_template.html')


def pointing(request):
    return render(request, 'drawing/pointing_template.html')