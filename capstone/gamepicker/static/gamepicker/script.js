let gameData = {} 

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {
    data: gameData,
    onAutocomplete: function (el) {
      getGame(el);
    },
    limit: 10
  });
});

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


  searchResult.append(name)
  searchResult.append(cover)
  searchResult.append(platforms)
}

fetch('http://localhost:8000/gamepicker/all')
  .then((data) => data.json())
  .then((data) => {
    for (let game of data) {
      gameData[game.name] = null;
    }
  })