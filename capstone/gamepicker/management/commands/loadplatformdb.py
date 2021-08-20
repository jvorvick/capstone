from django.core.management.base import BaseCommand
from gamepicker.models import Platform
import json


class Command(BaseCommand):

    def handle(self, *args, **options):
        Platform.objects.all().delete()

        with open('gamesdb.txt', 'r') as file:
            library = file.read()
            library = library.split('\n')
            
        counter = 0
        for entry in library[-1::-1]:
            entry = json.loads(entry)
            if 'platforms' in entry:
                for p in entry['platforms']:
                    platform = Platform.objects.get_or_create(name=p['name'])
            counter += 1
            if counter % 1000 == 0:
                percentage = counter / 155000 * 100
                percentage = f'{round(percentage, 2)}%'
                print(percentage)