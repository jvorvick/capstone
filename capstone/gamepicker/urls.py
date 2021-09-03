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
    path('logout/', views.user_logout, name='logout'),
    path('user_page/', views.user_page, name='user_page'),
    path('user_games/', views.user_games, name='user_games'),
    path('collection/<int:id>/', views.add_collection, name='collection'),
    path('remove_collection/<int:id>/', views.remove_collection, name='remove_collection'),
    path('<str:name_and_date>/', views.get_game, name='get_game'),
]