import { useEffect } from "react";
import useTVShowStore from "../stores/tvShowList";
import { useParams } from "react-router-dom";

const TVShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getTVShowDetail } = useTVShowStore();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id);
      getTVShowDetail(numberId);
    }
    window.scrollTo(0, 0);
  }, [getTVShowDetail, id]);

  return <main>TVShowDetail</main>;
};

export default TVShowDetail;
