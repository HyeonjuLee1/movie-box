import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { MovieInfoProps } from "../types";
import { GET_BACKPOSTER_URI } from "../utils/constants";

interface VideoBigImageProps {
  loading: boolean;
  movieInfo?: MovieInfoProps;
  onOpenModal?: () => void;
}

const VideoBigImage = ({
  loading,
  movieInfo,
  onOpenModal,
}: VideoBigImageProps) => {
  return (
    <section className="relative h-[590px]">
      {!loading && movieInfo ? (
        <div
          className="relative w-[1120px] h-[590px] mx-auto bg-cover bg-center rounded-2xl flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom left,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${GET_BACKPOSTER_URI}${movieInfo?.backdrop_path})`,
          }}
        >
          <button
            className="align-middle cursor-pointer bg-transparent border-0"
            onClick={onOpenModal}
          >
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="flex text-white text-[50px] justify-center items-center"
            />
          </button>

          <div className="absolute flex flex-col z-[40px] left-[20px] bottom-[40px] ml-[20px]">
            <div className="flex mb-[24px]">
              <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
                {moment(movieInfo?.release_date).format("YYYY.MM.DD")}
              </span>

              <div className="inline-block w-[3px] h-[3px] mt-[12px] mx-[8px] rounded-full bg-secondary align-middle"></div>
              <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">{`${movieInfo?.runtime}분`}</span>

              <div className="inline-block w-[3px] h-[3px] mt-[12px] mx-[8px] rounded-full bg-secondary align-middle"></div>
              {movieInfo?.genres && (
                <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
                  {movieInfo?.genres.map((g) => g.name).join(", ")}
                </span>
              )}

              <FontAwesomeIcon
                icon={faStar}
                className="flex items-center mx-2 text-red-600"
              />

              <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
                {`평점 : ${(movieInfo?.vote_average ?? 0).toFixed(1)}`}
              </span>
            </div>

            <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
              {movieInfo?.tagline}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-[1120px] h-[590px] mx-auto bg-cover bg-center rounded-2xl flex items-center justify-center bg-gray-200 overflow-hidden animate-pulse"></div>
      )}
    </section>
  );
};

export default VideoBigImage;
