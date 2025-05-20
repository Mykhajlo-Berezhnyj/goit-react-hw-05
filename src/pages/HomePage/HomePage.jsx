import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getTrendingMovies } from '../../servise/movieApi';
import ButtonNavigation from '../../components/ButtonNavigation/ButtonNavigation';
import css from './home.module.css';

export default function HomePage() {
     const [error, setError] = useState(null);
      const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
      const [loading, setLoading] = useState(false);
    
      useEffect(() => {
        const fetchMovies = async () => {
          try {
            setError(null);
            setLoading(true);
            const {results, total_pages} = await getTrendingMovies(page);
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
    
    
    
    return (
          <div className={css.container}>
              {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            <MovieList className={css.list} movies={movies} />
            {totalPages > 1 && (
              <ButtonNavigation
                 page={page}
                 totalPages={totalPages}
                 onClick={setPage}
  />
)}
                 
        </div>
    )
}