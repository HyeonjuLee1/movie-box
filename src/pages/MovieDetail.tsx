import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import TrailerModal from "../components/TrailerModal";
import VideoBigImage from "../components/VideoBigImage";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isDetailLoading,
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
    <main>
      <VideoBigImage
        loading={isDetailLoading}
        movieInfo={movieInfo}
        onOpenModal={() => setOpenTrailerModal(true)}
      />

      {openTrailerModal && (
        <TrailerModal
          trailerVideoKey={trailerVideoKey}
          onClose={() => setOpenTrailerModal(false)}
        />
      )}
    </main>
  );
};

export default MovieDetail;
