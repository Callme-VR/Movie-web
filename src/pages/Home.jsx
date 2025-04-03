import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useEffect(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const PopularMovies = await getPopularMovies();
        setMovies(PopularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(true);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(false);
    } catch (err) {
      console.log(err);
      setError("failed to search movies..");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="Search-form">
        <input
          type="text"
          placeholder="search for movie.... "
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search...
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
