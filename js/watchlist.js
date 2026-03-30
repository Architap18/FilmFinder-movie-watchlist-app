function addToWatchlist(movie) {
  let list = JSON.parse(localStorage.getItem("watchlist")) || [];

  const exists = list.find(item => item.id === movie.id);

  if (!exists) {
    list.push(movie);
  }

  localStorage.setItem("watchlist", JSON.stringify(list));
}