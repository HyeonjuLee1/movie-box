import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

interface VideoItemProps {
  poster_path: string;
  title: string;
  rank: number;
}

const VideoItem = ({ poster_path, title, rank }: VideoItemProps) => {
  return (
    <div className="rounded-xl mb-[80px] overflow-hidden">
      {poster_path ? (
        <>
          <img
            src={poster_path}
            alt={title}
            className="w-[216px] h-[327px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="text-white text-[90px] font-bold italic flex absolute bottom-5">
            {rank}
          </div>
        </>
      ) : (
        <div className="w-[216px] h-[327px] rounded-xl cursor-default">
          <div className="flex h-full flex-col justify-center">
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
