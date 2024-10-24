import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface TrailerModalProps {
  trailerVideoKey?: string;
  onClose?: () => void;
}

const TrailerModal = ({ trailerVideoKey, onClose }: TrailerModalProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[998]">
      <div className="bg-black text-white absolute top-0 right-0 bottom-0 left-0 my-[74px] mx-auto text-center w-[90%] shadow-md z-[999] transform-none">
        <div className="flex justify-between p-4">
          <span className="text-[20px] font-medium"> Play Trailer</span>
          <button
            className="align-middle cursor-pointer bg-transparent border-0"
            onClick={onClose}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="flex text-white text-[20px] justify-center items-center"
            />
          </button>
        </div>

        <div className="w-full" style={{ height: "calc(100% - 61px)" }}>
          {trailerVideoKey && (
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideoKey}`}
              frameBorder="0"
              allowFullScreen
              title="Trailer"
              className="h-full"
              style={{ width: "inherit" }}
            ></iframe>
          )}
          {!trailerVideoKey && (
            <div className="text-5 font-medium mt-[400px]">
              예고편이 존재하지 않습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
