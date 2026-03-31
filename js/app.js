const searchInput = document.getElementById("searchInput");
const searchBtn = document.querySelector("button");
let allMovies = [];
let display=[]; // a modified arrat to store the current data
//trending movies
window.onload = async () => {
  showLoader();
  const movies = await fetchTrending();
  if (movies) {
    allMovies = movies;
    display = movies;
    renderTrending(display);
  } else {
    showError("Failed to load movies");
  }
};
// searching
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
//search button
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    return;
  }
  showLoader();
  const movies = await fetchMovies(query);
  if (movies) {
    renderMovies(movies);
  } else {
    showError("No movies found");
  }
});
//yearwise
document.getElementById("yearFilter").addEventListener("change", () => {
  const year = document.getElementById("yearFilter").value;
  display= allMovies
  .filter(movie =>year === "" || movie.release_date?.startsWith(year));
  renderTrending(display);
});
//sorting
document.getElementById("sort").addEventListener("change", () => {
  const option = document.getElementById("sort").value;

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

const t=document.getElementById("toggle");
t.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  t.textContent =document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});