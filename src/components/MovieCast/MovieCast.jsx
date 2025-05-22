import { useEffect, useState } from 'react';
import css from './MovieCast .module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import { movieCredits } from '../../servise/movieApi';
import CastItem from '../CastItem/CastItem';


export default function MovieCast() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const { movieId } = useParams();

    
    

  useEffect(() => {
    const fetchCast = async () => {
      console.log('Fetching cast for movieId:', movieId);
      try {
        setError(null);
        setLoading(true);
        const response = await movieCredits(movieId);
        const sortedCast = response.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        setCast(sortedCast || []);
      } catch (err) {
        setError(err.message || 'something wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);
    
    const visibleCast = cast.slice(0, visibleCount);

    const hundleLoadCast = () => {
        setVisibleCount(prev => prev + 5);
    }

  return (
    <div >
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ul className={css['cast-card']}>
        {visibleCast.map(item => (
          <li key={item.cast_id} className={css.castItem}>
            <CastItem cast={item} />
          </li>
        ))}
          </ul>
          <button type='button' onClick={hundleLoadCast} className={css['btn-load-more']} disabled={visibleCount >= cast.length} >Load more</button>
    </div>
  );
}
