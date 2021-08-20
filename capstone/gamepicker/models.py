from django.db import models

# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=200)
    name_and_date = models.CharField(max_length=210)
    cover = models.URLField()
    platforms = models.CharField(max_length=50)
    genres = models.CharField(max_length=20)
    first_release_date = models.CharField(max_length=20)
    companies = models.CharField(max_length=50)
    companies_developer = models.BooleanField()
    companies_publisher = models.BooleanField()
    summary = models.CharField(max_length=1500)
    age_rating_category = models.IntegerField()
    age_rating_rating = models.IntegerField()

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name