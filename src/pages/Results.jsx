import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import tmdb from "../logic/tmdbApi";

const Results = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [activeFilter, setActiveFilter] = useState("popularity");
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/results?query=${searchInput}`);
      setSearchInput("");
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await tmdb.get("/genre/movie/list");
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const { data } = await tmdb.get("/discover/movie", {
        params: {
          with_text_query: query || undefined,
          page: currentPage,
          with_genres: selectedGenre || undefined,
          sort_by: sortBy,
        },
      });
      setResults(data.results);
      setTotalPages(data.total_pages);
    };

    fetchResults();
  }, [query, currentPage, selectedGenre, sortBy]);

  const sortedResults = [...results].sort((a, b) => {
    if (a.poster_path && !b.poster_path) return -1;
    if (!a.poster_path && b.poster_path) return 1;
    return 0;
  });

  return (
    <section id="results">
      <div className="container">
        <div className="row">
          <h1 className="results__header--title text__color--red">Results</h1>
          <input
            className="input__search--bar"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for a movie..."
          />
          <div className="filter__bar">
            <select
              className="filter__select"
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <button
              className={`filter__btn ${activeFilter === "year" ? "filter__btn--active" : ""}`}
              onClick={() => {
                setActiveFilter("year");
                setSortBy(
                  sortBy === "release_date.desc"
                    ? "release_date.asc"
                    : "release_date.desc",
                );
                setCurrentPage(1);
              }}
            >
              {activeFilter === "year" && sortBy === "release_date.asc"
                ? "Oldest First"
                : "Newest First"}
            </button>

            <button
              className={`filter__btn ${activeFilter === "rating" ? "filter__btn--active" : ""}`}
              onClick={() => {
                setActiveFilter("rating");
                setSortBy(
                  sortBy === "vote_average.desc"
                    ? "vote_average.asc"
                    : "vote_average.desc",
                );
                setCurrentPage(1);
              }}
            >
              {activeFilter === "rating" && sortBy === "vote_average.asc"
                ? "Lowest Rated"
                : "Highest Rated"}
            </button>
          </div>
          <div className="results__movie--grid">
            {sortedResults.map((movie) => (
              <div
                key={movie.id}
                className="results__movie--card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="results__movie--poster"
                  />
                )}
                <div className="results__movie--info">
                  <p className="results__movie--title">{movie.title}</p>
                  <p className="results__movie--year">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from(
              { length: Math.min(totalPages, 10) },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`pagination__btn ${currentPage === page ? "pagination__btn--active" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
