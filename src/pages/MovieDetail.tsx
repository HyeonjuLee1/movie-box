import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import TrailerModal from "../components/TrailerModal";
import VideoBigImage from "../components/VideoBigImage";
import VideoDetailTable from "../components/VideoDetailTable";
import ImageSwiperList from "../components/ImageSwiperList";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isDetailLoading,
    isImagesLoading,
    movieInfo,
    movieTrailerInfo,
    movieCrewData,
    movieBackdropsList,
    moviePostersList,
    getMovieDetail,
    getTrailer,
    getMovieCastList,
    getMovieImages,
  } = useMovieStore();
  const [openTrailerModal, setOpenTrailerModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getMovieDetail(parseInt(id));
      getTrailer(parseInt(id));
      getMovieCastList(parseInt(id));
      getMovieImages(parseInt(id));
    }

    window.scrollTo(0, 0);
  }, [getMovieCastList, getMovieDetail, getMovieImages, getTrailer, id]);

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
  console.log("movieBackdropsList", movieBackdropsList);
  console.log("moviePostersList", moviePostersList);

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

      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <ImageSwiperList
        title={"스틸컷"}
        loading={isImagesLoading}
        imageData={movieBackdropsList}
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <ImageSwiperList
        poster
        title={"포스터"}
        loading={isImagesLoading}
        imageData={moviePostersList}
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

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
