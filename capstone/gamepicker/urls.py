from django.urls import path
from . import views

app_name = 'gamepicker'
urlpatterns = [
    path('', views.home, name='home')
]