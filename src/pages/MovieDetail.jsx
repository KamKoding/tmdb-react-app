import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tmdb from "../logic/tmdbApi";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const [movieData, creditsData] = await Promise.all([
        tmdb.get(`/movie/${id}`),
        tmdb.get(`/movie/${id}/credits`)
      ]);
      setMovie(movieData.data);
      setCredits(creditsData.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const director = credits?.crew.find((member) => member.job === "Director");
  const cast = credits?.cast.slice(0, 6);

  return (
    <section id="movie-detail">
      <div className="movie__detail--container">
        <div className="movie__detail--hero">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="movie__detail--backdrop"
          />
          <div className="movie__detail--overlay" />
        </div>

        <div className="movie__detail--content">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie__detail--poster"
          />

          <div className="movie__detail--info">
            <button className="movie__detail--back" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h1 className="movie__detail--title">{movie.title}</h1>
            <div className="movie__detail--meta">
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>{movie.runtime} min</span>
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>
            <div className="movie__detail--genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="movie__detail--genre">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="movie__detail--overview">{movie.overview}</p>
            {director && (
              <p className="movie__detail--director">
                Director: <span>{director.name}</span>
              </p>
            )}
            <div className="movie__detail--cast">
              <p className="movie__detail--cast--title">Cast</p>
              <div className="movie__detail--cast--list">
                {cast?.map((member) => (
                  <div key={member.id} className="movie__detail--cast--member">
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                        alt={member.name}
                        className="movie__detail--cast--img"
                      />
                    ) : (
                      <div className="movie__detail--cast--placeholder" />
                    )}
                    <p className="movie__detail--cast--name">{member.name}</p>
                    <p className="movie__detail--cast--character">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;