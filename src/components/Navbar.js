import React, { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Search({ query, setQuery }) {
  const searchBar = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === searchBar.current)
      return searchBar.current.blur();
    searchBar.current.focus();
    setQuery("");
  });

  return (
    <input
      id="search"
      className="search"
      type="text"
      placeholder="Search (Press 'Enter')"
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
