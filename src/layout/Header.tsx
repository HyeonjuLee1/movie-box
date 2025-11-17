import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setText(keyword || ""), [keyword]);

  const handleSearch = () => {
    if (text.trim()) {
      navigate(`/search/${text.trim()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search/${text}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="mx-auto pt-0 sticky top-0 z-10 bg-primary">
      <header
        className="mx-auto max-w-[1120px] relative top-0 left-0 right-0 flex justify-between items-center h-[74px] px-5 py-0 z-10 "
        role="banner">
        <h1 className="m-0">
          <Link
            to="/"
            className="text-[28px] font-bold text-white"
            aria-label="홈으로 이동">
            Movie
          </Link>
        </h1>

        <nav role="navigation" aria-label="메인 검색">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            role="search">
            <label htmlFor="movie-search" className="sr-only">
              영화 및 TV Show 검색
            </label>
            <input
              id="movie-search"
              ref={searchInputRef}
              className="bg-black border border-primary-light rounded-l-xl text-base px-4 py-3 text-white min-w-[240px] focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="제목으로 찾아보세요"
              aria-label="영화 및 TV Show 제목 검색"
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-primary-light hover:bg-primary text-white px-4 py-3 rounded-r-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
              aria-label="검색 실행">
              <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
              <span className="sr-only">검색</span>
            </button>
          </form>
          {/* <div>
            <input
              className="bg-black box-content border border-solid border-primary-light rounded-xl text-base px-4 py-3 text-white min-w-[240px]"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="제목으로 찾아보세요"
            />
          </div> */}
        </nav>
      </header>
    </div>
  );
};

export default Header;
