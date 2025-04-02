import React, { useState } from "react";
import { tempMovieData } from "../movieData";
import MovieItem from "./MovieItem";

export default function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <MovieItem movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </div>
  );
}
