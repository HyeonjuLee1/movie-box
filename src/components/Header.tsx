const Header = () => {
  return (
    <header>
      <div className="flex justify-center fixed z-[997] top-0 left-0 bg-primary w-full">
        <div className="flex items-center justify-between relative w-[1120px] h-[74px] px-0 py-5 z-10">
          <div className="cursor-pointer text-[28px] font-bold text-white">
            Movie
          </div>
          <div>
            <input
              className="bg-black box-content border border-solid border-primary-light rounded-xl text-base px-3 py-4 text-white min-w-[240px]"
              type="text"
              placeholder="제목으로 찾아보세요"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
