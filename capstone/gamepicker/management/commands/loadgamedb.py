from django.core.management.base import BaseCommand
from gamepicker.models import Game
import json
from datetime import datetime, timedelta


class Command(BaseCommand):

    def handle(self, *args, **options):
        Game.objects.all().delete()

        with open('gamesdb.txt', 'r') as file:
            library = file.read()
            library = library.split('\n')
            
        counter = 0
        for entry in library[-1::-1]:
            entry = json.loads(entry)
            game = Game()
            game.name = entry['name']
            if 'cover' in entry:
                url = entry['cover']['url']
                game.cover = url.replace('t_thumb', 't_cover_big')
            else:
                game.cover = ''
            if 'platforms' in entry:
                platforms = [platform['name'] for platform in entry['platforms']]
                game.platforms = ', '.join(platforms)
            else:
                game.platforms = ''
            if 'genres' in entry:
                genres = [genre['name'] for genre in entry['genres']]
                game.genres = ', '.join(genres)
                # for genre in entry['genres']:
                #     game.genres = genre['name']
            else:
                game.genres = ''
            if 'first_release_date' in entry:
                release_date = entry['first_release_date']
                if entry['first_release_date'] >= 0:
                    game.first_release_date = datetime.utcfromtimestamp(release_date).strftime('%b %d, %Y')
                else:
                    game.first_release_date = datetime(1970, 1, 1) + timedelta(seconds=release_date)
            else:
                game.first_release_date = ''
            if 'involved_companies' in entry:
                companies = [company['company']['name'] for company in entry['involved_companies']]
                game.companies = ', '.join(companies)
            else:
                game.companies = ''
            game.companies_developer = False
            game.companies_publisher = False
            if 'age_ratings' in entry:
                game.age_rating_category = entry['age_ratings'][0]['category']
                game.age_rating_rating = entry['age_ratings'][0]['rating']
            else:
                game.age_rating_category = 0
                game.age_rating_rating = 0
            
            game.save()

            counter += 1
            if counter % 1000 == 0:
                percentage = counter / 155000 * 100
                percentage = f'{round(percentage, 2)}%'
                print(percentage)
