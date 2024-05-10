import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarHome from "../assets/component/Header/NavbarHome";
import { MdStarRate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "../assets/action/detailAction";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const movieDetail = useSelector((state) => state.detail.detail);

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(fetchMovieDetail(location.state.id));
    }
  }, [dispatch, location.state]);   

  return (
    <div className="from-opacity-15 to-opacity-15 bg-gradient-to-t from-opacity-40 to-opacity-40 bg-gray-600 bg-blend-multiply w-screen h-screen">
      <NavbarHome />
      <div
        key={movieDetail?.id}
        onClick={() =>
          navigate("/src", { state: { query: location.state.query } })
        }
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`}
            alt={movieDetail?.title}
            className=" w-screen h-screen"
          />
          <div className="absolute bottom-1/2 left-36 text-start text-white h-64 p-6 flex flex-col gap-6 hover:text-green-300 ">
            <h2 className="text-6xl font-bold ">{movieDetail?.title}</h2>
            <div className="flex flex-wrap gap-2">
              {movieDetail?.genres.map((genre, index) => (
                <h2 key={genre.id} className="font-semibold text-xl ">
                  {genre.name}
                  {index < movieDetail?.genres.length - 1 && ", "}
                </h2>
              ))}
            </div>
            <h2 className="font-semibold text-2xl">
              {movieDetail?.release_date}
            </h2>
            <p className="font-semibold w-[40%] text-xl">
              {movieDetail?.overview}
            </p>
            <div className="flex py-1 ">
              <MdStarRate size="40px" className="py-1 mr-6 text-yellow-300" />
              <span className="text-2xl font-bold py-1 ">
                {movieDetail?.vote_average.toFixed(1)} / 10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
