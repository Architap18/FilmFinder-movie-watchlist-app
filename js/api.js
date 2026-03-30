const API_KEY = "dd242e";

async function fetchMovies(query) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      return null;
    }
  } 
  catch (error) {
    return null;
  }
}
const TMDB_KEY = "a7fc6ada70faebbe123123c351922274";

async function fetchTrending() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_KEY}`);
    const data = await res.json();
    return data.results;
  } 
  catch (err) {
    return null;
  }
}