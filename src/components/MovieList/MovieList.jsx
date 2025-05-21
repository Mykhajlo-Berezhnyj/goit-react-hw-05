import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import css from './MovieList.module.css';


export default function MovieList({ movies = [] }) {
    const location = useLocation();
    console.log("🚀 ~ MovielIST ~ scrollY:", window.scrollY);
    if (!Array.isArray(movies) || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    useEffect(() => {
        const scrollY = location.state?.pageScroll;
        if (scrollY !== undefined) {
          window.scrollTo({ top: scrollY, behavior: 'auto' });
        }
      }, [location.state?.pageScroll]);
    
    return (
        <ul className={css['movie-list']} >
            {movies.map(movie =>( 
             <li key={movie.id} className={css.item}>
                <MovieItem movie={movie} />
            </li>
           ) )}
        </ul>
    )
}