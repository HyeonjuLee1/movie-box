import { create } from 'zustand'
import  { AxiosError } from 'axios';
import axiosInst from "../utils/axiosInst";
import { CrewDataProps, MovieBackdropsPostersListProps, TrailerProps, TvShowInfoProps, TvShowItemProps } from '../types';

interface TVShowState {
  dayTVShowTrendingList: TvShowItemProps[];
  weekTVShowTrendingList: TvShowItemProps[];
  tvShowInfo?: TvShowInfoProps;
  tvShowTrailerInfo?: TrailerProps;
  tvShowCrewData?: CrewDataProps;
  tvShowBackdropsList?: MovieBackdropsPostersListProps[];
  tvShowPostersList?: MovieBackdropsPostersListProps[];
  similarTvShowList?: TvShowItemProps[];

  isDayTrendingTVShowLoading: boolean;
  isWeekTrendingTVShowLoading: boolean;
  isTVShowDetailLoading: boolean;
  isTVShowTrailerLoading: boolean;
  isTVShowCrewLoading: boolean;
  isTVShowImagesLoading: boolean;
  isTVShowSimilarLoading: boolean;


  getDayTVShowTrending: () => Promise<void>;
  getWeekTVShowTrending: () => Promise<void>;
  getTVShowDetail: (id:number) => Promise<void>;
  getTVShowTrailer: (id:number) => Promise<void>;
  getTVShowCastList: (id:number) => Promise<void>;
  getTVShowImages: (id:number) => Promise<void>;
  getSimilarTVList: (id:number) => Promise<void>;

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
    alert('TMDB MOVIE API 요청 한도가 초과되었습니다.');
    }
    throw axiosError;
  }
};


const useTVShowStore = create<TVShowState>((set) => ({
  dayTVShowTrendingList: [],
  weekTVShowTrendingList: [],
  tvShowInfo: undefined,
  tvShowTrailerInfo: undefined,
  tvShowCrewData: undefined,
  similarTvShowList: undefined,

  isDayTrendingTVShowLoading: false,
  isWeekTrendingTVShowLoading: false,
  isTVShowDetailLoading: false,
  isTVShowTrailerLoading: false,
  isTVShowCrewLoading: false,
  isTVShowImagesLoading: false,
  isTVShowSimilarLoading: false,

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
      //  console.log("getTVShowDetail", data);
      set({ tvShowInfo: data });
    } catch (error) {
      console.error('getTVShowDetail Error:', error);
    } finally {
      set({ isTVShowDetailLoading: false });
    }
  },

 // 예고편 get api
   getTVShowTrailer : async (id:number) => {
      set({ isTVShowTrailerLoading: true });
    try {
      const data = await getAPI(`/tv/${id}/videos?language=ko`);
      // console.log("getTVTrailer", data);
       set({ tvShowTrailerInfo: data });
    } catch (error) {
      console.error("getTVTrailer Error data:", error);
    } finally {
       set({ isTVShowTrailerLoading: false });
    }
  },


  // TV 출연, 감독 리스트 api
   getTVShowCastList: async (id:number) => {
     set({ isTVShowCrewLoading: true });
    try {
      const data = await getAPI(`/tv/${id}/credits?language=ko`);
      // console.log("getTVShowCastList", data);
        set({ tvShowCrewData: data });
    } catch (error) {
      console.error("tvCrewData Error data:", error);
    } finally {
        set({ isTVShowCrewLoading: false });
    }
  },

    // 포스터, 스틸컷 api
   getTVShowImages :async (id:number) => {
      set({ isTVShowImagesLoading: true });
    try {
      const data = await getAPI(`/tv/${id}/images?page=1`);
      // console.log("ImagesdVShow", data);
       set({ tvShowBackdropsList: data.backdrops });
       set({ tvShowPostersList: data.posters });
    } catch (error) {
      console.error("ImagesdVShow Error data:", error);
    } finally {
      set({ isTVShowImagesLoading: false });
    }
  },

    // 비슷한 tvshow 리스트 api
    getSimilarTVList :async (id:number) => {
      set({ isTVShowSimilarLoading: true });
      try {
        const data = await getAPI(`/tv/${id}/similar?language=ko&page=1`);
        // console.log("similarVShowList", data.data?.results);
        set({ similarTvShowList: data?.results });
      } catch (error) {
        console.error("similarVShowList Error data:", error);
      } finally {
        set({ isTVShowSimilarLoading: false });
      }
    }


}));

export default useTVShowStore;