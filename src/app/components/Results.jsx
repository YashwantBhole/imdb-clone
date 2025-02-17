'use client'
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaThumbsUp, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Loading from "../Loading";

// --- Wrapper Component with Suspense ---
export default function Results({ searchTerm }) {
  return (
    <Suspense fallback={<Loading />}>
      <ResultsContent searchTerm={searchTerm} />
    </Suspense>
  );
}

// --- Inner Component that uses useSearchParams ---
function ResultsContent({ searchTerm }) {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  // Use searchTerm if provided; otherwise, fall back to genre from URL
  const genre = searchParams.get("genre") || "fetchTrending";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = searchTerm
          ? `https://api.themoviedb.org/3/search/movie?api_key=78e75df5a8de2d4ccbd645a772b54e37&query=${searchTerm}`
          : `https://api.themoviedb.org/3${
              genre === "fetchTopRated" ? "/movie/top_rated" : "/trending/all/week"
            }?api_key=78e75df5a8de2d4ccbd645a772b54e37&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, genre, page]); // Re-fetch if searchTerm, genre, or page changes

  return (
    <div className="min-h-screen px-4 dark:bg-gray-700">
      {movies.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-full max-w-sm mx-auto border rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
            >
              <Link href={`/movie/${movie.id}`} className="block w-full">
                <div className="relative w-full h-72 sm:h-80 md:h-96">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/default-placeholder.jpg"
                    }
                    alt={movie.title || "Unknown Title"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg cursor-pointer hover:opacity-85"
                  />
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white text-center">
                  {movie.title || "Unknown Title"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  <strong>Release Date:</strong> {movie.release_date || "Unknown Date"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                  {movie.overview || "No overview available"}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t dark:border-gray-700">
                  <p className="font-bold text-xl text-gray-900 dark:text-gray-200">
                    {movie.vote_average || "N/A"} ⭐
                  </p>
                  <span className="flex items-center text-blue-500 dark:text-blue-400">
                    {movie.vote_count || "N/A"}
                    <FaThumbsUp
                      className="ml-2 text-lg cursor-pointer hover:text-blue-700 dark:hover:text-blue-300"
                      onClick={() =>
                        setMovies((prev) =>
                          prev.map((m) =>
                            m.id === movie.id
                              ? { ...m, vote_count: (m.vote_count || 0) + 1 }
                              : m
                          )
                        )
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center mt-6 p-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 mr-1 rounded-lg font-bold flex items-center justify-center transition ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-800"
          }`}
        >
          <FaArrowLeft className="mr-2" />
        </button>

        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-800"
        >
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}
