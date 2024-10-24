import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound = () => {
  return (
    <main className="mt-[30px]">
      <section>
        <div className="w-[1120px] min-h-[383px] mx-auto mb-[80px]">
          <div className="flex flex-col items-center">
            <div style={{ marginBottom: 30 }}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-white w-[32px] h-[32px]"
              />
            </div>
            <span className="text-white text-[20px]">잘못된 경로입니다.</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
