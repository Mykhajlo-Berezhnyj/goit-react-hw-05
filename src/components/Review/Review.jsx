import css from './Review.module.css';
import noImage from '../../img/avatar.png';
import { useLocation } from 'react-router-dom';

export default function Review({ review }) {
    const location = useLocation();
    const state = location.state;
    
  return (
    <div className={css.reviewContainer}>
      <div className={css.avtorInfo}>
        <img
          className={css.avatar}
          src={
            review.author_details.avatar_path
              ? `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`
              : noImage
          }
          alt="username"
        />
        <p>{review.author_details.name || review.author_details.username}</p>
      </div>
      <div className={css.reviewContent}>
        <p>{review.content}</p>
        <p className={css.data}>Created: {review.created_at}</p>
        <p className={css.data}>Updated: {review.updated_at}</p>
        <a className={css['review-link']} href={review.url} target="_blank" rel="noopener noreferrer">
          View original review
        </a>
      </div>
    </div>
  );
}