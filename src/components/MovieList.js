import React from "react";
import MovieItem from "./MovieItem";

export default function MovieList({ movies }) {
  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <MovieItem movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}
