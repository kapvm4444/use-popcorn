import React, { useEffect, useRef } from "react";

export default function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Search({ query, setQuery }) {
  const searchBar = useRef(null);

  useEffect(
    function () {
      function handlerSearchFocus(evt) {
        if (document.activeElement === searchBar.current) {
          if (evt.code === "Enter") {
            searchBar.current.blur();
          }
        } else if (evt.key === "/") {
          setQuery("");
          evt.preventDefault();
          searchBar.current.focus();
        }
      }

      document.addEventListener("keydown", handlerSearchFocus);

      return () => document.removeEventListener("keydown", handlerSearchFocus);
    },
    [setQuery],
  );

  return (
    <input
      id="search"
      className="search"
      type="text"
      placeholder="Search (Press '/' )"
      value={query}
      ref={searchBar}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
