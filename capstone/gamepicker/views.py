from django.shortcuts import redirect, render, reverse
from django.http import HttpResponse, JsonResponse
from .models import Collection, Game, Genre, Platform
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http.response import HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Create your views here.
def home(request):
    return render(request, 'gamepicker/index.html')

def all_games(request):
    games = list(Game.objects.all().values())
    
    return JsonResponse(games, safe=False)

def get_game(request, name_and_date):
    # title = Game.objects.filter(name=game)[0]
    game = list(Game.objects.filter(name_and_date=name_and_date).values())
    # title = get_object_or_404(Game, name_and_date=name_and_date)
    # game = {
    #     'name': title.name,
    #     'cover': title.cover,
    #     'platforms': title.platforms,
    #     'genres': title.genres,
    #     'first_release_date': title.first_release_date,
    #     'companies': title.companies,
    #     'companies_developer': title.companies_developer,
    #     'companies_publisher': title.companies_publisher,
    #     'summary': title.summary,
    #     'age_rating_category': title.age_rating_category,
    #     'age_rating_rating': title.age_rating_rating
    # }

    # check if game has been added to user's collection
    if request.user.is_authenticated:
        collection, _ = Collection.objects.get_or_create(user=request.user)
        for title in game:
            if collection.game.filter(id=title['id']).exists():
                title['in_collection'] = True
    return JsonResponse(game, safe=False)

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
            username=username, password=password, first_name=first_name, last_name=last_name,
        )

        Collection.objects.create(user=user)

        login(request, user)

        return HttpResponseRedirect(reverse('gamepicker:home'))

def user_login(request):
    # user visits page
    if request.method == 'GET':
        return render(request, 'gamepicker/login.html')
    # user submits form
    elif request.method == 'POST':
        
        # get form data
        form = request.POST
        print(form)
        username = form['username']
        password = form['password']

        # authenticate user
        user = authenticate(username=username, password=password)
        
        print('user', user)
        if user != None:
            login(request, user)
            return HttpResponseRedirect(reverse('gamepicker:home'))
        else:
            # messages.error(request, 'Username or password is not correct')
            return render(request, 'gamepicker/login.html', {'user': user})

def user_logout(request):
    logout(request)
    
    return HttpResponseRedirect(reverse('gamepicker:home'))

@login_required
def user_page(request):
    collection = Collection.objects.filter(user=request.user)[0]
    games = collection.game.all()
    context = {
        'games': games
    }

    return render(request, 'gamepicker/user_page.html', context)

def add_collection(request, id):
    if request.user.is_authenticated:
        collection = Collection.objects.filter(user=request.user)[0]
        add_game = get_object_or_404(Game, id=id)
        collection.game.add(add_game)
        # collection.objects.order_by('-game')
        return JsonResponse({}, safe=False)
    else:
        return HttpResponse(status=299)

def remove_collection(request, id):
    collection = Collection.objects.filter(user=request.user)[0]
    print(collection)
    remove_game = get_object_or_404(Game, id=id)
    print(remove_game)
    collection.game.remove(remove_game)
    return JsonResponse({}, safe=False)

def user_games(request):
    collection = Collection.objects.filter(user=request.user)[0]
    games = collection.game.all()
    games = list(games.values())

    return JsonResponse(games, safe=False)