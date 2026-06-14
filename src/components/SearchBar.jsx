import { useState } from "react";
import tmdb from "../logic/tmdbApi.js";

import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?query=${query}`);
    }
  };

  return (
    <input
      className="input__search--bar"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      placeholder="Search for a movie..."
    />
  );
}

export default SearchBar;
