import React, { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import Loader from "./Loader";

export default function MovieDetails({ selectedId, onCloseDetails, APIkey }) {
  const [movie, setMovie] = useState({});
  const [isLoding, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&i=${selectedId}&apikey=${APIkey}`,
        );

        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId],
  );

  return (
    <>
      {isLoding ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back">&larr;</button>

            <img src={poster} alt={`Poster of ${title}`} />

            <div className={"details-overview"}>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className={"rating"}>
              <RatingStar size={24} maxRating={10} />
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
