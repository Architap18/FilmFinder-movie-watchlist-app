function renderTrending(movies) {
  const container = document.querySelector(".trending-list");
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const img = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "assets/background.jpg";

    const id = movie.id;
    const isAdded = watchlist.some(m => m.id == id);

    card.innerHTML = `
      <div class="poster-container">
        <img src="${img}" onclick="goToMovie('${id}')" onerror="this.src='assets/background.jpg'">

       <button onclick="addToWatchlistById('${movie.id}')">ADD</button>

      <h3>${movie.title}</h3>
      <p>${movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
    `;

    container.appendChild(card);
  });
}


function renderMovies(movies) {
  const container = document.querySelector(".trending-list");
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const poster = movie.Poster !== "N/A"
      ? movie.Poster
      : "assets/background.jpg";

    const id = movie.imdbID;
    const isAdded = watchlist.some(m => m.id == id);

    card.innerHTML = `
      <div class="poster-container">
        <img src="${poster}" onclick="goToMovie('${id}')" onerror="this.src='assets/background.jpg'">

        <button onclick="addToWatchlistById('${movie.imdbID}')">ADD</button>
      </div>

      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    container.appendChild(card);
  });
}
function showLoader() {
  document.querySelector(".trending-list").innerHTML = "Loading...";
}
function showError(msg) {
  document.querySelector(".trending-list").innerHTML = msg;
}




//watchlist
function renderWatchlist() {
  const container = document.getElementById("watchlist");
  if (!container) return;

  container.innerHTML = "";

  if (watchlist.length === 0) {
    container.innerHTML = "<p>No movies added 😢</p>";
    return;
  }

  watchlist.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie-card");

    div.innerHTML = `
      <img src="${movie.poster}" style="width:120px;">
      <p>${movie.title}</p>
      <button onclick="removeFromWatchlist('${movie.id}')">
        Remove 
      </button>
    `;

    container.appendChild(div);
  });
}

function renderMovieDetails(movie) {
  const container = document.getElementById("movieDetails");

  const title = movie.title || movie.Title;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.Poster;

  container.innerHTML = `
    <h1>${title}</h1>
    <img src="${poster}" style="width:200px">
    <p>${movie.overview || movie.Plot}</p>
  `;
}