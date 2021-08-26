from django.urls import path
from . import views

app_name = 'gamepicker'
urlpatterns = [
    path('', views.home, name='home'),
    path('all/', views.all_games, name='all_games'),
    path('genres/', views.genres, name='genres'),
    path('platforms/', views.platforms, name='platforms'),
    path('signup/', views.user_signup, name='signup'),
    path('login/', views.user_login, name='login'),
    path('collection/<str:game>/', views.add_collection, name='collection'),
    path('<str:name_and_date>/', views.get_game, name='get_game'),
]