from django.shortcuts import render, reverse
from django.http import HttpResponse, JsonResponse
from .models import Collection, Game, Genre, Platform
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http.response import HttpResponseRedirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):
    return render(request, 'gamepicker/index.html')

def all_games(request):
    games = list(Game.objects.all().values())
    
    return JsonResponse(games, safe=False)

def get_game(request, name_and_date):
    # title = Game.objects.filter(name=game)[0]
    title = get_object_or_404(Game, name_and_date=name_and_date)
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

    # check if game has been added to user's collection
    if request.user.is_authenticated:
        collection, _ = Collection.objects.get_or_create(user=request.user)
        if collection.game.filter(name=title.name).exists():
            game['in_collection'] = True
    return JsonResponse(game)

def genres(request):
    genres = list(Genre.objects.all().values())

    return JsonResponse(genres, safe=False)

def platforms(request):
    platforms = list(Platform.objects.all().values())

    return JsonResponse(platforms, safe=False)

def user_signup(request):
    print('METHOD', request.method)
    if request.method == 'GET':
        return render(request, 'gamepicker/signup.html')
    elif request.method == "POST":
        print(request.POST)

        # get data from form
        form = request.POST
        first_name = form['first_name']
        last_name = form['last_name']
        username = form['username']
        password = form['password']

        user = User.objects.create_user(
            username, password, first_name=first_name, last_name=last_name
        )
        
        login(request, user)

        return HttpResponseRedirect(reverse('gamepicker:home'))

def user_login(request):
    # user visits page
    if request.method == 'GET':
        return render(request, 'gamepicker/login.html')
    # user submits form
    elif request.method == 'POST':
        print('FORM', request.POST)
        
        # get form data
        form = request.POST
        username = form['username']
        password = form['password']

        # authenticate user
        user = authenticate(request, username=username, password=password)
        print(user)
        login(request, user)

    return HttpResponseRedirect(reverse('gamepicker:home'))

@login_required
def add_collection(request, game):
    collection, _ = Collection.objects.get_or_create(user=request.user)
    add_game = get_object_or_404(Game, name=game)
    collection.game.add(add_game)

    return JsonResponse(game, safe=False)