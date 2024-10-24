import { useEffect } from "react";
import useMovieStore from "../stores/movieList";
import { useParams } from "react-router-dom";
import VideoSwiperList from "../components/VideoSwiperList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const { keyword } = useParams();
  const { isSearchLoading, foundMovie, getSearchMovie } = useMovieStore();

  useEffect(() => {
    if (keyword) {
      getSearchMovie(keyword);
    }
    window.scrollTo(0, 0);
  }, [getSearchMovie, keyword]);
  console.log("foundMovie", foundMovie);
  return (
    <main className="mt-[30px]">
      {foundMovie && foundMovie?.length > 0 ? (
        <VideoSwiperList
          loading={isSearchLoading}
          listTitle={`${keyword} 검색결과`}
          videoData={foundMovie}
          mode="movie"
        />
      ) : (
        <section>
          <div className="w-[1120px] min-h-[383px] mx-auto mb-[80px]">
            <div className="flex justify-between mb-[20px]">
              <span className="text-white text-[24px]">{`${keyword} 검색결과`}</span>
            </div>
            <div className="flex flex-col items-center">
              <div style={{ marginBottom: 30 }}>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-white w-[32px] h-[32px]"
                />
              </div>
              <span className="text-white text-[20px]">
                검색 결과가 없습니다.
              </span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Search;
