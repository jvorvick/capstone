from django.core.management.base import BaseCommand
import requests
from secretkeys import client_id, secret_id
import time, json

class Command(BaseCommand):

    def handle(self, *args, **options):
        response = requests.post(f'https://id.twitch.tv/oauth2/token?client_id={client_id}&client_secret={secret_id}&grant_type=client_credentials')
        access_token = response.json()['access_token']
        headers = {
            'Client-ID': client_id,
            'Authorization': f'Bearer {access_token}'
        }
        
        def getGames(headers):
            fields = '''
            name,
            cover.url,
            platforms.name,
            genres.name,
            first_release_date,
            involved_companies.company.name,
            involved_companies.developer,
            involved_companies.publisher,
            summary,
            age_ratings.category,
            age_ratings.rating,
            rating,
            rating_count
            '''
            with open('gamesdb.txt', 'w') as file:
                file.write('')

            counter = 0
            data = []
            while True:
                response = requests.post('https://api.igdb.com/v4/games', headers=headers, data=f'fields {fields}; limit 500; offset {counter}; sort name asc;')
                counter += 500
                print(counter)
                time.sleep(.25)
                if response.json():
                    for game in response.json():
                        data.append(json.dumps(game))
                else:
                    break
            with open('gamesdb.txt', 'w') as file:
                data = '\n'.join(data)
                file.write(data)
        getGames(headers)