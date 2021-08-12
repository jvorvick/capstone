# capstone
Final capstone for PDX Code Guild course

Game Picker

Analysis paralysis and fear of missing out are two common issues for gamers today. For gamers that have an especially hard time making decisions and sticking to them, it can all but ruin their beloved hobby. I propose an app that can serve as a customizable database of games for the user, and can randomly choose a game for the user based on custom filters.

Functionality
- By default, the app will exist as a database of all games. It will be searchable and can be filtered by console, genre, etc. Clicking a button will pull up a random game.
- A profile can be created by the user. The user will have the option to search for games and add them to their own digital collection. They can then click "randomize" to draw from this collection.
- The user can also set filters for their own collection before clicking randomize. The app will randomize based on this filter.

Data Model

Game
-name
-cover art
-system(s) - manytomany = System
-genre - foreignkey = Genre
-release date - (datetime.utcfromtimestamp(1353369600).strftime('%b %d, %Y'))
-companies - foreignkey = Company
-description
-age ratings - foreignkey = AgeRating
-aggregated rating
-aggregated rating count

AgeRating
-text

Company
-name

Genre
-name

System
-name
-company
-release year

Profile (week 3)
-username
-password
-games
-systems

Schedule

Week 1
Implement database
 - Create game models
 - Create profile model
Connect routes to views for accessing data
 - randomize button

Html templates, rough framework
Styling

have completed "1.0"
 
Week 2
add:
 - search bar
 - genre drop down
 - systems drop down

Week 3
add:
 - create profile
 - update profile
 - delete profile

Week 4
don't add new features
last minutute bug fixes or style changes