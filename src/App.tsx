import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import TVShowDetail from "./pages/TVShowDetail";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/detail/:id" element={<MovieDetail />} />
      <Route path="/tvshow/detail/:id" element={<TVShowDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
