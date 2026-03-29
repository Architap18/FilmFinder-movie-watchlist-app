// function getWatchlist() {
//   return JSON.parse(localStorage.getItem("watchlist")) || [];
// }

// function addToWatchlist(movie) {
//   let watchlist = getWatchlist();

//   if (!watchlist.find(m => m.id === movie.id)) {
//     watchlist.push(movie);
//     localStorage.setItem("watchlist", JSON.stringify(watchlist));
//     displayWatchlist();
//   }
// }

// function removeFromWatchlist(id) {
//   let watchlist = getWatchlist().filter(m => m.id !== id);
//   localStorage.setItem("watchlist", JSON.stringify(watchlist));
//   displayWatchlist();
// }

function addToWatchlist(movie) {
  let list = JSON.parse(localStorage.getItem("watchlist")) || [];

  const exists = list.find(item => item.id === movie.id);

  if (!exists) {
    list.push(movie);
  }

  localStorage.setItem("watchlist", JSON.stringify(list));
}