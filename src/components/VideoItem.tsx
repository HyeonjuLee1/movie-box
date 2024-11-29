import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { GET_POSTER_URI } from "../utils/constants";

interface VideoItemProps {
  poster_path?: string;
  title?: string;
  rank?: boolean;
  rankNumber?: number;
  onClick?: () => void;
}

const VideoItem = ({
  poster_path,
  title,
  rank,
  rankNumber,
  onClick,
}: VideoItemProps) => {
  return (
    <div className="rounded-xl mb-[80px] overflow-hidden" onClick={onClick}>
      {poster_path ? (
        <>
          <img
            // mock데이터 사용하는 경우
            // src={poster_path}
            src={`${GET_POSTER_URI}${poster_path}`}
            alt={title}
            // className="w-full sm:w-[216px] h-auto sm:h-[327px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            className="flex justify-center items-center w-[216px] h-[327px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          />
          {rank && (
            <div className="text-white text-[90px] font-bold italic flex absolute bottom-5">
              {rankNumber}
            </div>
          )}
        </>
      ) : (
        <div className="w-[216px] h-[327px] rounded-xl cursor-default">
          <div className="flex h-full flex-col justify-center items-center">
            <FontAwesomeIcon
              icon={faFileImage}
              className="text-white text-[90px] mb-10"
            />
            <span className="text-white">포스터 준비중입니다.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
