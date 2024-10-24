import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import TrailerModal from "../components/TrailerModal";
import VideoBigImage from "../components/VideoBigImage";
import VideoDetailTable from "../components/VideoDetailTable";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isDetailLoading,
    movieInfo,
    movieTrailerInfo,
    movieCrewData,
    getMovieDetail,
    getTrailer,
    getMovieCastList,
  } = useMovieStore();
  const [openTrailerModal, setOpenTrailerModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getMovieDetail(parseInt(id));
      getTrailer(parseInt(id));
      getMovieCastList(parseInt(id));
    }
  }, [getMovieCastList, getMovieDetail, getTrailer, id]);

  const trailerVideoKey = useMemo(() => {
    return movieTrailerInfo?.results.find((r) => r.type === "Trailer")?.key;
  }, [movieTrailerInfo?.results]);

  const directorName = useMemo(() => {
    return (
      movieCrewData?.crew.find(
        (g) => g.job === "Director" && g.department === "Directing"
      )?.name ?? "-"
    );
  }, [movieCrewData]);

  const actors = useMemo(() => {
    const actorArr = movieCrewData?.cast.slice(0, 3) ?? [];
    return actorArr.map((g) => g.name).join(", ");
  }, [movieCrewData]);

  console.log("id", id);
  // console.log("movieInfo screen", movieInfo);

  return (
    <main>
      <VideoBigImage
        loading={isDetailLoading}
        movieInfo={movieInfo}
        onOpenModal={() => setOpenTrailerModal(true)}
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <VideoDetailTable
        isDetailLoading={isDetailLoading}
        directorName={directorName}
        actors={actors}
        movieInfo={movieInfo}
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
