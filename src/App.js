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

const APIkey = "18173ef0";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(selectedId) {
    setSelectedId((oldId) => (oldId === selectedId ? null : selectedId));
  }

  function handleCloseDetail() {
    setSelectedId(null);
  }

  //using side effect for getting the data from api
  useEffect(
    function () {
      async function getMovies() {
        try {
          setErrMessage("");
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?&s=${query}&apikey=${APIkey}`,
          );

          if (!res.ok)
            throw new Error("Something went wrong while getting the movies");
          const data = await res.json();

          if (data.Response === "False") throw new Error("No Movies Found");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          setErrMessage(err.message);
          setMovies([]);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setErrMessage("");
        return;
      }

      getMovies();
    },
    [query],
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
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
