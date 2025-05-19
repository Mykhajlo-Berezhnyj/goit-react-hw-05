import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';


export default function MovieList({ movies =[] }) {
    const location = useLocation();

    if (!Array.isArray(movies) || movies.length === 0) {
        return <p>No movies found.</p>;
    }
    
    return (
        <ul className={css['movie-list']} >
            {movies.map(movie =>
                <li key={movie.id}>
                    <Link className={css.item} to={`/movies/${movie.id}`} state={{from:location} } > {movie.title || movie.name}</Link>
                   
            </li> )}
    </ul>
)
}