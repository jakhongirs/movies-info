/* Bizni API Key-imiz Magic Number bo'lgani uchun uni nomlab qo'yapmiz */
var API_KEY = 'b1566df1';

var SEARCH_ADDRESS;

/* HTML-dagi Form, Input, Template tanishtirib olyapmiz nom berib */
var elSearchForm = document.querySelector('.js-search-form');
var elSearchInput = elSearchForm.querySelector('.js-search-input');
var elMovieTemplate = document.querySelector('.result-template').content;
var elTotalResults = document.querySelector('.movie__total-results');
var elMovieList = document.querySelector('.movie__list');

/* Formaning submitiga quloq solyapmiz */
elSearchForm.addEventListener('submit', evt => {
  evt.preventDefault();

  elMovieList.innerHTML = "";

  SEARCH_ADDRESS = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${elSearchInput.value.trim()}`;
  
  /* Fetch orqali o'zimizni api keyimizdan foydalanib user kiritgan valueni topib uni trim qilib olib kelyapmiz */
  fetch(SEARCH_ADDRESS)
  
  /* Agar Fetchdan tayinli ma'lumot olib kelsa ya'ni boradi ma'lumot topsa bizga uni statusi 200-ga teng bo'lsa
  o'shani jsonga convert qilib return qilib beradi */
  .then(response => {
    if(response.status === 200){
      return response.json();
    }
  }).then(data => { /* Keyin bizga json qilib bergandan so'ng bizga uni ichidagi datasini qaytarib ber deyapmiz */
    if(data.Response === 'True'){

      elTotalResults.textContent = `Total Results: ${data.totalResults}`;
      /* Data-ning search objectni ichidagi arraylarni aylanib chiqib har biriga movie deb nom berib
      template-dab clone olib joylab chiqyapmiz */
      data.Search.forEach(movie =>{
        var elMovie = elMovieTemplate.cloneNode(true);

        elMovie.querySelector('.movie__title').textContent = movie.Title;
        /* elMovie.querySelector('.movie__year').textContent = movie.Year; */
        elMovie.querySelector('.movie__img').src = movie.Poster;
        elMovie.querySelector('.movie__img').alt = `Poster of ${movie.Poster}`;
        elMovie.querySelector('.js-movie-info').dataset.imdbId = movie.imdbID;

        document.querySelector('.movie__list').appendChild(elMovie);
      });
    }
  });
});