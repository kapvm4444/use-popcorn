import Navbar, { Logo, NumResults, Search } from "./components/Navbar";
import Main from "./components/Main";
import React, { useState } from "react";
import { tempMovieData, tempWatchedData } from "./movieData";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";

const fetchURL = "http://www.omdbapi.com/?i=tt3896198&apikey=18173ef0";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
