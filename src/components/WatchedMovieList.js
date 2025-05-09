import React from "react";
import WatchedItem from "./WatchedItem";

export default function WatchedMovieList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedItem
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
