import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import VideoItem from "./VideoItem";
import { MovieSimilarProps, VideoDataProps } from "../types";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import LoadingSwiperList from "./LoadingSwiperList";
// 테스트용 데이터
// import { videoList } from "../mocks/data/videoList";

interface VideoSwiperListProps {
  loading: boolean;
  listTitle: string;
  mode: string;
  videoData?: VideoDataProps[] | MovieSimilarProps[] | undefined;
  rank?: boolean;
}

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
      // 일단 영화만
      if (mode === "tv") {
        navigate(`/tv/detail/${id}`);
      } else {
        navigate(`/movie/detail/${id}`);
      }
    },
    [mode, navigate]
  );

  return (
    <section>
      <div
        className={`w-full max-w-[1120px] min-h-[383px] mx-auto  ${
          loading ? "mb-[80px]" : "mb-0"
        }`}
      >
        <div className="flex justify-between mb-5">
          <span className="text-white text-[24px]">{listTitle}</span>
        </div>
        {/* 비디오 영역 */}
        <div
          className={`flex justify-center items-center ${
            loading && "justify-between"
          }`}
        >
          {loading && <LoadingSwiperList />}

          {!loading && videoData && (
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
            >
              {videoData.map((video, index) => (
                <SwiperSlide key={video.id} className="flex justify-center">
                  <VideoItem
                    poster_path={video.poster_path}
                    title={video.title}
                    rank={rank}
                    rankNumber={index + 1}
                    onClick={() => handleGoDetail(video.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};
export default VideoSwiperList;
