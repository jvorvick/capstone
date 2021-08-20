from django.contrib import admin
from .models import Game, Genre, Platform

# Register your models here.
admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Platform)