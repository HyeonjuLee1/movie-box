import SkeletonVideo from "./SkeletonVideo";

const LoadingVideoList = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="콘텐츠 로딩 중"
      className="w-full">
      <span className="sr-only">
        영화 목록을 불러오는 중입니다. 잠시만 기다려주세요.
      </span>

      <div className="flex gap-[10px] justify-start">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="flex-shrink-0">
            <SkeletonVideo />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingVideoList;
