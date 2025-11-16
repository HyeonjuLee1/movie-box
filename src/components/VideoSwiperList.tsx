import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import VideoItem from "./VideoItem";
import { MovieItemProps, TvShowItemProps } from "../types";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import LoadingSwiperList from "./LoadingSwiperList";
// 테스트용 데이터
// import { videoList } from "../mocks/data/videoList";

type VideoSwiperListProps =
  | {
      loading: boolean;
      listTitle: string;
      mode: "movie";
      videoData?: MovieItemProps[];
      rank?: boolean;
    }
  | {
      loading: boolean;
      listTitle: string;
      mode: "tv";
      videoData?: TvShowItemProps[];
      rank?: boolean;
    };

const VideoSwiperList = ({
  loading,
  listTitle,
  videoData,
  rank,
  mode,
}: VideoSwiperListProps) => {
  const navigate = useNavigate();

  const handleGoDetail = useCallback(
    (id: number) => {
      if (mode === "tv") {
        navigate(`/tvshow/detail/${id}`);
      } else {
        navigate(`/movie/detail/${id}`);
      }
    },
    [mode, navigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleGoDetail(id);
      }
    },
    [handleGoDetail]
  );

  const swiperVideoSlideMarkup = useMemo(() => {
    if (videoData) {
      if (mode === "tv") {
        return videoData.map((video, index) => (
          <SwiperSlide
            key={video.id}
            className="flex justify-center"
            role="group"
            aria-roledescription="슬라이드"
            aria-label={`${index + 1} / ${videoData.length}`}>
            <VideoItem
              poster_path={video.poster_path}
              title={video.name}
              rank={rank}
              rankNumber={index + 1}
              onClick={() => handleGoDetail(video.id)}
              onKeyDown={(e) => handleKeyDown(e, video.id)}
            />
          </SwiperSlide>
        ));
      } else if (mode === "movie") {
        return videoData.map((video, index) => (
          <SwiperSlide
            key={video.id}
            className="flex justify-center"
            role="group"
            aria-roledescription="슬라이드"
            aria-label={`${index + 1} / ${videoData.length}`}>
            <VideoItem
              poster_path={video.poster_path}
              title={video.title}
              rank={rank}
              rankNumber={index + 1}
              onClick={() => handleGoDetail(video.id)}
              onKeyDown={(e) => handleKeyDown(e, video.id)}
            />
          </SwiperSlide>
        ));
      }
    }
  }, [handleGoDetail, handleKeyDown, mode, rank, videoData]);

  const contentType = mode === "tv" ? "TV Show" : "영화";

  return (
    <section aria-label={`${listTitle} 목록`}>
      <div
        className={`w-full max-w-[1120px] min-h-[383px] mx-auto  ${
          loading ? "mb-[80px]" : "mb-0"
        }`}>
        <div className="flex justify-between mb-5">
          <span className="text-white text-[24px]">{listTitle}</span>
        </div>
        {/* 비디오 영역 */}
        <div
          className={`flex justify-center items-center ${
            loading && "justify-between"
          }`}>
          {loading && (
            <div role="status" aria-live="polite" aria-busy="true">
              <span className="sr-only">
                {contentType} 목록을 불러오는 중입니다.
              </span>
              <LoadingSwiperList />
            </div>
          )}

          {!loading && videoData && videoData.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              breakpoints={{
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 8,
                },
              }}
              aria-label={`${listTitle} 캐러셀`}>
              {swiperVideoSlideMarkup}
            </Swiper>
          )}

          {!loading && (!videoData || videoData.length === 0) && (
            <div role="status" aria-live="polite">
              <p className="text-white text-center">
                표시할 {contentType} 정보가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default VideoSwiperList;
