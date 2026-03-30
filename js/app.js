
const searchInput = document.getElementById("searchInput");   //search input element

async function handleSearch() {
  const query = searchInput.value;
  showLoader();
  const movies = await fetchMovies(query);
  if (movies) {
    renderMovies(movies);
  } else {
    showError("No movies found");
  }
}
window.onload = async () => {
  showLoader();
  const movies = await fetchTrending();
  if (movies) {
    renderTrending(movies);
  } else {
    showError("Failed to load trending");
  }
};

const searchBtn = document.querySelector("button");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (!query)
    {return;}

  showLoader();

  const movies = await fetchMovies(query);

  if (movies) {
    renderMovies(movies);
  } else {
    showError("No movies found");
  }
});
