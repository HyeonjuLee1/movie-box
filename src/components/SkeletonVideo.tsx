interface SkeletonVideoProps {
  index: number;
}

const SkeletonVideo = ({ index }: SkeletonVideoProps) => {
  return (
    <div
      key={index}
      className="w-[216px] h-[327px] rounded-lg bg-gray-200 relative overflow-hidden animate-pulse"
    ></div>
  );
};

export default SkeletonVideo;
