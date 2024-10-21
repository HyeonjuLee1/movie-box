import { create } from 'zustand'
import  { AxiosError } from 'axios';
import axiosInst from "../utils/axiosInst";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieState {
  dayTrending: Movie[] ;
  weekTrending: Movie[] ;
  popular: Movie[] ;
  upcoming: Movie[] ;
  isDayTrendingLoading: boolean;
  isWeekTrendingLoading: boolean;
  isPopularLoading: boolean;
  isUpcomingLoading: boolean;
  getDayTrending: () => Promise<void>;
  getWeekTrending: () => Promise<void>;
  getPopular: () => Promise<void>;
  getUpcoming: () => Promise<void>;
}

const getAPI = async (url: string) => {
  try {
    const { data } = await axiosInst.get(url);
    return data;
  }  catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      alert(axiosError.message);
    } else {
      alert('An unknown error occurred');
    }
    throw axiosError;
  }
};


const useMovieStore = create<MovieState>((set) => ({
  dayTrending: [],
  weekTrending: [],
  popular: [],
  upcoming: [],
  isDayTrendingLoading: false,
  isWeekTrendingLoading: false,
  isPopularLoading: false,
  isUpcomingLoading: false,

  // 오늘 트렌딩 조회
  getDayTrending: async () => {
    set({ isDayTrendingLoading: true });
    try {
      const data = await getAPI('/trending/movie/day?include_adult=true&language=ko');
      // console.log("dayTrending", data);
      set({ dayTrending: data.results });
    } catch (error) {
      console.error('dayTrending Error:', error);
    } finally {
      set({ isDayTrendingLoading: false });
    }
  },

  // 이번 주 트렌딩 조회
  getWeekTrending: async () => {
    set({ isWeekTrendingLoading: true });
    try {
      const data = await getAPI('/trending/movie/week?include_adult=true&language=ko');
      //  console.log("WeekTrending", data);
      set({ weekTrending: data.results });
    } catch (error) {
      console.error('weekTrending Error:', error);
    } finally {
      set({ isWeekTrendingLoading: false });
    }
  },

  // 인기 영화 조회
  getPopular: async () => {
    set({ isPopularLoading: true });
    try {
      const data = await getAPI('/movie/popular?include_adult=true&language=ko&page=1');
      // console.log("Popular", data);
      set({ popular: data.results });
    } catch (error) {
      console.error('popular Error:', error);
    } finally {
      set({ isPopularLoading: false });
    }
  },


   // 개봉예정 조회 api
  getUpcoming: async () => {
    set({ isUpcomingLoading: true });
    try {
      const data = await getAPI('movie/upcoming?include_adult=true&language=ko&page=1&release_date.gte=2024-10-22');
      // console.log("upcoming", data);
      // 개봉예정인 날짜로 영화가 제대로 필터링 되지 않는 이슈
      // 오늘 날짜 이후의 영화만 set
      const today = new Date().toISOString().split('T')[0];
    const upcomingMovies = data.results.filter((movie: { release_date: string | number | Date; }) => new Date(movie.release_date) >= new Date(today));
      set({ upcoming: upcomingMovies});
    } catch (error) {
      console.error('upcoming Error data:', error);
    } finally {
      set({ isUpcomingLoading: false });
    }
  },

}));

export default useMovieStore;