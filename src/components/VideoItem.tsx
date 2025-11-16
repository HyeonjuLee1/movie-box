import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { GET_POSTER_URI } from "../utils/constants";

interface VideoItemProps {
  poster_path?: string;
  title?: string;
  rank?: boolean;
  rankNumber?: number;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const VideoItem = ({
  poster_path,
  title,
  rank,
  rankNumber,
  onClick,
  onKeyDown,
}: VideoItemProps) => {
  const displayTitle = title || "제목 없음";
  const ariaLabel = rank ? `${rankNumber}위: ${displayTitle}` : displayTitle;

  return (
    <article className="relative mb-[80px] w-[216px]">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-label={`${ariaLabel} 상세 정보 보기`}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl">
        {poster_path ? (
          <div className="overflow-hidden rounded-xl">
            <img
              // mock데이터 사용하는 경우
              // src={poster_path}
              src={`${GET_POSTER_URI}${poster_path}`}
              alt={displayTitle}
              // className="w-full sm:w-[216px] h-auto sm:h-[327px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              className="flex justify-center items-center w-[216px] h-[327px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              loading="lazy"
            />
            {rank && rankNumber && (
              <div
                className="text-white text-[90px] font-bold italic flex absolute left-0 bottom-0 translate-y-1/2 pointer-events-none"
                aria-hidden="true">
                {rankNumber}
              </div>
            )}
          </div>
        ) : (
          <div
            className="w-[216px] h-[327px] rounded-xl cursor-default"
            role="img"
            aria-label={`${ariaLabel} - 포스터 이미지 준비 중`}>
            <div className="flex h-full flex-col justify-center items-center">
              <FontAwesomeIcon
                icon={faFileImage}
                className="text-white text-[90px] mb-10"
                aria-hidden="true"
              />
              <span className="text-white text-center px-4">포스터 준비중</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default VideoItem;
