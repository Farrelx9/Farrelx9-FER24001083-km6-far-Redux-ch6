import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../../action/searchAction";
import { debounce } from "lodash";

const SearchMovie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.search.movies);
  const location = useLocation();
  const navigate = useNavigate();

  const debouncedSearchMovies = debounce((query) => {
    if (query && query.trim().length > 2) {
      dispatch(searchMovies(query));
    }
  }, 500);

  useEffect(() => {
    const query = location?.state?.query;
    debouncedSearchMovies(query);
    return () => {
      debouncedSearchMovies.cancel();
    };
  }, [location?.state?.query, debouncedSearchMovies]);

  return (
    <div className="">
      <div className="flex justify-center mb-10">
        <strong className="text-4xl font-sans text-black ">
          Search Result
        </strong>
      </div>
      <div className=" grid grid-cols-4 gap-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className=" mx-4 "
            onClick={() =>
              navigate(`/DetailMovie/:id=${movie.id}`, {
                state: { id: movie.id },
              })
            }
          >
            <div className="hover:cursor-pointer hover:scale-90">
              <img
                className="object-cover w-64 h-full mb-4 rounded-lg "
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4 ">
                <h2 className="text-white ">{movie.title}</h2>
                <p className="text-white line-clamp-3">{movie.overview}</p>
                <div className="flex mt-2 gap-1">
                  <span className="text-sm font-bold bg-orange-100 inline-block px-2 py-1 rounded-full">
                    {movie.vote_average}
                  </span>
                  <div className="flex text-black py-1">
                    {[...Array(5)].map((_, index) => (
                      <MdStarRate
                        key={index}
                        size="20px"
                        color={
                          index < movie.vote_average / 2 ? "yellow" : "black"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovie;
