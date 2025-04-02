import React, { useState } from "react";
import { tempMovieData, tempWatchedData } from "../movieData";
import MovieList from "./MovieList";
import WatchedBox from "./WatchedBox";

export default function Main() {
  return (
    <main className="main">
      <MovieList />
      <WatchedBox />
    </main>
  );
}
