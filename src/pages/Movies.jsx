import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { searchMovie } from 'api/api';

const Movies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const [query, setQuery] = useState(() => searchQuery || '');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await searchMovie(searchQuery);
        setData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      getData();
    }
  }, [searchQuery]);

  const location = useLocation();

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  // Викликається під час відправлення форми
  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: query });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={query}
        />
        <button type="submit">Search</button>
      </form>
      <>
        <ul>
          <h2>Trending movies:</h2>
          {loading
            ? 'Loading...'
            : data.map(({ title, id }) => (
                <li key={id}>
                  <Link to={`/movies/${id}`} state={{ from: location }}>
                    {title}
                  </Link>
                </li>
              ))}
        </ul>
      </>
    </>
  );
};

export default Movies;
