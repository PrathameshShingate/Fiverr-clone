import { useState, useEffect } from "react";
import axios from "axios";
import Reviews from "../Reviews";
import moment from "moment";
import { useCookies } from "react-cookie";
import { GET_USER_GIGS_BY_ID } from "../../utils/constants";

const Details = ({ gigData }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [gigs, setGigs] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const {
          data: { gigs },
        } = await axios.get(`${GET_USER_GIGS_BY_ID}/${gigData.userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setGigs(gigs);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  const getAverageDeliveryTime = () => {
    var total = 0;
    gigs.forEach((gig) => {
      total += gig.deliveryTime;
    });

    total = total / gigs.length;
    return total;
  };

  const total = getAverageDeliveryTime();

  return (
    <>
      {gigData && (
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#404145] mb-1">
            {gigData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8">
              {gigData.profileImage ? (
                <img
                  src={gigData.profileImage}
                  alt="profile"
                  height={30}
                  width={30}
                  className="rounded-full h-full w-full object-cover object-center"
                />
              ) : (
                <div className="bg-purple-500 h-8 w-8 flex items-center justify-center rounded-full relative">
                  <span className="text-lg text-white">
                    {gigData.email.split("")[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <h4 className="text-[#404145] font-bold">{gigData.fullName}</h4>
              <h6 className="text-[#74767e]">@{gigData.username}</h6>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">
                {gigData.totalStars &&
                  Array(Math.round(gigData.totalStars / gigData.starNumber))
                    .fill()
                    .map((_, i) => (
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        xmlns="http://www.w3.org/2000/svg"
                        key={i}
                        fill="#ffb33e"
                      >
                        <path
                          fill="inherit"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"
                        ></path>
                      </svg>
                    ))}
              </div>
              <span className="text-[#ffb33e] font-semibold">
                {gigData.totalStars &&
                  !isNaN(gigData.totalStars / gigData.starNumber) &&
                  Math.round(gigData.totalStars / gigData.starNumber)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
              <img
                src={currentImage ? currentImage : gigData.images[0]}
                alt="Gig"
                className="h-[480px] w-full hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              {gigData.images.length &&
                gigData.images.map((image) => (
                  <img
                    src={image}
                    alt="gig"
                    key={image}
                    onClick={() => setCurrentImage(image)}
                    className={`${
                      currentImage === image ? "" : "blur-sm"
                    } h-16 w-24 cursor-pointer transition-all duration-500`}
                  />
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl my-5 font-semibold text-[#404145]">
              About this gig
            </h3>
            <div>
              <p>{gigData.description}</p>
            </div>
          </div>
          <div className="seller mt-12 flex flex-col gap-5">
            <h3 className="text-2xl font-semibold text-[#404145]">
              About the Seller
            </h3>
            <div className="flex items-center gap-5">
              <div className="h-24 w-24">
                {gigData.profileImage ? (
                  <img
                    src={gigData.profileImage}
                    alt="profile"
                    className="rounded-full h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="bg-purple-500 h-8 w-8 flex items-center justify-center rounded-full relative">
                    <span className="text-lg text-white">
                      {gigData.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <span>{gigData.username}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#ffb33e] gap-1">
                    {gigData.totalStars &&
                      Array(Math.round(gigData.totalStars / gigData.starNumber))
                        .fill()
                        .map((_, i) => (
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            xmlns="http://www.w3.org/2000/svg"
                            key={i}
                            fill="#ffb33e"
                          >
                            <path
                              fill="inherit"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"
                            ></path>
                          </svg>
                        ))}
                  </div>
                  <span className="text-[#ffb33e] font-semibold">
                    {gigData.totalStars &&
                      !isNaN(gigData.totalStars / gigData.starNumber) &&
                      Math.round(gigData.totalStars / gigData.starNumber)}
                  </span>
                </div>
                <button className="bg-white rounded-md border-[1px] border-gray p-2.5 hover:bg-[#62646a] hover:text-white  transition-all duration-300">
                  Contact Me
                </button>
              </div>
            </div>
            <div className="box border-[1px] p-5 border-gray-300">
              <div className="flex justify-between flex-wrap">
                <div className="w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title">From</span>
                  <span className="desc">India</span>
                </div>
                <div className="w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title">Member since</span>
                  <span className="desc">
                    {moment(gigData.createdAt).fromNow()}
                  </span>
                </div>
                <div className="w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title">Avg. delivery time</span>
                  <span className="desc">{total ? total : 0} hours</span>
                </div>
                <div className="w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title">Last delivery</span>
                  <span className="desc"></span>
                </div>
                <div className="w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p className="mt-2">{gigData.description}</p>
            </div>
          </div>
          <Reviews />
        </div>
      )}
    </>
  );
};

export default Details;
