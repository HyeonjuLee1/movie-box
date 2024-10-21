import Banner from "../components/Banner/Banner";
import VideoSwiperList from "../components/VideoSwiperList";

const Home = () => {
  return (
    <div>
      <Banner />
      <VideoSwiperList
        loading={false}
        listTitle="오늘의 영화 TOP 20"
        mode="movie"
      />
      <VideoSwiperList
        loading={true}
        listTitle="이번 주 영화 TOP 20"
        mode="movie"
      />
      <VideoSwiperList
        loading={false}
        listTitle="실시간 인기 영화"
        mode="movie"
      />
      <VideoSwiperList
        loading={false}
        listTitle="두근두근 Coming Soon"
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
