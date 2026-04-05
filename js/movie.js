// window.onload = async () => {
//   const id = localStorage.getItem("selectedMovie");

//   let movie;

//   if (id.startsWith("tt")) {
//     movie = await fetchMovieById(id); // OMDB
//   } else {
//     movie = await fetchTMDBMovie(id); // TMDB
//   }

//   renderMovieDetails(movie);
// };