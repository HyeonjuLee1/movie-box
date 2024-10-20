import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { videoList } from "../mocks/data/videoList";
import SkeletonVideo from "./SkeletonVideo";
import VideoItem from "./VideoItem";

interface VideoDataProps {
  id: number;
  title: string;
  poster_path: number;
}

interface VideoSwiperListProps {
  loading: boolean;
  listTitle: string;
  mode: string;
  videoData?: VideoDataProps;
}

const VideoSwiperList = ({
  loading,
  listTitle,
  mode,
  videoData,
}: VideoSwiperListProps) => {
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
          {!loading && (
            <Swiper slidesPerView={5} spaceBetween={10}>
              {videoList.map((video, index) => (
                <SwiperSlide key={video.id}>
                  <VideoItem
                    poster_path={video.poster_path}
                    title={video.title}
                    rank={index + 1}
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
