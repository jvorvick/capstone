from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Game
from django.shortcuts import get_object_or_404

# Create your views here.
def home(request):
    return render(request, 'gamepicker/index.html')

def all_games(request):
    games = list(Game.objects.all().values())
    
    return JsonResponse(games, safe=False)

def get_game(request, game):
    # title = Game.objects.filter(name=game)[0]
    title = get_object_or_404(Game, name=game)
    print(title)
    game = {
        'name': title.name,
        'cover': title.cover,
        'platforms': title.platforms,
        'genres': title.genres,
        'first_release_date': title.first_release_date,
        'companies': title.companies,
        'companies_developer': title.companies_developer,
        'companies_publisher': title.companies_publisher,
        'summary': title.summary,
        'age_rating_category': title.age_rating_category,
        'age_rating_rating': title.age_rating_rating
    }
    print(game)
    return JsonResponse(game)