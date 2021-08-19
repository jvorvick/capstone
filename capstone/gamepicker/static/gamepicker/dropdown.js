document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {});
});

const dropDown = document.getElementById('dropdown1')
const dropDownBtn = document.getElementById('dropdown-btn')

fetch('http://localhost:8000/gamepicker/genres')
  .then((data) => data.json())
  .then((data) => {
    for (genre of data) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      li.addEventListener('click', () => {
        dropDownBtn.textContent = a.textContent
        filterGame(dropDownBtn.textContent)
      })
      a.href = '#!'
      a.textContent = genre.name
      li.appendChild(a)
      dropDown.appendChild(li)
    }
  })