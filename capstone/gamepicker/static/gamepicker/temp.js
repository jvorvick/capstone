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