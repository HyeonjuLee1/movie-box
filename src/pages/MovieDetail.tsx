import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import { GET_BACKPOSTER_URI } from "../utils/constants";
import { faCirclePlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrailerModal from "../components/TrailerModal";

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
        <TrailerModal
          trailerVideoKey={trailerVideoKey}
          onClose={() => setOpenTrailerModal(false)}
        />
      )}
    </section>
  );
};

export default MovieDetail;
