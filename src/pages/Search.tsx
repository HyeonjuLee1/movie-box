import { useEffect } from "react";
import useMovieStore from "../stores/movieList";
import { useParams } from "react-router-dom";

const Search = () => {
  const { keyword } = useParams();
  const { foundMovie, getSearchMovie } = useMovieStore();

  useEffect(() => {
    if (keyword) {
      getSearchMovie(keyword);
    }
    window.scrollTo(0, 0);
  }, [getSearchMovie, keyword]);
  console.log("foundMovie", foundMovie);
  return <div>Search</div>;
};

export default Search;
