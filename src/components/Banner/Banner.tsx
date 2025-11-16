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
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

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
    <section aria-label="메인 배너" aria-roledescription="캐러셀">
      <Swiper
        id="banner-section"
        onSwiper={onSwiper}
        className="flex w-full min-w-full mb-[50px] min-h-[555px]"
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
          renderBullet: (index, className) => {
            return `<button class="${className}" aria-label="슬라이드 ${
              index + 1
            }로 이동"></button>`;
          },
        }}
        // navigation={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          1200: {
            slidesPerView: "auto",
          },
        }}
        aria-live="polite"
        aria-atomic="true">
        {banners.map((banner, index) => (
          <SwiperSlide
            key={`banner-${banner.bannerNo}`}
            className="xl:w-fit w-full min-w-full max-xl:min-w-[auto] xl:min-w-[1120px]"
            style={{ width: "fit-content" }}
            role="group"
            aria-roledescription="슬라이드"
            aria-label={`${index + 1} / ${banners.length}`}>
            <div>
              <img
                src={banner.imageUrl}
                alt=""
                className="rounded-2xl relative xl:max-w-[1120px] h-[508px] max-md:h-[400px] max-sm:h-[320px]"
                aria-hidden="true"
              />
              <img
                src={banner.textImageUrl}
                alt={banner.alt}
                className="rounded-2xl absolute top-0 left-0 xl:max-w-[1120px] h-[508px] max-md:h-[400px] max-sm:h-[320px]"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="main-nav" role="group" aria-label="배너 컨트롤">
          <button
            className="autoplay-icon-btn"
            onClick={handleAutoplay}
            aria-label={isAutoPlay ? "자동 재생 일시정지" : "자동 재생 시작"}
            aria-pressed={isAutoPlay}
            type="button">
            <FontAwesomeIcon
              icon={isAutoPlay ? faPause : faPlay}
              size="xl"
              className="flex justify-between items-center text-white"
              aria-hidden="true"
            />
          </button>
          <span className="sr-only">
            {isAutoPlay ? "자동 재생 중" : "자동 재생 중지됨"}
          </span>
          <div
            className="swiper-pagination"
            role="group"
            aria-label="슬라이드 페이지네이션"></div>
        </div>
      </Swiper>
    </section>
  );
};

export default Banner;
