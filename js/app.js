const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allMovies = [];
let display = [];
let searchResults = [];

// trending movies 
window.onload = async () => {
  // Only run this on index.html
  if (document.querySelector(".trending-list")) {
    showLoader();

    const movies = await fetchTrending();
    if (movies) {
      allMovies = movies;
      display = movies;
      renderTrending(display);
    } else {
      showError("Failed to load movies");
    }
  }
};


// input of search bar
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    if (query === "") {
      display = allMovies;
    } else {
      display = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );
    }

    renderTrending(display);
  });
}


//seach button
if (searchBtn) {
  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    showLoader();

    const movies = await fetchMovies(query);
    if (movies) {
      searchResults = movies;
      renderMovies(movies);
    } else {
      showError("No movies found");
    }
  });
}


// filtering and sorting on dashboard
const year = document.getElementById("year");
if (year) {
  year.addEventListener("change", () => {
    const year = year.value;

    display = allMovies.filter(movie =>
      year === "" || movie.release_date?.startsWith(year)
    );

    renderTrending(display);
  });
}

const sort= document.getElementById("sort");
if (sort) {
  sort.addEventListener("change", () => {
    const option = sort.value;
    let sorted = [...display];

    if (option === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (option === "year") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.release_date || "2000");
        const dateB = new Date(b.release_date || "2000");
        return dateB - dateA;
      });
    }

    display = sorted;
    renderTrending(display);
  });
}

const genre= document.getElementById("genre");
if (genre) {
  genre.addEventListener("change", () => {
    const genreId = genre.value;

    if (genreId === "") {
      display = allMovies;
    } else {
      display = allMovies.filter(movie =>
        movie.genre_ids.includes(Number(genreId))
      );
    }

    renderTrending(display);
  });
}


// dark and light mode toggle
const t = document.getElementById("toggle");
if (t) {
  t.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    t.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
  });
}


// watchlist
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function saveWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}


// ADD to watchlist
function addToWatchlist(movie) {
  const normalizedMovie = {
    id: movie.id || movie.imdbID,
    title: movie.title || movie.Title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : movie.Poster || "assets/background.jpg"
  };

  if (!watchlist.find(m => m.id == normalizedMovie.id)) {
    watchlist.push(normalizedMovie);
    saveWatchlist();
    showToast("Added to Watchlist ❤️");
  }
}
// REMOVE from watchlist
function removeFromWatchlist(id) {
  watchlist = watchlist.filter(m => String(m.id) !== String(id));
  saveWatchlist();
  showToast("Removed ❌");

  // Only re-render if on watchlist page
  if (document.getElementById("watchlist")) {
    renderWatchlist();
  }
}


// popup message on adding to watchlist
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("show");
  void toast.offsetWidth;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


function goToMovie(id) {
  localStorage.setItem("selectedMovie", id);
  window.location.href = "movie.html";
}
function addToWatchlistById(id) {
  let movie =
    allMovies.find(m => m.id == id) ||
    display.find(m => m.id == id) ||
    searchResults.find(m => m.imdbID == id); // 🔥 FIX

  if (!movie) {
    return;
  }
  addToWatchlist(movie);
}