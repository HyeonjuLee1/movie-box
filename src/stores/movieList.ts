import { create } from 'zustand'
import  { AxiosError } from 'axios';
import axiosInst from "../utils/axiosInst";
import { MovieBackdropsPostersListProps, MovieCrewDataProps, MovieInfoProps, MovieSimilarProps, TrailerProps, VideoDataProps } from '../types';

interface MovieState {
  dayTrending: VideoDataProps[];
  weekTrending: VideoDataProps[];
  popular: VideoDataProps[];
  upcoming: VideoDataProps[];
  movieInfo?: MovieInfoProps
  movieTrailerInfo?: TrailerProps
  movieCrewData?: MovieCrewDataProps
  movieBackdropsList?: MovieBackdropsPostersListProps[]
  moviePostersList?: MovieBackdropsPostersListProps[]
  similarMovieList?: MovieSimilarProps[]
  foundMovie?:VideoDataProps[];

  isDayTrendingLoading: boolean;
  isWeekTrendingLoading: boolean;
  isPopularLoading: boolean;
  isUpcomingLoading: boolean;

  isDetailLoading: boolean;
  isTrailerLoading: boolean;
  isCrewLoading: boolean;
  isMovieImagesLoading: boolean;
  isMovieSimilarLoading: boolean;
  isSearchLoading: boolean;

  getDayTrending: () => Promise<void>;
  getWeekTrending: () => Promise<void>;
  getPopular: () => Promise<void>;
  getUpcoming: () => Promise<void>;

  getMovieDetail: (id:number) => Promise<void>;
  getTrailer: (id:number) => Promise<void>;
  getMovieCastList: (id:number) => Promise<void>;
  getMovieImages: (id:number) => Promise<void>;
  getSimilarMovieList: (id:number) => Promise<void>;
  getSearchMovie: (searchkey:string) => Promise<void>;
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

  movieInfo: undefined,
  movieTrailerInfo: undefined,
  crewData: undefined,
  movieBackdropsList: undefined,
  moviePostersList: undefined,
  similarMovieList: [],
  foundMovie: [],

  isDayTrendingLoading: false,
  isWeekTrendingLoading: false,
  isPopularLoading: false,
  isUpcomingLoading: false,

  isDetailLoading: false,
  isTrailerLoading: false,
  isCrewLoading: false,
  isMovieImagesLoading: false,
  isMovieSimilarLoading: false,
  isSearchLoading: false,

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
      //upcomming 엔드포인트는 날짜로 필터링이 잘되지 않아 /discover/movie로 사용
      // const data = await getAPI('movie/upcoming?include_adult=true&language=ko&page=1&release_date.gte=2024-10-22');
      // 오늘 날짜 이후의 영화만 set
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      const data = await getAPI(`/discover/movie?include_adult=true&language=ko&page=1&primary_release_date.gte=${formattedDate}`);
      // console.log("upcoming", data.results);
      set({ upcoming: data.results});
    } catch (error) {
      console.error('upcoming Error data:', error);
    } finally {
      set({ isUpcomingLoading: false });
    }
  },

  // 영화상세 api
  getMovieDetail: async (id:number) => {
    set({ isDetailLoading: true });
    try {
      const data = await getAPI(`/movie/${id}?language=ko`);
      // console.log("movieInfo", data);
      set({ movieInfo: data});
    } catch (error) {
      console.error('detail data:', error);
    } finally {
      set({ isDetailLoading: false });
    }
  },
  
  // 예고편 get api
  getTrailer: async (id:number) => {
    set({ isTrailerLoading: true });
    try {
      const data = await getAPI(`/movie/${id}/videos?language=ko`);
      // console.log("Trailer", data.data);
      set({ movieTrailerInfo: data});
    } catch (error) {
      console.error('getTrailer:', error);
    } finally {
      set({ isTrailerLoading: false });
    }
  },

  // 영화 출연, 감독 리스트 api
  getMovieCastList: async (id:number) => {
    set({ isCrewLoading: true });
    try {
      const data = await getAPI(`/movie/${id}/credits?language=ko`);
      // console.log("crewData", data);
      set({ movieCrewData: data});
    } catch (error) {
      console.error('getMovieCastList:', error);
    } finally {
      set({ isCrewLoading: false });
    }
  },

  // 포스터, 스틸컷 api
  getMovieImages: async (id:number) => {
    set({ isMovieImagesLoading: true });
    try {
      const data = await getAPI(`/movie/${id}/images?page=1`);
      // console.log("getMovieImages", data);
      set({ movieBackdropsList: data.backdrops,moviePostersList:data.posters });
    } catch (error) {
      console.error('getMovieImages:', error);
    } finally {
      set({ isMovieImagesLoading: false });
    }
  },

  // 비슷한 리스트 api
  getSimilarMovieList: async (id:number) => {
    set({ isMovieSimilarLoading: true });
    try {
      const data = await getAPI(`/movie/${id}/similar?language=ko&page=1`);
      console.log("getSimilarMovieList", data);
      set({ similarMovieList: data?.results });
    } catch (error) {
      console.error('getSimilarMovieList:', error);
    } finally {
      set({ isMovieSimilarLoading: false });
    }
  },

  // 검색 api
  getSearchMovie: async (searchkey:string) => {
    set({ isSearchLoading: true });
    try {
      const data = await getAPI(`/search/multi?query=${searchkey}&include_adult=true&language=ko&page=1`);
      console.log("getSearchMovie", data);
      set({ foundMovie: data.results });
    } catch (error) {
      console.error('getSearchMovie:', error);
    } finally {
      set({ isSearchLoading: false });
    }
  },




}));

export default useMovieStore;