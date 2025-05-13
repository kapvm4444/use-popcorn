import Navbar, { Logo, NumResults, Search } from "./components/Navbar";
import Main from "./components/Main";
import React, { useState } from "react";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const APIkey = "18173ef0";

export default function App() {
  //variables
  const [query, setQuery] = useState("");
  const { isLoading, errMessage, movies } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

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
