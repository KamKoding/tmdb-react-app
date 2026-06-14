import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import tmdb from "../logic/tmdbApi";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      const { data } = await tmdb.get("/movie/popular");
      setPopular(data.results.slice(0, 8));
    };
    fetchPopular();
  }, []);

  return (
    <section id="header">
      <div className="container">
        <div className="row">
          <div className="header__welcome--wrapper">
            <h1 className="header__welcome--text">
              Welcome to <span className="text__color--red">KMDB</span>
            </h1>
            <p className="header__welcome--para">Search for your favorite movies!</p>
          </div>
          <SearchBar />
          <div className="popular__grid">
            {popular.map((movie) => (
              <div
                key={movie.id}
                className="popular__card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="popular__poster"
                  />
                )}
                <div className="popular__info">
                  <p className="popular__title">{movie.title}</p>
                  <p className="popular__year">{movie.release_date?.slice(0, 4)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;