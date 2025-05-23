import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { movieDetails } from '../../servise/movieApi';
import css from './MovieDetailsPage.module.css';
import Navigation from '../../components/Navigation/Navigation';
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import MovieItem from '../../components/MovieItem/MovieItem';

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
      <div className={css.container}>
      <Navigation />
      <button className={css['btn-back']} type="button" onClick={handleGoBack} aria-label="Go back to previous page">
        Back
      </button>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {data && (
        <div className={css['container-detalies']} >
            <MovieItem movie={data}/>   
            <nav className={css.info}>
                <Link className={css['info-link']}
                  to="cast"
                  state={{
                    from: state?.from ?? '/',
                    pageScroll: state?.pageScroll,
                  }} aria-label={'Open info about actors'}
                >
                  Cast
                </Link>
                      <Link className={`${css['info-link']} ${css['reviews-link']}`}
                  to="reviews"
                  state={{
                    from: state?.from ?? '/',
                    pageScroll: state?.pageScroll,
                  }} aria-label={'Open reviews'}
                >
                  Reviews
                </Link>
            </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
}
