const SkeletonVideo = () => {
  return (
    <div
      className="w-[216px] h-[327px] rounded-lg bg-gray-200 relative overflow-hidden animate-pulse"
      role="status"
      aria-label="콘텐츠 로딩 중">
      <span className="sr-only">영화 포스터를 불러오는 중입니다...</span>
    </div>
  );
};

export default SkeletonVideo;
