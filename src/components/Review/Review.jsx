import css from './Review.module.css';
import noImage from '../../img/avatar.png';

export default function Review({review}) {
  
    return (
        <div className={css.reviewContainer}>
                 <div className={css.avtorInfo}>
                     <img className={css.avatar} src={review.author_details.avatar_path? `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`: noImage} alt="username" />
                     <p>Name: {review.author_details.name || review.author_details.username}</p>
                 </div>
               <div className={css.reviewContent}>
                   <h4>{review.author}</h4>
                     <p>{review.content}</p>
                     <p>Created: {review.created_at}</p>
                     <p>Updated: {review.updated_at}</p>
                     <a href={review.url} target="_blank" rel="noopener noreferrer">View original review</a>
               </div>
        </div>
    )
    
}