import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { MovieInfoProps, TvShowInfoProps } from "../types";
import { GET_BACKPOSTER_URI, GET_TVBACKPOSTER_URI } from "../utils/constants";
import { useMemo } from "react";

type VideoBigImageProps =
  | {
      loading: boolean;
      mode: "movie";
      videoInfo?: MovieInfoProps;
      onOpenModal?: () => void;
    }
  | {
      loading: boolean;
      mode: "tv";
      videoInfo?: TvShowInfoProps;
      onOpenModal?: () => void;
    };

const VideoBigImage = ({
  loading,
  videoInfo,
  onOpenModal,
  mode,
}: VideoBigImageProps) => {
  const VideoInfoTextMarkup = useMemo(() => {
    if (mode === "tv") {
      return (
        <>
          <div className="mb-[20px]">
            <span className="text-[16px] text-secondary leading-[24px] break-all">
              {videoInfo?.name}
            </span>
          </div>
          <div className="flex">
            {videoInfo?.genres && (
              <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
                {videoInfo?.genres.map((g) => g.name).join(", ")}
              </span>
            )}
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faStar}
                className="flex items-center mx-2 text-red-600"
              />
            </div>
            <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
              {`평점 : ${(videoInfo?.vote_average ?? 0).toFixed(1)}`}
            </span>
          </div>
        </>
      );
    } else if (mode === "movie") {
      return (
        <>
          <div className="flex mb-[24px]">
            <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
              {moment(videoInfo?.release_date).format("YYYY.MM.DD")}
            </span>

            <div className="inline-block w-[3px] h-[3px] mt-[12px] mx-[8px] rounded-full bg-secondary align-middle"></div>
            <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">{`${videoInfo?.runtime}분`}</span>

            <div className="inline-block w-[3px] h-[3px] mt-[12px] mx-[8px] rounded-full bg-secondary align-middle"></div>
            {videoInfo?.genres && (
              <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
                {videoInfo?.genres.map((g) => g.name).join(", ")}
              </span>
            )}
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faStar}
                className="flex items-center mx-2 text-red-600"
              />
            </div>

            <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
              {`평점 : ${(videoInfo?.vote_average ?? 0).toFixed(1)}`}
            </span>
          </div>

          <span className="max-w-[760px] text-[16px] text-secondary leading-[24px] break-all">
            {videoInfo?.tagline}
          </span>
        </>
      );
    } else {
      return <></>;
    }
  }, [mode, videoInfo]);

  return (
    <section className="relative h-[590px]">
      {!loading && videoInfo ? (
        <div
          className="relative w-full max-w-[1120px] h-[590px] mx-auto bg-cover bg-center rounded-2xl flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom left,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${
              mode === "movie" ? GET_BACKPOSTER_URI : GET_TVBACKPOSTER_URI
            }${videoInfo?.backdrop_path})`,
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
            {VideoInfoTextMarkup}
          </div>
        </div>
      ) : (
        <div className="relative w-[1120px] h-[590px] mx-auto bg-cover bg-center rounded-2xl flex items-center justify-center bg-gray-200 overflow-hidden animate-pulse"></div>
      )}
    </section>
  );
};

export default VideoBigImage;
