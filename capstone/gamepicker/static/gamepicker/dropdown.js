const tagData = {}
function filters() {
  
  // tags
  var tagElems = document.querySelectorAll('.chips');
  var tagInstances = M.Chips.init(tagElems, {
    data: [],
    onChipDelete: function(el, data) {
      const tag = data.innerText.replace('close', '')
      const index = searchFilters.indexOf(tag)
      searchFilters.splice(index, 1)
      filterGame(searchFilters)
    },
    onChipAdd: function(el, data) {
      const tag = data.innerText.replace('\nclose', '')
      if (!searchFilters.includes(tag)) {
        searchFilters.push(tag)
      }
      filterGame(searchFilters)

    },
    placeholder: 'Enter a tag',
    autocompleteOptions: {
      data: tagData
    }
  });

  // dropdowns
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      constrainWidth: false
    });
  });

  fetch('http://localhost:8000/gamepicker/genres')
    .then((data) => data.json())
    .then((data) => {
      const dropDown = document.getElementById('dropdown1')
      const dropDownBtn = document.getElementById('dropdown-btn')
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
        tagData[genre.name] = null
        const li = document.createElement('li')
        const a = document.createElement('a')
        li.addEventListener('click', () => {
          // dropDownBtn.textContent = a.textContent
          // filterGame(dropDownBtn.textContent, used, 'genres')
          // if (!searchFilters.includes(dropDownBtn.textContent)) {
          //   searchFilters.push(dropDownBtn.textContent)
          // }
          tagInstances[0].addChip({
            tag: a.textContent
          })
          filterGame(searchFilters)
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
        tagData[platform.name] = null
        const li = document.createElement('li')
        const a = document.createElement('a')
        li.addEventListener('click', () => {
          // dropDownBtn.textContent = a.textContent
          // filterGame(dropDownBtn.textContent, used, 'platforms')
          if (!searchFilters.includes(a.textContent)) {
            searchFilters.push(a.textContent)
          }
          tagInstances[0].addChip({
            tag: a.textContent
          })
          console.log(searchFilters)
          filterGame(searchFilters)
        })
        a.href = '#!'
        a.textContent = platform.name
        li.appendChild(a)
        dropDown.appendChild(li)
      }
    })
  }
if (window.location.pathname == '/gamepicker/user_page/' || 
window.location.pathname == '/gamepicker/') {
  filters()
}