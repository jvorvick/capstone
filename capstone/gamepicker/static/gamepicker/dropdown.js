document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {});
});

fetch('http://localhost:8000/gamepicker/genres')
  .then((data) => data.json())
  .then((data) => {
    const dropDown = document.getElementById('dropdown1')
    const dropDownBtn = document.getElementById('dropdown-btn')
    let used = false
    data.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      } else {
        return 0
      }
    })
    for (genre of data) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      li.addEventListener('click', () => {
        dropDownBtn.textContent = a.textContent
        filterGame(dropDownBtn.textContent, used, 'genres')
        used = true
      })
      a.href = '#!'
      a.textContent = genre.name
      li.appendChild(a)
      dropDown.appendChild(li)
    }
  })

fetch('http://localhost:8000/gamepicker/platforms')
  .then((data) => data.json())
  .then((data) => {
    const dropDown = document.getElementById('dropdown2')
    const dropDownBtn = document.getElementById('dropdown-btn2')
    let used = false
    data.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      } else {
        return 0
      }
    })
    for (platform of data) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      li.addEventListener('click', () => {
        dropDownBtn.textContent = a.textContent
        filterGame(dropDownBtn.textContent, used, 'platforms')
        used = true
      })
      a.href = '#!'
      a.textContent = platform.name
      li.appendChild(a)
      dropDown.appendChild(li)
    }
  })