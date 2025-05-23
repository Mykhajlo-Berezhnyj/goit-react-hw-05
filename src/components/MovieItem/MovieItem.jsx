import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import css from './MovieItem.module.css';
import noImage from '../../img/no-image.jpg';

export default function MovieItem({ movie }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.startsWith('/movies/');

  const handleClick = evt => {
    evt.preventDefault();
    const scrollY = window.scrollY;
    navigate(`/movies/${movie.id}`, {
      state: { from: location, pageScroll: scrollY },
    });
  };

  return (
    <Link
      to={`/movies/${movie.id}`}
      onClick={handleClick}
      aria-label={`Open details for ${
        movie.title || movie.original_title || movie.name
      }`}
    >
      <div className={`${css.card} ${isDetailsPage ? css.border : ''}`}>
        {movie.poster_path ? (
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
        ) : (
          <img className={css.poster} src={noImage} alt="No Image Available" />
        )}
        <div className={css.overview}>
          <h2 className={css['title-movie']}>
            {movie.title || movie.original_title || movie.name}
          </h2>
          <p>{movie.overview}</p>
          <p>{movie.genres?.map(genre => genre.name).join(', ')}</p>
          <div className={css.statistic}>
            <p>Popularity: {movie.popularity}</p>
            <p>Vote average: {movie.vote_average}</p>
            <p>Vote count: {movie.vote_count}</p>
          </div>
          <p className={css.data}>{movie.release_date} </p>
        </div>
      </div>
    </Link>
  );
}
