import { create } from 'zustand'
import  { AxiosError } from 'axios';
import axiosInst from "../utils/axiosInst";
import { VideoDataProps } from '../types';

interface TVShowState {
  dayTVShowTrendingList: VideoDataProps[] ;
  weekTVShowTrendingList: VideoDataProps[] ;
  tvShowInfo?: VideoDataProps ;

  isDayTrendingTVShowLoading: boolean;
  isWeekTrendingTVShowLoading: boolean;
  isTVShowDetailLoading: boolean;


  getDayTVShowTrending: () => Promise<void>;
  getWeekTVShowTrending: () => Promise<void>;
  getTVShowDetail: (id:number) => Promise<void>;

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


const useTVShowStore = create<TVShowState>((set) => ({
  dayTVShowTrendingList: [],
  weekTVShowTrendingList: [],
  tvShowInfo: undefined,

  isDayTrendingTVShowLoading: false,
  isWeekTrendingTVShowLoading: false,
  isTVShowDetailLoading: false,

  // 오늘 TV 트렌딩 조회
  getDayTVShowTrending: async () => {
    set({ isDayTrendingTVShowLoading: true });
    try {
      const data = await getAPI('/trending/tv/day?include_adult=true&language=ko');
      // console.log("dayTVShowTrendingList", data);
      set({ dayTVShowTrendingList: data.results });
    } catch (error) {
      console.error('dayTVShowTrendingList Error:', error);
    } finally {
      set({ isDayTrendingTVShowLoading: false });
    }
  },

  // 이번 주 TV 트렌딩 조회
  getWeekTVShowTrending: async () => {
    set({ isWeekTrendingTVShowLoading: true });
    try {
      const data = await getAPI('/trending/tv/week?include_adult=true&language=ko');
      //  console.log("weekTVShowTrendingList", data);
      set({ weekTVShowTrendingList: data.results });
    } catch (error) {
      console.error('weekTVShowTrendingList Error:', error);
    } finally {
      set({ isWeekTrendingTVShowLoading: false });
    }
  },

    // TVshow 상세 api
  getTVShowDetail: async (id:number) => {
    set({ isTVShowDetailLoading: true });
    try {
      const data = await getAPI(`/tv/${id}?language=ko`);
       console.log("getTVShowDetail", data);
      set({ tvShowInfo: data });
    } catch (error) {
      console.error('getTVShowDetail Error:', error);
    } finally {
      set({ isTVShowDetailLoading: false });
    }
  },

 


}));

export default useTVShowStore;