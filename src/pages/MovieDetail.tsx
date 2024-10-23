import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect } from "react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isDetailLoading, movieInfo, getMovieDetail } = useMovieStore();

  useEffect(() => {
    if (id) {
      getMovieDetail(parseInt(id));
    }
  }, [getMovieDetail, id]);

  console.log("id", id);
  console.log("movieInfo screen", movieInfo);
  return <div>{id}</div>;
};

export default MovieDetail;
