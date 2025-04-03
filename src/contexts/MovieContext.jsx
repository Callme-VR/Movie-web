import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export default MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFav = localStorage.getItem("favorites");

    if (storedFav) setFavorites(JSON.parse(storedFav));
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };
  const RemoveFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter(movie=>movie.is!=movieId);
  };
  const isFavorites = (movieId)=>{
    return favorites.some(movie=>movie.id === movieId)
  }
  const value = {
    favorites,
    addToFavorites,
    RemoveFromFavorites,
    isFavorites
  }
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
