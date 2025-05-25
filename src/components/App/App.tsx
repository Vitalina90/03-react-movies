import { useState, type ReactElement } from "react";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App(): ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast('No movies found for your request.');
        return;
      }
      setMovies(results);
    } catch {
        setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading &&
        <Loader />}
      {error &&
        <ErrorMessage />}
      {movies.length > 0 &&
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
      {selectedMovie &&
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
    
}

