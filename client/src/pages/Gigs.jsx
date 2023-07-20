import { useState, useEffect } from "react";
import SearchGridItem from "../components/search/SearchGridItem";
import { GET_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [sort, setSort] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const { search } = useLocation();

  let minMax = "";

  if (search) {
    if (minValue) {
      minMax = `&min=${minValue}`;
    }
    if (maxValue) {
      minMax = `&max=${maxValue}`;
    }
  } else {
    if (minValue) {
      minMax = `?min=${minValue}`;
    }
    if (maxValue) {
      minMax = `?max=${maxValue}`;
    }
  }

  let sortQuery = "";

  if (sort) {
    sortQuery = `?sort=${sort}`;
  }

  const getGigs = async () => {
    return await axios.get(`${GET_GIGS_ROUTE}${search}${minMax}${sortQuery}`);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      getGigs().then((res) => {
        return res.data;
      }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, search]);

  const apply = () => {
    refetch();
  };

  return (
    <>
      {data && (
        <div className="max-w-[1440px] mx-auto px-8 mb-24 mt-36">
          <div className="menu flex justify-between items-center my-5 w-full">
            <div className="flex items-center gap-2.5 text-[#555] font-normal">
              <span>Budget</span>
              <input
                type="number"
                placeholder="min"
                onChange={(e) => setMinValue(e.target.value)}
                className="p-1.5 border-x border-y outline-none"
              />
              <input
                type="number"
                placeholder="max"
                onChange={(e) => setMaxValue(e.target.value)}
                className="p-1.5 border-x border-y outline-none"
              />
              <button
                className="py-1.5 px-3 bg-[#1dbf73] text-white border-none font-semibold rounded-md cursor-pointer"
                onClick={apply}
              >
                Apply
              </button>
            </div>
            <div className="relative flex items-center gap-2.5 border-[1px] rounded-md p-2.5">
              <span className="text-[#555] font-normal">Sort by :</span>
              <div
                className="hover:cursor-pointer flex items-center justify-between gap-2.5"
                onClick={() => setOpen(!open)}
              >
                <span className="font-semibold text-[#555]">
                  {sort === "sales" ? "Best Selling" : "Newest"}
                </span>
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#74767e"
                  className="w-4"
                >
                  <path d="M0.190662 1.2721L0.809349 0.653381C0.955787 0.506943 1.19322 0.506943 1.33969 0.653381L7.00001 6.30022L12.6603 0.653381C12.8068 0.506944 13.0442 0.506944 13.1907 0.653381L13.8094 1.2721C13.9558 1.41854 13.9558 1.65597 13.8094 1.80244L7.26519 8.34663C7.11875 8.49307 6.88132 8.49307 6.73485 8.34663L0.190662 1.80244C0.0441933 1.65597 0.0441933 1.41854 0.190662 1.2721Z"></path>
                </svg>
                {open && (
                  <div className="p-5 bg-white rounded-md border-x border-y border-gray-300 absolute top-7 right-0 z-10 flex flex-col gap-5 text-[#555]">
                    {sort === "sales" ? (
                      <span
                        className="cursor-pointer"
                        onClick={() => reSort("createdAt")}
                      >
                        Newest
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer"
                        onClick={() => reSort("sales")}
                      >
                        Best Selling
                      </span>
                    )}
                    <span
                      className="cursor-pointer"
                      onClick={() => reSort("sales")}
                    >
                      Popular
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-4">
            <span className="text-[#74767e] font-medium">
              {data.length} services available
            </span>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : data.map((gig) => <SearchGridItem gig={gig} key={gig._id} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default Gigs;
