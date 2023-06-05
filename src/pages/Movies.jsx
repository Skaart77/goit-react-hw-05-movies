import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { searchMovie } from 'api/api';

const Movies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const [query, setQuery] = useState(() => searchQuery || '');

  // Get запит
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
          className="search-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          onChange={handleInputChange}
          value={query}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <>
        <ul>
          {searchQuery ? (
            loading ? (
              'Loading...'
            ) : data.lenght > 0 ? (
              data.map(({ title, id }) => (
                <li key={id}>
                  <Link state={{ from: location }} to={`/movies/${id}`}>
                    {title}
                  </Link>
                </li>
              ))
            ) : (
              <p>
                No movies with this title were found. Try entering another title
              </p>
            )
          ) : (
            <p>Write the name of the movie to search</p>
          )}
        </ul>
      </>
    </>
  );
};

export default Movies;
