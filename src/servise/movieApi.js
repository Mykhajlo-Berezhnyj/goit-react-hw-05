import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: 'application/json',
  },
});

export const getTrendingMovies = async (page = 1) => {
  const { data } = await axiosInstance.get('/trending/movie/day', {
    params: { page },
  });
  return data;
};

export const searchMovie = async (query, page = 1) => {
  const { data } = await axiosInstance.get('/search/movie', {
    params: {
      query,
      language: 'en-US',
      include_adult: false,
      page,
    },
  });
  return data;
};

export const movieDetails = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}`);
  return data;
};

export const movieCredits = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const movieReviews = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return data.results;
};

export const movieVideo = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/videos`);
  return data.results;
};
