import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState("");

  useEffect(() => setText(keyword || ""), [keyword]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search/${text}`);
    }
  };

  return (
    <header>
      <div className="flex justify-center fixed z-[997] top-0 left-0 bg-primary w-full">
        <div className="flex items-center justify-between relative w-[1120px] h-[74px] px-5 py-0 z-10">
          <Link to="/" className="text-[28px] font-bold text-white">
            Movie
          </Link>

          <div>
            <input
              className="bg-black box-content border border-solid border-primary-light rounded-xl text-base px-4 py-3 text-white min-w-[240px]"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="제목으로 찾아보세요"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
