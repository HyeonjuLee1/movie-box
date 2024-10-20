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
    <div className="mx-auto pt-0 sticky top-0 z-10 bg-primary">
      <header className="mx-auto max-w-[1120px] relative top-0 left-0 right-0 flex justify-between items-center h-[74px] px-5 py-0 z-10 ">
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
      </header>
    </div>
  );
};

export default Header;
