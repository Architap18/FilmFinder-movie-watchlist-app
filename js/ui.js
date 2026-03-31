function renderTrending(movies) {
  const container = document.querySelector(".trending-list");
  container.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const img = movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: "assets/background.jpg";

    card.innerHTML = `
      <div class="poster-container">
        <img src="${img}" onerror="this.src='assets/background.jpg'">
        <button onclick='addToWatchlist(${JSON.stringify(movie)})'>ADD</button>
      </div>
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

    card.innerHTML = `
      <div class="poster-container">
        <img src="${poster}" onerror="this.src='assets/background.jpg'">
        <button onclick='addToWatchlist(${JSON.stringify(movie)})'>ADD</button>
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