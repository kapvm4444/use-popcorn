import React, { useEffect, useState } from "react";

export default function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Search({ query, setQuery }) {
  useEffect(function () {
    const searchBar = document.getElementById("search");

    document.addEventListener("keypress", function (evt) {
      if (evt.key === "/") {
        evt.preventDefault();
        searchBar.focus();
      }
    });
  }, []);

  return (
    <input
      id="search"
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
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
