import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { videoList } from "../mocks/data/videoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import SkeletonVideo from "./SkeletonVideo";

const VideoSwiperList = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section>
      <div
        className={`w-[1120px] min-h-[383px] mx-auto  ${
          loading ? "mb-[80px]" : "mb-0"
        }`}
      >
        <div className="flex justify-between mb-5">
          <span className="text-white text-[24px]">타이틀</span>
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
            <Swiper slidesPerView={5} spaceBetween={10} className="mySwiper">
              {videoList.map((video, index) => (
                <SwiperSlide key={video.id}>
                  <div className="rounded-xl mb-[80px] overflow-hidden">
                    {video.poster_path ? (
                      <>
                        <img
                          src={video.poster_path}
                          alt={video.title}
                          className="w-[216px] h-[327px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out"
                        />
                        <div className="text-white text-[90px] font-bold italic flex absolute bottom-5">
                          {index + 1}
                        </div>
                      </>
                    ) : (
                      <div className="w-[216px] h-[327px] rounded-xl transition-transform duration-300 ease-in-out cursor-default scale-100">
                        <div className="flex h-full flex-col justify-center">
                          <FontAwesomeIcon
                            icon={faFileImage}
                            className="text-white text-[90px] mb-10"
                          />
                          <span className="text-white">
                            포스터 준비중입니다.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
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
