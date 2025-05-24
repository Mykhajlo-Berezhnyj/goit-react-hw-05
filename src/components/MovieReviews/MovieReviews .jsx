import { useEffect, useState } from 'react';
import css from './MovieReviews .module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useLocation, useParams } from 'react-router-dom';
console.log('🚀 ~ Location:', Location);
import { movieReviews } from '../../servise/movieApi';
import Review from './Review/Review';

export default function MovieReviews() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  console.log('🚀 ~ MovieReviews ~ Location:', Location);

  useEffect(() => {
    const fetchReviews = async () => {
      console.log('Fetching cast for movieId:', movieId);
      try {
        setError(null);
        setLoading(true);
        const response = await movieReviews(movieId);
        const sortedReviews = response.sort(
          (a, b) =>
            (b.author_details.rating || 0) - (a.author_details.rating || 0),
        );
        setReviews(sortedReviews || null);
      } catch (err) {
        setError(err.message || 'something wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <Review review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>No reviews</p>
      )}
    </div>
  );
}
