import css from './Video.module.css';
import { useLocation } from 'react-router-dom';

export default function Video({ video, onClick }) {
  const location = useLocation();

  return (
    <div className={css.videoContainer}>
      <button className={css.watchButton} onClick={() => onClick(video.key)}>
        Watch trailer
      </button>
      <p>Name: {video.name}</p>
      <p>Site: {video.site}</p>
      <p>Size: {video.size}</p>
      <p>Type: {video.type}</p>
    </div>
  );
}
