import React, { useState, useEffect } from "react";
import { MdStarRate } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlaying } from "../../action/nowPlayingAction";
import { useNavigate } from "react-router-dom";

const NowPlaying = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((state) => state.nowPlaying.nowPlaying);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getNowPlaying());
  }, [dispatch]);

  //slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className=" bg-none shadow-2xl mx-auto p-8 mb-20">
      <div className="">
        <Slider {...settings}>
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className="mx-4"
              onClick={() =>
                navigate(`/DetailMovie/:id=${movie.id}`, {
                  state: { id: movie.id },
                })
              }
            >
              <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:scale-90 hover:cursor-pointer">
                <img
                  className="object-cover w-full h-64 mb-4 rounded-lg "
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold truncate">
                    {movie.title}
                  </h2>
                  <h2 className="text-gray-700">{movie.release_date}</h2>
                  <p className="text-gray-700 line-clamp-3">{movie.overview}</p>
                  <div className="flex mt-3 ">
                    <span className="text-sm font-bold bg-orange-100 text-black inline-block px-2 py-1 rounded-full">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <div className="flex  text-black">
                      {[...Array(5)].map((_, index) => (
                        <MdStarRate
                          key={index}
                          size="20px"
                          color={
                            index < movie.vote_average / 2 ? "yellow" : "gray"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div
        className="mx-auto mt-10 bg-gray-300 hover:bg-red-500 text-black cursor-pointer font-bold py-2 px-4 w-[145px] rounded-lg "
        onClick={() => navigate("/NowPlaying")}
      >
        NOW PLAYING
      </div>
    </div>
  );
};

export default NowPlaying;
