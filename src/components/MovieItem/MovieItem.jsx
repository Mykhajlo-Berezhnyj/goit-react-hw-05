import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import css from './MovieItem.module.css';
import { useEffect, useState } from 'react';
 
export default function MovieItem({ movie }) {
    const location = useLocation();
    const navigate = useNavigate();
    const state = useState();
   
    const handleClick = evt => {
        evt.preventDefault();
        const scrollY = window.scrollY;
        navigate(`/movies/${movie.id}`, { state: { from: location, pageScroll: scrollY }, });
    };
 
    console.log("🚀 ~ MovieItem ~ scrollY:", window.scrollY);
   
    return (
        <div className={css.container}  onClick={handleClick} >
       
          { `${movie.poster_path}` && <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title || movie.name} />}
         
        <div className={css.overview}>
            <h3 className={css.movie} aria-label={movie.title}> {movie.title || movie.name}</h3>
            <p>{movie.overview}</p>
        </div>
        </div>
  )
};  