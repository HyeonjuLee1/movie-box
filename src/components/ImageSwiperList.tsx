import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { GET_BACKDROPS_URI, GET_POSTER_URI } from "../utils/constants";
import { MovieBackdropsPostersListProps } from "../types";

interface ImageSwiperListProps {
  loading: boolean;
  title: string;
  poster?: boolean;
  imageData?: MovieBackdropsPostersListProps[];
}

const ImageSwiperList = ({
  loading,
  title,
  poster,
  imageData,
}: ImageSwiperListProps) => {
  return (
    <section className="mt-[50px]">
      <div className="w-full max-w-[1120px] min-h-[383px] mx-auto mb-[80px]">
        <div className="flex justify-between mb-[20px]">
          <span className="text-white text-[24px]">{title}</span>
        </div>
        <div
          className={`flex justify-center items-center ${
            loading ? "justify-between" : ""
          }`}
          style={{ overflow: poster ? "" : "hidden" }}
        >
          {imageData && !loading ? (
            <Swiper
              slidesPerView={poster ? 5 : 2}
              spaceBetween={poster ? 10 : 20}
              breakpoints={
                poster
                  ? {
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
                    }
                  : {
                      1200: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                    }
              }
            >
              {imageData.map((item, index) => (
                <SwiperSlide key={`item-${index}`}>
                  <div
                    className="rounded-[12px] overflow-hidden mb-[80px]"
                    style={{ marginBottom: 0 }}
                  >
                    <img
                      src={`${poster ? GET_POSTER_URI : GET_BACKDROPS_URI}${
                        item.file_path
                      }`}
                      alt={`포스터`}
                      className={`h-[327px] rounded-[12px] transition-transform duration-300 ease-in-out ${
                        poster ? "w-[216px] " : "w-[550px] "
                      }`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="[poster ? 'skeleton' : 'backdrop-skeleton']"
              ></div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default ImageSwiperList;
