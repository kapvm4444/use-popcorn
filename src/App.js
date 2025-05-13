import Navbar, { Logo, NumResults, Search } from "./components/Navbar";
import Main from "./components/Main";
import React, { useEffect, useState } from "react";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";

const APIkey = "18173ef0";

export default function App() {
  //variables
  const [query, setQuery] = useState("");
  const { isLoading, errMessage, movies } = useMovies(query, setQuery);
  const [watched, setWatched] = useState(function () {
    const data = JSON.parse(localStorage.getItem("watched"));
    if (data) return data;
    else return [];
  });

  const [selectedId, setSelectedId] = useState(null);

  //handlers
  function handleSelectMovie(selectedId) {
    setSelectedId((oldId) => (oldId === selectedId ? null : selectedId));
  }

  function handleCloseDetail() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatched(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched],
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {errMessage && <ErrorMessage errMessage={errMessage} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseDetails={handleCloseDetail}
              APIkey={APIkey}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
