import { useEffect, useState } from 'react';
import css from './MovieCast .module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import { movieCredits } from '../../servise/movieApi';
import noImage from '../../img/no-image.jpg';

export default function MovieCast() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      console.log('Fetching cast for movieId:', movieId);
      try {
        setError(null);
        setLoading(true);
        const response = await movieCredits(movieId);
        setData(response || []);
      } catch (err) {
        setError(err.message || 'something wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ul>
        {data.map(item => (
          <li key={item.cast_id} className={css.castItem}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                  : noImage
              }
              alt={item.name}
              className={css.actorPhoto}
            />
            <p className={css.actorName}>{item.name}</p>
            <p className={css.actorRole}>
              Character: {item.character || 'Unknown'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
