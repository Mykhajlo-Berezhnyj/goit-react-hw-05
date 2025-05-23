import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getTrendingMovies } from '../../servise/movieApi';
import ButtonNavigation from '../../components/ButtonNavigation/ButtonNavigation';
import css from './home.module.css';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        setLoading(true);
        const { results, total_pages } = await getTrendingMovies(page);
        setMovies(results);
        setTotalPages(total_pages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  const handlePage = newPage => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className={css.container}>
      <div className={css['list-wrapper']}>
        <h2 className={css.title}>Trending today:</h2>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        <MovieList className={css.list} movies={movies} />
      </div>
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
