import { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import VideoSwiperList from "../components/VideoSwiperList";
import useMovieStore from "../stores/movieList";

const Home = () => {
  const {
    dayTrending,
    weekTrending,
    popular,
    upcoming,
    isDayTrendingLoading,
    isWeekTrendingLoading,
    isPopularLoading,
    isUpcomingLoading,
    getDayTrending,
    getWeekTrending,
    getPopular,
    getUpcoming,
  } = useMovieStore();

  useEffect(() => {
    getDayTrending();
    getWeekTrending();
    getPopular();
    getUpcoming();
    window.scrollTo(0, 0);
  }, [getDayTrending, getPopular, getUpcoming, getWeekTrending]);

  return (
    <div>
      <Banner />
      <VideoSwiperList
        loading={isDayTrendingLoading}
        listTitle="오늘의 영화 TOP 20"
        videoData={dayTrending}
        mode="movie"
      />
      <VideoSwiperList
        loading={isWeekTrendingLoading}
        listTitle="이번 주 영화 TOP 20"
        videoData={weekTrending}
        mode="movie"
      />
      <VideoSwiperList
        loading={isPopularLoading}
        listTitle="실시간 인기 영화"
        videoData={popular}
        mode="movie"
      />
      <VideoSwiperList
        loading={isUpcomingLoading}
        listTitle="두근두근 Coming Soon"
        videoData={upcoming}
        mode="movie"
      />
      <VideoSwiperList
        loading={false}
        listTitle="오늘의 TV Show TOP 20"
        mode="tv"
      />
      <VideoSwiperList
        loading={false}
        listTitle="이번 주 TV Show TOP"
        mode="tv"
      />
    </div>
  );
};

export default Home;
