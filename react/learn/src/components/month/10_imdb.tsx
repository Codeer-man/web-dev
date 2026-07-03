import React, { useState } from "react";

interface movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbId: string;
}

interface movieSearchResponse {
  Search: movie[];
}

export default function Imdb() {
  const [movies, setMovies] = useState<movieSearchResponse>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const ImdbUrl = import.meta.env.VITE_API_KEY_IMDB;

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (search.trim() === "") return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${ImdbUrl}&s=${search}`);

      if (!response.ok) {
        setError("Something went wrong while");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Something went worng", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h3>Result</h3>
      {loading && <div> Loading... </div>}
      {error && <div>{error} </div>}

      {movies?.Search ? (
        movies?.Search.map((s) => {
          const poster = s.Poster ?? "N/a";
          const title = s.Title;
          const imdbId = s.imdbId;
          const type = s.Type;
          const year = s.Year;
          return (
            <div key={imdbId}>
              <h3>Title:{title}</h3>
              <img src={poster} />
              <p>
                Type:{type} year: {year}
              </p>
              --------------------------------------------------------------
            </div>
          );
        })
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
}
