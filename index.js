const searchInput = document.getElementById("search--input");
const resultContainer = document.getElementById("result--wrap");
let watchlistArray = JSON.parse(localStorage.getItem("watchlist") || "[]");
// localStorage.clear();
// console.log(watchlistArray);

function addOrRemoveWhatchlist(e) {
  const isOnwatchList = watchlistArray.includes(e.target.id);
  if (isOnwatchList) {
    watchlistArray = watchlistArray.filter((movie) => movie !== e.target.id);
    e.target.innerHTML = `<img src="img/Icon2.png" class="btn-list" /> Add to Watchlist`;
    removeWatchfromDOM(e);
  } else {
    watchlistArray.push(e.target.id);
    e.target.innerHTML = `<img src="img/Icon.png" class="btn-list" /> Remove from Watchlist`;
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
}

function displayMovie(movie) {
  const isInwatchlist = watchlistArray.includes(movie.imdbID);

  if (movie === "Error") {
    resultContainer.innerHTML = "<br/><br/> No movie Found or too many result";
    return;
  }
  let resultHTML = `<div class="each--movie" id="div-${movie.imdbID}">
                        <a href="https://www.imdb.com/title/${
                          movie.imdbID
                        }/"><img src="${
    movie.Poster
  }" class="movie--poster" /></a>
                        <div class="movie--details">
                          <div class="movie--header">
                             <h3><a href="https://www.imdb.com/title/${
                               movie.imdbID
                             }/">${movie.Title}</a></h3>
                            <img class="rating--img" src="img/star-icon.png" />
                            <p>${movie.imdbRating}</p>
                          </div>
                          <div class="break"></div>
                          <div class="top-movie--details">
                            <p>${movie.Runtime} &nbsp; ${movie.Genre}</p>

                            <button id="${
                              movie.imdbID
                            }" onclick="addOrRemoveWhatchlist(event)">
                              <img src="img/${
                                isInwatchlist ? "Icon.png" : "Icon2.png"
                              }" class="btn-list" /> 
                              ${
                                isInwatchlist
                                  ? " Remove from Watchlist"
                                  : "Add to Watchlist"
                              }
                            </button>
                          </div>
                          <p class="movie--decription">
                          ${movie.Plot}
                          </p>
                        </div>
                  </div>`;

  resultContainer.classList.add("result--container");
  resultContainer.innerHTML += resultHTML;
}
function getMovieDetails(id) {
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=3f29dea`)
    .then((res) => res.json())
    .then((data) => {
      displayMovie(data);
    });
}
if (searchInput) {
  //check if search input is on the page before binding
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // event.preventDefault();
      getMovie(searchInput.value);
    }
  });
}
function getMovie(query) {
  resultContainer.innerHTML = "";
  resultContainer.classList.remove("result--container");
  fetch(`https://www.omdbapi.com/?s=${query}&apikey=3f29dea`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        const movies = data.Search;
        movies.map((movie) => {
          getMovieDetails(movie.imdbID);
        });
      } else {
        displayMovie("Error");
      }
    });
}
