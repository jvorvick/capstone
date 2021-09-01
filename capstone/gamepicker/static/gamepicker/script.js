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
    // const ageRatingCategory = document.createElement('p')
    let ageRatingCategoryText = game.age_rating_category
    console.log(ageRatingCategoryText)
    const ratingCategories = {
      1 : 'ESRB',
      2 : 'PEGI'
    }
    
    ageRatingCategoryText = ratingCategories[ageRatingCategoryText] ? ratingCategories[ageRatingCategoryText] + ': ' : ''
    // ageRatingCategory.textContent = ageRatingCategoryText



    // const ageRatingRating = document.createElement('p')
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
    ageRatingRatingText = ratingRatings[ageRatingRatingText] || ''
    // ageRatingRating.textContent = ageRatingRatingText

    

    let div = document.createElement('div')
    div.innerHTML = `
    <h2 class="header">${game.name}</h2>
    <div class="card horizontal">
      <div class="card-image">
        <img src="${game.cover}" alt="${game.name}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h5>Platforms</h5>
          <p>${game.platforms}</p>
          <h5>Genres</h5>
          <p>${game.genres}</p>
          <h5>Release Date</h5>
          <p>${game.first_release_date}</p>
          <h5>Developers/Publishers</h5>
          <p>${game.companies}</p>
          <h5>Summary</h5>
          <p>${game.summary}</p>
          <h5>Age Rating</h5>
          <p>${ageRatingCategoryText}${ageRatingRatingText}</p>
        </div>
        <div class="card-action">
          <a>Add to Collection</a>
        </div>
      </div>
    </div>
    `

    // link to add to user collection
    const button = div.querySelector('a')
    button.className = 'btn red darken-3'
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
    searchResult.append(div)
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