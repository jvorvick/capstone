let gameData = []
let searchData = {}
const randomBtn = document.getElementById('random-btn')

randomBtn.addEventListener('click', () => {
  // const randomGame = gameData[Math.floor(Math.random()*gameData.length)]
  const randomGame = function (searchData) {
    const keys = Object.keys(searchData)
    console.log(keys)
    // return gameData[keys[keys.length * Math.random() << 0]]
    return keys[Math.floor(Math.random() * keys.length)]
  }
  const game = randomGame(searchData)
  getGame(game)
})


var elems = document.querySelectorAll('.autocomplete');
var instances = M.Autocomplete.init(elems, {
  data: searchData,
  onAutocomplete: function (el) {
    getGame(el);
  },
  // limit: 10,
  minLength: 3,
  sortFunction : function (a, b, inputString) {
    if (a.startsWith(inputString) && b.startsWith(inputString)) {
      return a.localeCompare(b);
    }
    if (a.startsWith(inputString)) {
      return -1
    } else if (b.startsWith(inputString)) {
      return 1
    } 
    console.log(a.localeCompare(b))
    // console.log(a, '@@@', b)
    return a.localeCompare(b);
  },
  
});
console.log(instances)


function filterGame(filter=false) {
  searchData = {}
  if (!filter) {
    for (let game of gameData) {
      searchData[game.name] = null;
    }
  } else {
    for (let game of gameData) {
      if (game.genres === filter) {
        searchData[game.name] = null;
      }
    }
    console.log(filter)
  }
  instances[0].updateData(searchData)
}

function getGame(game) {
  fetch(`http://localhost:8000/gamepicker/${game}`)
    .then((data) => data.json())
    .then((data) => {
      showGame(data)
    })
}

function showGame(game) {
  const searchResult = document.getElementById('search-result')

  searchResult.innerHTML = ''

  const name = document.createElement('h3')
  name.textContent = game.name
  const cover = document.createElement('img')
  cover.src = game.cover
  cover.alt = game.name
  const platforms = document.createElement('p')
  platforms.textContent = game.platforms
  const genres = document.createElement('p')
  genres.textContent = game.genres
  const first_release_date = document.createElement('p')
  first_release_date.textContent = game.first_release_date
  const companies = document.createElement('p')
  companies.textContent = game.companies
  const summary = document.createElement('p')
  summary.textContent = game.summary

  const ageRatingCategory = document.createElement('p')
  let ageRatingCategoryText = game.age_rating_category
  const ratingCategories = {
    1 : 'ESRB',
    2 : 'PEGI'
  }
  ageRatingCategoryText = ratingCategories[ageRatingCategoryText]
  ageRatingCategory.textContent = ageRatingCategoryText

  const ageRatingRating = document.createElement('p')
  let ageRatingRatingText = game.age_rating_rating
  const ratingRatings = {
    1 : 'Three',
    2 : 'Seven',
    3 : 'Twelve',
    4 : 'Sixteen',
    5 : 'Eighteen',
    6 : 'RP',
    7 : 'EC',
    8 : 'E',
    9 : 'E10',
    10 : 'T',
    11 : 'M',
    12 : 'AO'
  }
  ageRatingRatingText = ratingRatings[ageRatingRatingText]
  ageRatingRating.textContent = ageRatingRatingText

  // const age_rating_category = document.createElement('p')
  // age_rating_category.textContent = game.age_rating_category
  // const age_rating_rating = document.createElement('p')
  // age_rating_rating.textContent = game.age_rating_rating


  searchResult.append(name)
  searchResult.append(cover)
  searchResult.append(platforms)
  searchResult.append(genres)
  searchResult.append(first_release_date)
  searchResult.append(companies)
  searchResult.append(summary)
  searchResult.append(ageRatingCategory)
  searchResult.append(ageRatingRating)
}

fetch('http://localhost:8000/gamepicker/all')
  .then((data) => data.json())
  .then((data) => {
    gameData = data
    filterGame()
    const loading = document.getElementById('loading')
    const main = document.getElementById('main')
    loading.classList.add('hidden')
    main.classList.remove('hidden')
  })

