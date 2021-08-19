from django.core.management.base import BaseCommand
from gamepicker.models import Genre
import json
from datetime import datetime, timedelta


class Command(BaseCommand):

    def handle(self, *args, **options):
        Genre.objects.all().delete()

        with open('gamesdb.txt', 'r') as file:
            library = file.read()
            library = library.split('\n')
            
        counter = 0
        for entry in library[-1::-1]:
            entry = json.loads(entry)
            if 'genres' in entry:
                for g in entry['genres']:
                    genre = Genre.objects.get_or_create(name=g['name'])
            counter += 1
            if counter % 1000 == 0:
                percentage = counter / 155000 * 100
                percentage = f'{round(percentage, 2)}%'
                print(percentage)