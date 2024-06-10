from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('draw', views.drawing, name='draw'),
    path('point', views.pointing, name='point')
]