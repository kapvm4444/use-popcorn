import React from "react";
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
