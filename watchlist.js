if (watchlistArray) {
  watchlistArray.map((movie) => {
    getMovieDetails(movie);
    // displayMovie(movie);
  });
}
// const watchBtns = document.getElementsByClassName("watch--btn");
// for (const btn of watchBtns) {
//   btn.addEventListener("click", function (event) {
//     console.log("box clicked", event.target.id);
//   });
// }

function removeWatchfromDOM(e) {
  const ID = e.target.id;
  document.getElementById(`div-${ID}`).remove();
  //   resultContainer.classList.remove("result--container");

  //   e.target.closest(".each--movies").remove();
}
// console.log(localStorage.getItem("watchlist"));
