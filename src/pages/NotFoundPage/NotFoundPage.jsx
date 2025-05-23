import { useEffect, useState } from 'react';
import css from './NotFoundPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          navigate('/');
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div className={css.container}>
      <h2 className={css.notFound}>404 Page Not Found 😕</h2>
      <Link className={css.backHome} to="/">
        Back to Home
      </Link>
      <p>Redirect after {seconds} s</p>
    </div>
  );
}
