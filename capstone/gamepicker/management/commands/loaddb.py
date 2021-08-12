from django.core.management.base import BaseCommand
import requests
from secrets import client_id, secret_id
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
            cover,
            platforms,
            genres.name,
            first_release_date,
            involved_companies.company.name,
            involved_companies.developer,
            involved_companies.publisher,
            summary,
            age_ratings,
            aggregated_rating,
            aggregated_rating_count
            '''
            with open('gamesdb.txt', 'w') as file:
                file.write('')

            counter = 0
            while True:
                response = requests.post('https://api.igdb.com/v4/games', headers=headers, data=f'fields {fields}; limit 500; offset {counter}; sort name asc;')
                counter += 500
                print(counter)
                time.sleep(.25)
                if response.json():
                    with open('gamesdb.txt', 'a') as file:
                        for game in response.json():
                            file.write(json.dumps(game))
                            file.write('\n')
                else:
                    break

        # def getCovers(headers):
        #     with open('coverdb.txt', 'w') as file:
        #         file.write('')

        #     counter = 0
        #     while True:
        #         response = requests.post('https://api.igdb.com/v4/covers', headers=headers, data=f'fields url; limit 500; offset {counter};')
        #         counter += 500
        #         print(counter)
        #         time.sleep(.25)
        #         if response.json():
        #             with open('coverdb.txt', 'a') as file:
        #                 for cover in response.json():
        #                     file.write(json.dumps(cover))
        #                     file.write('\n')
        #         else:
        #             break

        # def getPlatforms(headers):
        #     with open('platformdb.txt', 'w') as file:
        #         file.write('')
        #     response = requests.post('https://api.igdb.com/v4/platforms', headers=headers, data='fields name; limit 500; sort id asc;')
        #     with open('platformdb.txt', 'a') as file:
        #         for platform in response.json():
        #             file.write(json.dumps(platform))
        #             file.write('\n')

        # def getGenres(headers):
        #     with open('genredb.txt', 'w') as file:
        #         file.write('')
        #     response = requests.post('https://api.igdb.com/v4/genres', headers=headers, data='fields name; limit 500; sort id asc;')
        #     with open('genredb.txt', 'a') as file:
        #         for genre in response.json():
        #             file.write(json.dumps(genre))
        #             file.write('\n')

        # def getInvolvedCompanies(headers):
        #     with open('involvedcompanydb.txt', 'w') as file:
        #         file.write('')

        #     counter = 0
        #     while True:
        #         response = requests.post('https://api.igdb.com/v4/involved_companies', headers=headers, data=f'fields company,developer,publisher; limit 500; offset {counter};')
        #         counter += 500
        #         print(counter)
        #         time.sleep(.25)
        #         if response.json():
        #             with open('involvedcompanydb.txt', 'a') as file:
        #                 for involvedcompany in response.json():
        #                     file.write(json.dumps(involvedcompany))
        #                     file.write('\n')
        #         else:
        #             break

        # def getCompanies(headers):
        #     with open('companydb.txt', 'w') as file:
        #         file.write('')

        #     counter = 0
        #     while True:
        #         response = requests.post('https://api.igdb.com/v4/companies', headers=headers, data=f'fields name; limit 500; offset {counter};')
        #         counter += 500
        #         print(counter)
        #         time.sleep(.25)
        #         if response.json():
        #             with open('companydb.txt', 'a') as file:
        #                 for company in response.json():
        #                     file.write(json.dumps(company))
        #                     file.write('\n')
        #         else:
        #             break

        

        getGames(headers)

        # getCovers(headers)

        # getPlatforms(headers)

        # getGenres(headers)

        # getInvolvedCompanies(headers)

        # getCompanies(headers)

        # print(response.json())
