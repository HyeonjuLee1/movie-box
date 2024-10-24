import { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import VideoSwiperList from "../components/VideoSwiperList";
import useMovieStore from "../stores/movieList";
// 일단 영화만 노출
// import useTVShowStore from "../stores/tvShowList";

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

  // 일단 영화만 노출
  // const {
  //   dayTVShowTrendingList,
  //   weekTVShowTrendingList,
  //   isDayTrendingTVShowLoading,
  //   isWeekTrendingTVShowLoading,
  //   getDayTVShowTrending,
  //   getWeekTVShowTrending,
  // } = useTVShowStore();

  useEffect(() => {
    getDayTrending();
    getWeekTrending();
    getPopular();
    getUpcoming();
    // 일단 영화만 노출
    // getDayTVShowTrending();
    // getWeekTVShowTrending();
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
        rank
      />
      <VideoSwiperList
        loading={isWeekTrendingLoading}
        listTitle="이번 주 영화 TOP 20"
        videoData={weekTrending}
        mode="movie"
        rank
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
      {/* 일단 영화만 노출 */}
      {/* <VideoSwiperList
        loading={isDayTrendingTVShowLoading}
        listTitle="오늘의 TV Show TOP 20"
        videoData={dayTVShowTrendingList}
        mode="tv"
        rank
      />
      <VideoSwiperList
        loading={isWeekTrendingTVShowLoading}
        listTitle="이번 주 TV Show TOP 20"
        videoData={weekTVShowTrendingList}
        mode="tv"
        rank
      /> */}
    </div>
  );
};

export default Home;
