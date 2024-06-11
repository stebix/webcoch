from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('draw', views.drawing, name='draw'),
    path('point', views.pointing, name='point'),
    path('submit-form/', views.submit_form, name='submit_form'),
    path('display-submissions/', views.display_submissions, name='display_submission'),
]