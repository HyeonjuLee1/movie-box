import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  return <div>{id}</div>;
};

export default MovieDetail;
