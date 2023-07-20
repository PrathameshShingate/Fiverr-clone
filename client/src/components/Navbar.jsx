import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../context/ModalContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  GET_BUYER_ORDERS_ROUTE,
  GET_USER_INFO,
  UPDATE_SELLER_OR_BUYER,
} from "../utils/constants";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [cookies, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const {
    dispatch,
    state: { isSeller, userInfo },
  } = useContext(ModalContext);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const signUpNotification = () => {
    toast.success("Account successfully created!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const signInNotification = () => {
    toast.success("Login success!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          if (user.isProfileInfoSet === false) {
            signUpNotification();
          } else {
            signInNotification();
          }

          dispatch({
            type: "SET_USER",
            payload: { userInfo: user },
          });

          setIsLoaded(true);

          if (user.isProfileInfoSet === false) {
            navigate("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_BUYER_ORDERS_ROUTE, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });

        dispatch({ type: "USER_ORDERS", payload: { userOrders: orders } });
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  const handleModeSwitch = async () => {
    const updated_user = await axios.put(
      UPDATE_SELLER_OR_BUYER,
      { isSeller: !isSeller },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      }
    );

    dispatch({
      type: "SET_USER",
      payload: { userInfo: updated_user.data },
    });

    if (isSeller) {
      dispatch({ type: "SWITCH_MODE" });
      navigate("/buyer/orders/messages");
    } else {
      dispatch({ type: "SWITCH_MODE" });
      navigate("/seller");
    }
  };

  const handleOrdersNavigate = () => {
    if (isSeller) {
      navigate("/seller/orders");
    } else {
      navigate("/buyer/orders");
    }
  };

  const handleLogout = async () => {
    try {
      removeCookie("jwt");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoaded && (
        <div
          className={` ${
            active || pathname !== "/" || userInfo
              ? "bg-white text-[#62646A]"
              : "bg-transparent text-white"
          } navbar flex flex-col items-center w-full transition-all duration-500 ease-in fixed top-0 z-10`}
        >
          <div className="wrapper w-full max-w-[1440px] px-8">
            <div className="w-full flex justify-between items-center py-5">
              <Link to="/">
                <div className="text-4xl font-bold">
                  <svg
                    width="89"
                    height="27"
                    viewBox="0 0 89 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill={
                        active || pathname !== "/" || userInfo
                          ? "#404145"
                          : "#fff"
                      }
                    >
                      <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
                    </g>
                    <g fill="#1dbf73">
                      <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
                    </g>
                  </svg>
                </div>
              </Link>
              <div
                className={`flex ${
                  active || userInfo ? "opacity-100" : "opacity-0"
                }`}
              >
                <input
                  type="text"
                  placeholder="What service are you looking for today?"
                  className="w-[30rem] py-2 px-4 border focus:outline-none focus:border-[1px] focus:border-neutral-800 rounded-l-[4px]"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
                <button
                  className="bg-gray-800 py-1.5 text-white w-[52px] flex justify-center items-center rounded-r-[4px]"
                  onClick={() => {
                    setSearchData("");
                    navigate(`/gigs?search=${searchData}`);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                  >
                    <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex gap-6 items-center font-semibold">
                {!userInfo ? (
                  <>
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span className="flex items-center gap-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1C4.58875 1 1 4.58875 1 9C1 13.4113 4.58875 17 9 17C13.4113 17 17 13.4113 17 9C17 4.58875 13.4113 1 9 1ZM8.53125 4.92676C7.81812 4.89612 7.11218 4.7959 6.43811 4.63293C6.54578 4.37781 6.6626 4.13281 6.78857 3.90063C7.30542 2.94824 7.93994 2.27991 8.53125 2.03784V4.92676ZM8.53125 5.86499V8.53125H5.60339C5.64465 7.4906 5.82202 6.45752 6.11536 5.51782C6.8927 5.71362 7.70874 5.83215 8.53125 5.86499ZM8.53125 9.46875V12.135C7.70874 12.1678 6.8927 12.2864 6.11536 12.4822C5.82202 11.5425 5.64465 10.5094 5.60339 9.46875H8.53125ZM8.53125 13.0732V15.9622C7.93994 15.7201 7.30542 15.0518 6.78857 14.0994C6.6626 13.8672 6.54578 13.6222 6.43811 13.3671C7.11218 13.2041 7.81799 13.1039 8.53125 13.0732ZM9.46875 13.0732C10.1819 13.1039 10.8878 13.2041 11.5619 13.3671C11.4542 13.6222 11.3374 13.8672 11.2114 14.0994C10.6946 15.0518 10.0601 15.7201 9.46875 15.9622V13.0732ZM9.46875 12.135V9.46875H12.3966C12.3553 10.5094 12.178 11.5425 11.8846 12.4822C11.1073 12.2864 10.2913 12.1678 9.46875 12.135ZM9.46875 8.53125V5.86499C10.2913 5.83215 11.1073 5.71362 11.8846 5.51782C12.178 6.45752 12.3553 7.4906 12.3966 8.53125H9.46875ZM9.46875 4.92676V2.03784C10.0601 2.27991 10.6946 2.94824 11.2114 3.90063C11.3374 4.13281 11.4542 4.37781 11.5619 4.63293C10.8878 4.7959 10.1819 4.89612 9.46875 4.92676ZM12.0354 3.45349C11.8007 3.02087 11.5457 2.63953 11.2769 2.31421C12.2141 2.63428 13.0631 3.14636 13.7771 3.8031C13.3699 4.02124 12.931 4.21069 12.4694 4.36902C12.3384 4.0509 12.1936 3.74487 12.0354 3.45349ZM5.9646 3.45349C5.8064 3.74487 5.66162 4.0509 5.53064 4.36902C5.06897 4.21069 4.63013 4.02112 4.2229 3.8031C4.93689 3.14636 5.78589 2.63428 6.72314 2.31421C6.45435 2.63953 6.19946 3.02075 5.9646 3.45349ZM5.2135 5.25012C4.89355 6.27368 4.70544 7.38953 4.66492 8.53125H1.95349C2.05383 7.00769 2.63892 5.61438 3.5564 4.50525C4.06555 4.79724 4.62317 5.047 5.2135 5.25012ZM4.66492 9.46875C4.70544 10.6106 4.89355 11.7263 5.2135 12.7499C4.62317 12.953 4.06555 13.2028 3.5564 13.4948C2.63892 12.3856 2.05383 10.9923 1.95349 9.46875H4.66492ZM5.53064 13.631C5.66162 13.9491 5.8064 14.2551 5.9646 14.5465C6.19946 14.9791 6.45435 15.3605 6.72314 15.6858C5.78589 15.3657 4.93689 14.8536 4.22302 14.1969C4.63 13.9789 5.06897 13.7893 5.53064 13.631ZM12.0354 14.5465C12.1936 14.2551 12.3384 13.9491 12.4694 13.631C12.931 13.7893 13.3699 13.9789 13.7771 14.1969C13.0631 14.8536 12.2141 15.3657 11.2769 15.6858C11.5457 15.3605 11.8005 14.9792 12.0354 14.5465ZM12.7865 12.7499C13.1064 11.7263 13.2946 10.6105 13.3351 9.46875H16.0465C15.9462 10.9923 15.3611 12.3856 14.4436 13.4948C13.9344 13.2028 13.3768 12.953 12.7865 12.7499ZM13.3351 8.53125C13.2946 7.3894 13.1064 6.27368 12.7865 5.25012C13.3768 5.047 13.9344 4.79724 14.4436 4.50525C15.3611 5.61438 15.9462 7.00769 16.0465 8.53125H13.3351Z"
                          strokeWidth="0.2"
                          fill={active || pathname !== "/" ? "#62646A" : "#fff"}
                        ></path>
                      </svg>
                      English
                    </span>
                    <span>Become a Seller</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_SIGNIN_MODAL",
                          payload: { showSignInModal: true },
                        })
                      }
                    >
                      Sign in
                    </button>
                    <button
                      className={`${
                        active || pathname !== "/" || userInfo
                          ? "border-[#1dbf73] text-[#1dbf73] hover:text-white"
                          : "border-white text-white hover:border-[#1dbf73]"
                      }  border-x border-y rounded-md px-4 py-1.5 bg-transparent hover:bg-[#1dbf73] transition-all duration-200`}
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_SIGNUP_MODAL",
                          payload: { showSignUpModal: true },
                        })
                      }
                    >
                      Join
                    </button>
                  </>
                ) : (
                  <>
                    {isSeller && (
                      <Link to="/seller/gigs/create">Create a gig</Link>
                    )}
                    <span
                      onClick={handleOrdersNavigate}
                      className="cursor-pointer text-[#1dbf73]"
                    >
                      Orders
                    </span>
                    <span onClick={handleModeSwitch} className="cursor-pointer">
                      Switch to {isSeller ? "Buyer" : "Seller"}
                    </span>
                    <button
                      className="flex items-center gap-[10px] cursor-pointer relative h-10 w-10"
                      onClick={() => setOpen(!open)}
                    >
                      {userInfo?.profilePic ? (
                        <img
                          src={userInfo.profilePic}
                          alt="Profile"
                          className="rounded-full h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                          <span className="text-xl text-white">
                            {userInfo &&
                              userInfo?.email &&
                              userInfo?.email.split("")[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                      {open && (
                        <div className="flex flex-col items-start rounded-sm text-gray-700 font-light w-48 absolute top-12 right-0 bg-white border-[1px] divide-y divide-gray-100 shadow-lg">
                          <Link
                            to="/profile"
                            className="w-full text-left font-medium p-3 hover:bg-[#3cce8a] hover:text-white transition-all duration-300"
                          >
                            Profile
                          </Link>
                          <span
                            role="presentation"
                            onClick={handleLogout}
                            className="w-full text-left font-medium p-3 hover:bg-red-400 hover:text-white transition-all duration-300"
                          >
                            Logout
                          </span>
                        </div>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
            {(active || pathname !== "/") && (
              <>
                <hr className="w-full h-0 border-px border-[#ebe9e9]" />
                <div className="max-w-[1440px] w-full h-10 flex justify-between pt-[10px] font-medium text-[#62646A]">
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Graphics & Design
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Digital Marketing
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Writing & Translation
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Video & Animation
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Music & Audio
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Programming & Tech
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Photography
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    Business
                  </Link>
                  <Link
                    to="/"
                    className="hover:border-b-4 pb-1 border-[#1dbf73]"
                  >
                    AI Services
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
