let gameData = []
let searchData = {}
const randomBtn = document.getElementById('random-btn')
const searchBar = document.getElementById('autocomplete-input')

const searchFilters = []

function random() {
  randomBtn.addEventListener('click', () => {
    // const randomGame = gameData[Math.floor(Math.random()*gameData.length)]
    // filterGame(searchFilters)

    const randomGame = function (searchData) {
      const keys = Object.keys(searchData)
      if (keys.length === 0) {
        return false
      }
      console.log(keys)
      // return gameData[keys[keys.length * Math.random() << 0]]
      return keys[Math.floor(Math.random() * keys.length)]
    }
    const game = randomGame(searchData)
    if (game) {
      getGame(game)
    } else {
      alert('No games match these filters.')
    }
  })
}
var elems = document.querySelectorAll('.autocomplete');
var instances = M.Autocomplete.init(elems, {
  data: searchData,
  onAutocomplete: function (el) {
    console.log(el)
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
    // console.log(a, '@@@', b)
    return a.localeCompare(b);
  },
  
}); 


// searchBar.addEventListener('click', () => {
//   console.log('hi')
//   filterGame(searchFilters)
// })

function filterGame(filters=false) {
  searchData = {}
  if (!filters) {
    for (let game of gameData) {
      searchData[game.name_and_date] = null;
    }
  } else {
    let temp = gameData
    for (filter of filters) {
      temp = temp.filter(game => game.genres.split(', ').includes(filter) || game.platforms.split(', ').includes(filter))
    }
    for (let game of temp) {
      searchData[game.name_and_date] = null;
    }
  }
  // game[type].split.(', ').incudes()
  instances[0].updateData(searchData)
}

function getGame(game) {
  fetch(`http://localhost:8000/gamepicker/${game}`)
    .then((data) => data.json())
    .then((data) => {
      showGame(data)
    })
}

function showGame(games) {
  const searchResult = document.getElementById('search-result')

  searchResult.innerHTML = ''

  for (let game of games) {
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

    // button to add to user collection
    const button = document.createElement('a')
    button.className = 'waves-effect waves-light btn'
    button.textContent = 'Add to Collection'
    searchResult.append(button)
    if (game.in_collection) {
      button.textContent = 'Added'
      button.classList.add('disabled')
    }
    console.log(game)
    console.log(game.id)
    button.addEventListener('click', () => {
      console.log(game.id)
      fetch(`http://localhost:8000/gamepicker/collection/${game.id}`)
      .then(data => {
        console.log(data.status)
        if (data.status == 299) {
          window.location = 'http://localhost:8000/gamepicker/login/'
        }
        button.textContent = 'Added'
        button.classList.add('disabled')
      })
    })
  }
}

function getAllGames() {
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
}

function getUserGames() {
  fetch('http://localhost:8000/gamepicker/user_games')
    .then((data) => data.json())
    .then((data) => {
      gameData = data
      filterGame()
      const loading = document.getElementById('loading')
      const main = document.getElementById('main')
      loading.classList.add('hidden')
      main.classList.remove('hidden')
    })
}

function collectionDetails() {
  const collection = document.getElementById('collection')
  console.log(collection.children)
  for (let child of collection.children) {
    const details = child.querySelector('[id]')
    console.log(details)
    details.addEventListener('click', () => {
      const game = details.id
      getGame(game)
    })
    
    

  }
}

if (window.location.pathname == '/gamepicker/user_page/') {
  random()
  getUserGames()
  collectionDetails()
} else if (window.window.location.pathname == '/gamepicker/') {
  random()
  getAllGames()
}