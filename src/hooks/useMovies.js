import { useEffect, useState } from "react";

const APIkey = "18173ef0";

export function useMovies(query, setQuery) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function getMovies() {
        try {
          setIsLoading(true);
          setErrMessage("");

          const res = await fetch(
            `https://www.omdbapi.com/?&s=${query}&apikey=${APIkey}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong while getting the movies");
          const data = await res.json();

          if (data.Response === "False") throw new Error("No Movies Found");

          setMovies(data.Search);
          setIsLoading(false);
          setErrMessage("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setErrMessage(err.message);
            setMovies([]);
          }
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

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { movies, isLoading, errMessage };
}
