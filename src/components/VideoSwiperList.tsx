import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SkeletonVideo from "./SkeletonVideo";
import VideoItem from "./VideoItem";
import { MovieSimilarProps, VideoDataProps } from "../types";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
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
}: VideoSwiperListProps) => {
  const navigate = useNavigate();

  const handleGoDetail = useCallback(
    (id: number) => {
      // 일단 영화만
      // if (mode === "tv") {
      //   navigate(`/tv/detail/${id}`);
      // } else {

      navigate(`/movie/detail/${id}`);
      // }
    },
    [navigate]
  );

  return (
    <section>
      <div
        className={`w-[1120px] min-h-[383px] mx-auto  ${
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
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonVideo index={index} />
            ))}

          {!loading && videoData && (
            <Swiper slidesPerView={5} spaceBetween={10}>
              {videoData.map((video, index) => (
                <SwiperSlide key={video.id}>
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
