import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites) {
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {favorites.map(movie)=>{
          <MovieCard movie={movie} key={movie.id}/>
        )}}};
      </div>
      heloo
    </div>
  }
}
export default Favorites;

