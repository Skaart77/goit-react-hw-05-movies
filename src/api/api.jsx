import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '50eb30280678e2b5b5676ecd070356bb',
    language: 'en-US',
  },
});

// // запрос трендових фільмів дня для рендера на головну сторінку
export async function getTrendingMovie(page) {
  const query = `/trending/movie/week`;
  try {
    const { data } = await instance.get(query, {
      params: { page },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// // запрос деталей фільму
export async function getMovieDetails(id) {
  const query = `/movie/${id}`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}

// // запрос касту фільма
export async function getMovieCast(id) {
  const query = `/movie/${id}/credits`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}

// // запрос на відгуки для фільму
export async function getMovieReviews(id) {
  const query = `/movie/${id}/reviews`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}

// // пошук фільмів за ключовим словом
export async function searchMovie(queryString, page) {
  const query = `/search/movie?query=${queryString}`;
  try {
    const data = await instance.get(query, {
      params: {
        page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
