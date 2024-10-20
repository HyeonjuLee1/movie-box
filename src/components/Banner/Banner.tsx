import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { banners } from "../../mocks/data/banners";

const Banner = () => {
  const swiperInstance = useRef<SwiperClass | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const onSwiper = (swiper: SwiperClass) => {
    swiperInstance.current = swiper;
  };

  const handleAutoplay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
    if (swiperInstance.current) {
      if (!isAutoPlay) {
        swiperInstance.current.autoplay.start();
      } else {
        swiperInstance.current.autoplay.stop();
      }
    }
  }, [isAutoPlay]);

  return (
    <>
      <Swiper
        id="banner-section"
        onSwiper={onSwiper}
        className="flex w-full min-w-full mb-[50px] min-h-[555px]"
        loop={true}
        spaceBetween={30}
        slidesPerView="auto"
        centeredSlides={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {banners.map((banner) => (
          <SwiperSlide key={`banner-${banner.bannerNo}`}>
            <div>
              <img
                src={banner.imageUrl}
                alt={banner.alt}
                className="rounded-2xl relative min-w-[1120px] h-[508px]"
              />
              <img
                src={banner.textImageUrl}
                alt={banner.alt}
                className="rounded-2xl absolute top-0 left-0 min-w-[1120px] h-[508px]"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="main-nav">
          <button className="autoplay-icon-btn" onClick={handleAutoplay}>
            <FontAwesomeIcon
              icon={isAutoPlay ? faPause : faPlay}
              size="xl"
              className="flex justify-between items-center text-white"
            />
          </button>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </>
  );
};

export default Banner;
