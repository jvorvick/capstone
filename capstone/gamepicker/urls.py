from django.urls import path
from . import views

app_name = 'gamepicker'
urlpatterns = [
    path('', views.home, name='home'),
    path('all/', views.all_games, name='all_games'),
    path('<str:game>/', views.get_game, name='get_game')
]