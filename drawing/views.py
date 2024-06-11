import json

from django.shortcuts import render
from django.http import HttpResponse

from .models import AudiogramPollSubmission

# Create your views here.

def index(request):
    return HttpResponse('Hello World - You are at the drawing index!')


def drawing(request):
    return render(request, 'drawing/drawing_template.html')


def pointing(request):
    return render(request, 'drawing/pointing_template_2.html')


def submit_form(request):
    if request.method == 'POST':

        keys = {'first_name', 'last_name', 'email', 'position',
                'institution'}
        payload = {key : request.POST.get(key) for key in keys}
        payload['points'] = request.POST.get('pointCoords')
        AudiogramPollSubmission.objects.create(**payload)
        # Process the form data
        return render(request, 'drawing/endscreen.html', context={'payload' : payload})

    return HttpResponse("Invalid request method.")


def display_submissions(request):
    submissions = AudiogramPollSubmission.objects.all()
    context = {'submissions' : submissions}
    return render(request, 'drawing/display_submissions.html', context=context)
