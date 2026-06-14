import { useState } from "react";
import tmdb from "../logic/tmdbApi.js";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const { data } = await tmdb.get("/search/movie", {
      params: { query },
    });
    console.log(data.results);
  };

  return (
    <div>
      <input
        className="input__search--bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search for a movie..."
      />
    </div>
  );
}

export default SearchBar;
