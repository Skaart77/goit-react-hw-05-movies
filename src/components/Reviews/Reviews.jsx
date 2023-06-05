import { useState, useEffect } from 'react';
import { getMovieReviews } from 'api/api';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await getMovieReviews(movieId);
        setData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : data && data.length > 0 ? (
        <div>
          <ul className="reviews">
            {data.map(({ author, content, id }) => (
              <li key={id}>
                <p className="reviews-author">{author}</p>
                {content && content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};

export default Reviews;
