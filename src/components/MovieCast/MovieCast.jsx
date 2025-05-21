import { useEffect, useState } from 'react';
import css from './MovieCast .module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import { movieCredits } from '../../servise/movieApi';

export default function MovieCast() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { movieId } = useParams();


    useEffect(() => {
        const fetchCast = async () => {
            try {
                setError(null);
                setLoading(true);
                const response = await movieCredits(movieId);
                setData(response.cast || []);

            } catch (err) {
                setError(err.message || 'something wrong');
            } finally {
                setLoading(false);
            }
        };
    fetchCast()  
   }, [movieId]) 

    return (
        <div>
            {loading && <Loader />}
                  {error && <ErrorMessage message={error} />}
            <ul>
                {data.map(item =>
                    <li key={item.cast_id}>
                        <p>{item.name} </p>
                </li> )}
            </ul>
        </div>
    )
}