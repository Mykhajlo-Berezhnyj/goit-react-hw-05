import { useEffect, useState } from 'react';
import css from './MovieVideo.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useLocation, useParams } from 'react-router-dom';
import { movieVideo } from '../../servise/movieApi';
import Video from './Video/Video';

export default function MovieVideo() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const { movieId } = useParams();
  const [selectedVideoKey, setSelectedVideoKey] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await movieVideo(movieId);
        const trailers = response.filter(
          video =>
            video.type === 'Trailer' &&
            video.site === 'YouTube' &&
            video.official,
        );
        setVideos(trailers.slice(0, 5) || []);
      } catch (err) {
        setError(err.message || 'something wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [movieId]);

  const handleClick = key => {
    setSelectedVideoKey(key);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {videos.length > 0 && (
        <>
          <ul className={css.videoList}>
            {videos.map(video => (
              <li className={css.videoItem} key={video.id}>
                <Video
                  video={video}
                  onClick={() => {
                    handleClick(video.key);
                  }}
                />
              </li>
            ))}
          </ul>
          {selectedVideoKey && (
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                marginTop: '20px',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoKey}`}
                title="YouTube trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          )}
        </>
      )}
      {!loading && videos.length === 0 && (
        <p className={css.noVideos}>No video</p>
      )}
    </div>
  );
}
