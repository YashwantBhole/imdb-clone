"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const { id: movieID } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([])

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=78e75df5a8de2d4ccbd645a772b54e37`
        );
        if (!res.ok) throw new Error("Failed to fetch movie data");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    //to get tariler using tmdb api
    const getTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=78e75df5a8de2d4ccbd645a772b54e37`
        );
        if (!res.ok) throw new Error("Failed to fetch video data");
        const data = await res.json();

        // Find the first official trailer or any YouTube video
        const trailer = data.results.find(
          (vid) => vid.site === "YouTube" && (vid.type === "Trailer")
        );

        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };


    const getCast = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=78e75df5a8de2d4ccbd645a772b54e37`)
        const data = await response.json();
        console.log(data.cast)
        setCast(data.cast.slice(0, 8))
      } catch (error) {
        console.log(error)
      }
    }

    getMovieData();
    getTrailer();
    getCast();
  }, [movieID]);

  if (!movie) {
    return <div className="text-center text-lg font-semibold mt-10">Loading..</div>;
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-700">

      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-8xl mx-auto md:space-x-6">
        {/* Trailer or Image Section */}
        <div className="w-full md:w-1/2 h-[400px]">
          {trailerKey ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg shadow-md"
            ></iframe>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || "Movie Image"}
              className="rounded-lg shadow-md object-cover h-full w-full"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-[400px]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            {movie.title}
          </h2>
          <p className="text-gray-700 dark:text-white text-base font-semibold sm:text-lg mb-3 mt-2 leading-relaxed">
            {movie.overview || "No overview available."}
          </p>
          <p className="text-gray-600 dark:text-white lg:text-xl font-bold sm:text-base mt-2 mb-3">
            <span className="font-semibold mr-1">Release Date:</span>
            {movie.release_date || "Unknown"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 lg:text-xl mt-2 font-bold sm:text-base mb-3">
            <span className="font-semibold">Votes:</span> {movie.vote_count || "N/A"}
          </p>
        </div>


      </div>

      {/* Cast Section */}
      <div className="bg-gray-100 dark:bg-gray-700 py-8 px-4 rounded-lg max-w-8xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Meet the Cast
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {cast.map((actor) => (
            <div key={actor.id} className="flex flex-col items-center w-40">
              {/* Actor Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-700">
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/default-avatar.jpg"
                  }
                  alt={actor.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Actor Name */}
              <p className="mt-3 text-md font-semibold text-center text-gray-900 dark:text-white">
                {actor.name}
              </p>

              {/* Character Name */}
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                as {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
