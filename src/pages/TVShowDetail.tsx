import { useEffect, useMemo, useState } from "react";
import useTVShowStore from "../stores/tvShowList";
import { useParams } from "react-router-dom";
import VideoBigImage from "../components/VideoBigImage";
import TrailerModal from "../components/TrailerModal";
import VideoDetailTable from "../components/VideoDetailTable";
import ImageSwiperList from "../components/ImageSwiperList";
import VideoSwiperList from "../components/VideoSwiperList";

const TVShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [openTrailerModal, setOpenTrailerModal] = useState<boolean>(false);

  const {
    isTVShowDetailLoading,
    isTVShowImagesLoading,
    isTVShowSimilarLoading,
    tvShowInfo,
    tvShowTrailerInfo,
    tvShowCrewData,
    tvShowBackdropsList,
    tvShowPostersList,
    similarTvShowList,
    getTVShowDetail,
    getTVShowTrailer,
    getTVShowCastList,
    getTVShowImages,
    getSimilarTVList,
  } = useTVShowStore();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id);
      getTVShowDetail(numberId);
      getTVShowTrailer(numberId);
      getTVShowCastList(numberId);
      getTVShowImages(numberId);
      getSimilarTVList(numberId);
    }
    window.scrollTo(0, 0);
  }, [
    getTVShowDetail,
    getTVShowTrailer,
    getTVShowCastList,
    id,
    getTVShowImages,
    getSimilarTVList,
  ]);

  const trailerVideoKey = useMemo(() => {
    return tvShowTrailerInfo?.results.find((r) => r.type === "Trailer")?.key;
  }, [tvShowTrailerInfo?.results]);

  const actors = useMemo(() => {
    const actorArr = tvShowCrewData?.cast.slice(0, 3) ?? [];
    return actorArr.map((g) => g.name).join(", ");
  }, [tvShowCrewData]);

  return (
    <main>
      <VideoBigImage
        loading={isTVShowDetailLoading}
        videoInfo={tvShowInfo}
        onOpenModal={() => setOpenTrailerModal(true)}
        mode="tv"
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <VideoDetailTable
        isDetailLoading={isTVShowDetailLoading}
        actors={actors}
        videoInfo={tvShowInfo}
        mode="tv"
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <ImageSwiperList
        title="스틸컷"
        loading={isTVShowImagesLoading}
        imageData={tvShowBackdropsList}
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <ImageSwiperList
        poster
        title="포스터"
        loading={isTVShowImagesLoading}
        imageData={tvShowPostersList}
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      <VideoSwiperList
        loading={isTVShowSimilarLoading}
        listTitle="비슷한 영화 추천"
        videoData={similarTvShowList}
        mode="tv"
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

export default TVShowDetail;
