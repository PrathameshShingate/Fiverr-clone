import { Link } from "react-router-dom";

function SearchGridItem({ gig }) {
  return (
    <Link to={`/gig/${gig._id}`}>
      <div className="w-full flex flex-col gap-2 cursor-pointer">
        <div className="w-full h-44">
          <img
            src={gig.images.length ? gig.images[0] : "./nextportfolio.png"}
            alt="gig"
            className="rounded-xl h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex items-center my-2 gap-2">
          <div className="h-8 w-8">
            {gig.profileImage ? (
              <img
                src={gig.profileImage}
                alt="profile"
                className="rounded-full h-full w-full object-cover object-center"
              />
            ) : (
              <div className="bg-purple-500 h-8 w-8 flex items-center justify-center rounded-full relative">
                <span className="text-lg text-white">
                  {gig.email.split("")[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <span className="text-md ">
            <strong className="font-medium">{gig.fullName}</strong>
          </span>
        </div>
        <div>
          <p className="line-clamp-2 text-[#404145]">{gig.title}</p>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            xmlns="http://www.w3.org/2000/svg"
            fill="#404145"
          >
            <path
              fill="inherit"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"
            ></path>
          </svg>
          <strong className="font-medium">
            {!isNaN(gig.totalStars / gig.starNumber) &&
              Math.round(gig.totalStars / gig.starNumber)}
          </strong>
        </div>
        <div>
          <strong className="font-medium">From Rs {gig.price}/-</strong>
        </div>
      </div>
    </Link>
  );
}

export default SearchGridItem;
