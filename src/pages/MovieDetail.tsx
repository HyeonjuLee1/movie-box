import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import { GET_BACKPOSTER_URI } from "../utils/constants";
import { faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrailerModal from "../components/TrailerModal";
import moment from "moment";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isDetailLoading,
    isTrailerLoading,
    movieInfo,
    movieTrailerInfo,
    getMovieDetail,
    getTrailer,
  } = useMovieStore();
  const [openTrailerModal, setOpenTrailerModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getMovieDetail(parseInt(id));
      getTrailer(parseInt(id));
    }
  }, [getMovieDetail, getTrailer, id]);

  const trailerVideoKey = useMemo(() => {
    return movieTrailerInfo?.results.find((r) => r.type === "Trailer")?.key;
  }, [movieTrailerInfo?.results]);

  console.log("id", id);
  console.log("movieInfo screen", movieInfo);
  return (
    <section>
      {!isDetailLoading && (
        <div className="relative h-[590px]">
          <div
            className="relative w-[1120px] h-[590px] mx-auto bg-cover bg-center rounded-2xl flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(to bottom left,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${GET_BACKPOSTER_URI}${movieInfo?.backdrop_path})`,
            }}
          >
            <button
              className="align-middle cursor-pointer bg-transparent border-0"
              onClick={() => setOpenTrailerModal(true)}
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="flex text-white text-[50px] justify-center items-center"
              />
            </button>

            <div className="absolute flex flex-col z-[40px] left-[20px] bottom-[40px] ml-[20px]">
              <div className="flex mb-[24px]">
                <span className="max-w-[760px] text-[16px] text-[#a5a5a5] leading-[24px] break-all">
                  {moment(movieInfo?.release_date).format("YYYY.MM.DD")}
                </span>

                <div className="inline-block w-[3px] h-[3px] mt-[12px] mx-[8px] rounded-full bg-[#a5a5a5] align-middle"></div>
                <span className="max-w-[760px] text-[16px] text-[#a5a5a5] leading-[24px] break-all">{`${movieInfo?.runtime}분`}</span>

                <div className="inline-block w-[3px] h-[3px] mt-[12px] mx-[8px] rounded-full bg-[#a5a5a5] align-middle"></div>
                {movieInfo?.genres && (
                  <span className="max-w-[760px] text-[16px] text-[#a5a5a5] leading-[24px] break-all">
                    {movieInfo?.genres.map((g) => g.name).join(", ")}
                  </span>
                )}

                <FontAwesomeIcon
                  icon={faStar}
                  className="flex items-center mx-2 text-red-600"
                />

                <span className="max-w-[760px] text-[16px] text-[#a5a5a5] leading-[24px] break-all">
                  {`평점 : ${(movieInfo?.vote_average ?? 0).toFixed(1)}`}
                </span>
              </div>

              <span className="max-w-[760px] text-[16px] text-[#a5a5a5] leading-[24px] break-all">
                {movieInfo?.tagline}
              </span>
            </div>
          </div>
        </div>
      )}

      {isDetailLoading && (
        <div className="relative w-[1120px] h-[590px] mx-auto bg-cover bg-center rounded-2xl flex items-center justify-center bg-gray-200 overflow-hidden animate-pulse"></div>
      )}

      {openTrailerModal && (
        <TrailerModal
          trailerVideoKey={trailerVideoKey}
          onClose={() => setOpenTrailerModal(false)}
        />
      )}
    </section>
  );
};

export default MovieDetail;
