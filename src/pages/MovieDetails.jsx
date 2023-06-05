import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetail } from 'api/api';
import { HiUserGroup, HiOutlineChatBubbleLeft } from 'react-icons/hi2';

const MovieDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(movieId);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const getYear = releaseDate => {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };

  const getGenres = arrGenres => {
    return arrGenres.map(genre => genre.name).join(', ');
  };

  const location = useLocation();
  const back = location.state?.from ?? '/movie';
  return (
    <>
      <Link className="button-back" to={back}>
        Go Back
      </Link>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <div className="movie_details ">
            {data.poster_path ? (
              <img
                className="movie_details--poster"
                alt={data.original_title}
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              />
            ) : (
              <img alt="not available" />
            )}

            <div className="movie_details--item">
              <h1>
                {data.original_title} ({getYear(data.release_date)})
              </h1>
              <p>User Score: {~~(data.vote_average * 10)}%</p>
              <p>Overview</p>
              <p>{data.overview}</p>
              <p>Genres</p>
              <p>{getGenres(data.genres)}</p>
              <div>
                <ul className="movie_details--info">
                  <li>
                    <Link to="cast" state={{ from: back }}>
                      <button className="movie_details--button">
                        <HiUserGroup size={20} />
                        Cast
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="reviews" state={{ from: back }}>
                      <button className="movie_details--button">
                        <HiOutlineChatBubbleLeft size={20} />
                        Reviews
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetails;
