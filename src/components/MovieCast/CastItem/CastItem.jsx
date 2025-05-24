import css from './CastItem.module.css';
import noImage from '../../../img/no-image.jpg';

export default function CastItem({ cast }) {
  return (
    <div>
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
            : noImage
        }
        alt={cast.name}
        className={css.actorPhoto}
        loading="lazy"
      />
      <div className={css.actorInfo}>
        <h4 className={css.actorName}>{cast.name}</h4>
        <p>Popularity: {cast.popularity.toFixed(2)}</p>
        <p className={css.actorRole}>
          Character: {cast.character || 'Unknown'}
        </p>
      </div>
    </div>
  );
}
