import React, { useEffect, useRef, useState } from "react";
import RatingStar from "./RatingStar";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";

export default function MovieDetails({
  selectedId,
  onCloseDetails,
  APIkey,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoding, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRating = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

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

  function handleAddWatched() {
    const watchedMovie = {
      imdbID: selectedId,
      title,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      year,
      poster,
      userRating,
      countRatingDecision: countRating.current,
    };

    onAddWatched(watchedMovie);
    onCloseDetails();
  }

  //hooks
  useEffect(
    function () {
      if (userRating) countRating.current++;
    },
    [userRating],
  );

  useKey("Escape", onCloseDetails);

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
    [selectedId, APIkey],
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${movie.Title}`;

      return () => (document.title = "IMDB");
    },
    [title, movie.Title],
  );

  return (
    <>
      {isLoding ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseDetails}>
              &larr;
            </button>

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
            <div
              className={"rating"}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              {!isWatched ? (
                <>
                  <RatingStar
                    size={24}
                    maxRating={10}
                    onSetRate={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      style={{ width: "100%" }}
                      onClick={handleAddWatched}
                    >
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already watched and rated{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    {
                      watched.filter((movie) => movie.imdbID === selectedId)[0]
                        ?.userRating
                    }{" "}
                    Star 🌟
                  </span>
                </p>
              )}
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
