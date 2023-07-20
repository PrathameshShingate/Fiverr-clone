import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homebanner = () => {
  const [image, setImage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      5000
    );

    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="homebanner relative h-[600px] bg-cover bg-center">
      <div className="absolute h-[600px] w-full top-0 right-0 transition-opacity z-0">
        <div className="absolute left-8 2xl:left-[6.5%] top-2/4 -translate-y-2/4 flex flex-col gap-8 text-white">
          <h1 className="text-5xl leading-[56px] font-bold">
            Find the right{" "}
            <i className="font-medium">
              freelance <br /> service
            </i>
            , right away
          </h1>
          <div className="flex items-center justify-between bg-white rounded-md">
            <div className="flex items-center gap-[10px] w-full">
              <svg
                className="w-5 h-5 m-[10px]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentFill"
              >
                <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search for any service.."
                className="border-none outline-none text-[#232323] h-12 w-full"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
            <button
              className="bg-[#1dbf73] min-w-[120px] h-12 rounded-tr-md rounded-br-md hover:bg-[#1ba163] transition-all duration-200"
              onClick={() => {
                setSearchData("");
                navigate(`/gigs?search=${searchData}`);
              }}
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-[10px] font-semibold text-sm">
            <span>Popular:</span>
            <button className="bg-transparent border-[1px] py-[5px] px-[10px] rounded-full hover:bg-white hover:text-[#62646a] transition-all duration-200">
              Web Design
            </button>
            <button className="bg-transparent border-[1px] py-[5px] px-[10px] rounded-full hover:bg-white hover:text-[#62646a] transition-all duration-200">
              Wordpress
            </button>
            <button className="bg-transparent border-[1px] py-[5px] px-[10px] rounded-full hover:bg-white hover:text-[#62646a] transition-all duration-200">
              Logo Design
            </button>
            <button className="bg-transparent border-[1px] py-[5px] px-[10px] rounded-full hover:bg-white hover:text-[#62646a] transition-all duration-200">
              AI Services
            </button>
          </div>
        </div>
        <img
          src="./bg-hero1.webp"
          alt="hero"
          className={`${image === 1 ? "flex" : "hidden"} h-full w-full`}
        />
        <img
          src="./bg-hero2.webp"
          alt="hero"
          className={`${image === 2 ? "flex" : "hidden"} h-full w-full`}
        />
        <img
          src="./bg-hero3.webp"
          alt="hero"
          className={`${image === 3 ? "flex" : "hidden"} h-full w-full`}
        />
        <img
          src="./bg-hero4.webp"
          alt="hero"
          className={`${image === 4 ? "flex" : "hidden"} h-full w-full`}
        />
        <img
          src="./bg-hero5.webp"
          alt="hero"
          className={`${image === 5 ? "flex" : "hidden"} h-full w-full`}
        />
        <img
          src="./bg-hero6.webp"
          alt="hero"
          className={`${image === 6 ? "flex" : "hidden"} h-full w-full`}
        />
      </div>
    </div>
  );
};

export default Homebanner;
