import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { movieDetails } from '../../servise/movieApi';
import css from './MovieDetailsPage.module.css';
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const handleGoBack = () => {
    navigate(location.state?.from || '/', {
      state: location.state,
    });
  };

  useEffect(() => {
    if (!movieId) return;
    const fetchDetails = async () => {
      try {
        setError(null);
        setLoading(true);
        const results = await movieDetails(movieId);
        setData(results);
      } catch (err) {
        setError(err.message || 'something wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  return (
    <div>
      <button className={css['btn-back']} type="button" onClick={handleGoBack}>
        Back
      </button>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {data && (
        <div className={css.container}>
          {`${data.poster_path}` && (
            <img
              src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
              alt={data.title || data.name}
            />
          )}
          <div className={css.overview}>
            <h2 className={css['title-movie']}>{data.original_title}</h2>
            <p>{data.overview}</p>
            <p>{data.release_date} </p>
            <p>{data.genres?.map(genre => genre.name).join(', ')}</p>
            <nav className={css.info}>
              <Link to="cast">Cast</Link>
              <Link to="reviews">Reviews</Link>
            </nav>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
