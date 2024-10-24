import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movieList";
import { useEffect, useMemo, useState } from "react";
import TrailerModal from "../components/TrailerModal";
import VideoBigImage from "../components/VideoBigImage";
import { GET_POSTER_URI } from "../utils/constants";
import moment from "moment";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isDetailLoading,
    isCrewLoading,
    movieInfo,
    movieTrailerInfo,
    movieCrewData,
    getMovieDetail,
    getTrailer,
    getMovieCastList,
  } = useMovieStore();
  const [openTrailerModal, setOpenTrailerModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getMovieDetail(parseInt(id));
      getTrailer(parseInt(id));
      getMovieCastList(parseInt(id));
    }
  }, [getMovieCastList, getMovieDetail, getTrailer, id]);

  const trailerVideoKey = useMemo(() => {
    return movieTrailerInfo?.results.find((r) => r.type === "Trailer")?.key;
  }, [movieTrailerInfo?.results]);

  console.log("id", id);
  // console.log("movieInfo screen", movieInfo);
  // console.log("movieInfo screen", movieInfo);

  return (
    <main>
      <VideoBigImage
        loading={isDetailLoading}
        movieInfo={movieInfo}
        onOpenModal={() => setOpenTrailerModal(true)}
      />
      <div className="w-[1120px] h-[1px] bg-secondary mx-auto my-[45px]"></div>

      {/* 영화 정보 */}
      <div className="flex justify-center">
        <div className="w-[1120px] flex text-secondary">
          {/* 영화포스터 */}
          <div
            className={`flex-none relative overflow-hidden w-[185px] h-[278px] rounded-[12px] ${
              isDetailLoading
                ? "w-[216px] h-[327px] rounded-lg bg-gray-200 relative overflow-hidden animate-pulse"
                : ""
            }`}
          >
            {!isDetailLoading && (
              <img
                className="max-w-full max-h-full"
                src={`${GET_POSTER_URI}${movieInfo?.poster_path}`}
                alt={movieInfo?.title}
              />
            )}
          </div>

          <div className="ml-[24px] min-h-[410px] w-full">
            <div
              className={`${
                isDetailLoading ? "h-[23px] rounded-[12px] animate-pulse" : ""
              }`}
              style={{ width: isDetailLoading ? "200px" : "auto" }}
            >
              <span className="text-white">
                {isDetailLoading ? "" : movieInfo?.title}
              </span>
            </div>

            <div
              className={`${
                isDetailLoading ? "h-[23px] rounded-[12px] animate-pulse" : ""
              }`}
              style={{ height: isDetailLoading ? "100px" : "auto" }}
            >
              <p className="text-[16px] text-secondary leading-[24px] break-all max-w-[900px]">
                {isDetailLoading ? "" : movieInfo?.overview}
              </p>
            </div>

            {/*  영화 정보 표  */}
            {!isDetailLoading ? (
              <table>
                <colgroup>
                  <col style={{ width: 76 }} />
                  <col style={{ width: "auto" }} />
                </colgroup>
                <tr>
                  <th
                    scope="row"
                    className="pt-[30px] text-[16px] font-normal text-white text-left align-top"
                  >
                    개요
                  </th>
                  <td className="pt-[30px] text-[16px] font-normal text-white text-left align-top">
                    {movieInfo?.production_countries
                      ? movieInfo?.production_countries[0].name
                      : ""}
                    , {`${moment(movieInfo?.release_date).format("YYYY")}`}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-[30px] text-[16px] font-normal text-white text-left align-top"
                  >
                    장르
                  </th>
                  <td className="pt-[30px] text-[16px] font-normal text-white text-left align-top">
                    {" "}
                    {movieInfo?.genres
                      ? movieInfo?.genres.map((g) => g.name).join(", ")
                      : ""}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-[30px] text-[16px] font-normal text-white text-left align-top"
                  >
                    출연
                  </th>
                  <td className="pt-[30px] text-[16px] font-normal text-white text-left align-top">
                    {""}
                  </td>
                  {/* <td>{{ actors }}</td> */}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-[30px] text-[16px] font-normal text-white text-left align-top"
                  >
                    감독
                  </th>
                  <td className="pt-[30px] text-[16px] font-normal text-white text-left align-top">
                    {" "}
                    {"DirectorName"}
                  </td>
                  {/* <td> {{ DirectorName }}</td> */}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-[30px] text-[16px] font-normal text-white text-left align-top"
                  >
                    등급
                  </th>
                  <td className="pt-[30px] text-[16px] font-normal text-white text-left align-top">
                    {movieInfo?.adult ? (
                      <div className="box-content bg-[#c52b30] p-[8px] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <div className="text-white text-sm flex font-bold justify-center items-center h-[20px]">
                            청소년
                          </div>
                          <div className="text-white text-sm flex font-bold justify-center items-center h-[20px]">
                            관람불가
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="box-content bg-[#4ba352] p-[8px] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <div className="text-black flex font-bold justify-center items-center h-[20px]">
                            전체
                          </div>
                          <div className="text-black flex font-bold justify-center items-center h-[20px]">
                            관람가
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </table>
            ) : (
              <div
                className="h-[23px] rounded-lg animate-pulse"
                style={{ marginTop: 18, height: 300 }}
              ></div>
            )}
          </div>
        </div>
      </div>

      {openTrailerModal && (
        <TrailerModal
          trailerVideoKey={trailerVideoKey}
          onClose={() => setOpenTrailerModal(false)}
        />
      )}
    </main>
  );
};

export default MovieDetail;
