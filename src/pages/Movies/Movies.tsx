import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/MoviesAPI";
import { Link } from "react-router-dom";
import { useState } from "react";
import style from './Movies.module.css'

type Movie = {
  id: number;
  title: string;
  genre: string;
  director: string;
  release_year: number;
  rating: number;
  image: string;
  comments: {
    id: number;
    text: string;
    userId: number;
  }[];
};

export const Movies = () => {
  const postsQuery = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);

  if (postsQuery.status === 'pending') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <h1 className="movie-title">ALL movies</h1>
      <div className={style.wrapper}>
        {postsQuery.data.map((movie: Movie) => (
          <div
            key={movie.id}
            className={`${style.movie} ${hoveredMovieId === movie.id ? 'hover' : ''}`}
            onMouseEnter={() => setHoveredMovieId(movie.id)}
            onMouseLeave={() => setHoveredMovieId(null)}
          >
            <Link to={`/movies/${movie.id}`} className="movie-individual">
              <img src={movie.image} alt="Medieval image" className={style.image} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};