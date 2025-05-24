import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieItem from './MovieItem/MovieItem';
import css from './MovieList.module.css';

export default function MovieList({ movies = [] }) {
  const location = useLocation();

  useEffect(() => {
    const scrollY = location.state?.pageScroll;
    if (scrollY !== undefined) {
      window.scrollTo({ top: scrollY, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.key, movies.length]);

  return (
    <div>
      {(!Array.isArray(movies) || movies.length === 0) && (
        <p>No movies found</p>
      )}
      <ul className={css['movie-list']}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <MovieItem movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
