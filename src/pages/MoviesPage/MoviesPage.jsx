import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import { searchMovie } from '../../servise/movieApi';
import MovieList from '../../components/MovieList/MovieList';
import ButtonNavigation from '../../components/ButtonNavigation/ButtonNavigation';
import css from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';

  const handlePage = newPage => {
    setSearchParams({
      query,
      page: newPage,
    });
  };

  const handleSearch = newQuery => {
    setSearchParams({
      query: newQuery,
      page: 1,
    });
    setMovies([]);
    setError(false);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setError(null);
        setLoading(true);
        const { results, total_pages } = await searchMovie(query, page);
        setTotalPages(total_pages);
        setMovies(results);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query, page]);

  return (
    <div>
      <h2>Search Movie</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <SearchForm onSearch={handleSearch} />
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movie found this query</p>
      )}
      {totalPages > 1 && (
        <ButtonNavigation
          page={page}
          totalPages={totalPages}
          onClick={handlePage}
        />
      )}
    </div>
  );
}
