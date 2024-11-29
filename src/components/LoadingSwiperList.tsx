import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SkeletonVideo from "./SkeletonVideo";

const LoadingSwiperList = () => {
  return (
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
      {Array.from({ length: 5 }).map((_, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <SkeletonVideo key={`item-${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LoadingSwiperList;
