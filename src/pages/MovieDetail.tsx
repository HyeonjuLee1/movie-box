import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import { GET_BACKPOSTER_URI } from "../utils/constants";
import { faCirclePlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          </div>
        </div>
      )}

      {openTrailerModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[998]">
          <div>
            <div className="bg-black text-white absolute top-0 right-0 bottom-0 left-0 my-[74px] text-center w-[90%] shadow-md z-[999] transform-none">
              <div className="flex justify-between p-4">
                <span className="text-[20px] font-medium"> Play Trailer</span>
                <button
                  className="align-middle cursor-pointer bg-transparent border-0"
                  onClick={() => setOpenTrailerModal(false)}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="flex text-white text-[20px] justify-center items-center"
                  />
                </button>
              </div>

              <div className="w-full" style={{ height: "calc(100% - 61px)" }}>
                {trailerVideoKey && (
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    frameBorder="0"
                    allowFullScreen
                    title="Trailer"
                    className="h-full"
                    style={{ width: "inherit" }}
                  ></iframe>
                )}
                {!trailerVideoKey && (
                  <div className="text-5 font-medium mt-[400px]">
                    예고편이 존재하지 않습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieDetail;
