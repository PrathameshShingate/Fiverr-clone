import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { SET_USER_INFO } from "../utils/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import upload from "../utils/upload";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    dispatch,
    state: { userInfo },
  } = useContext(ModalContext);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });

  const updateProfileNotification = () => {
    toast.info("Profile set successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const errorNotification = () => {
    toast.error("Enter a unique username!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    const handleData = { ...data };
    if (userInfo) {
      if (userInfo?.username) handleData.userName = userInfo?.username;
      if (userInfo?.description) handleData.description = userInfo?.description;
      if (userInfo?.fullname) handleData.fullName = userInfo?.fullname;
    }

    if (userInfo?.profilePic) {
      const fileName = image;
      fetch(userInfo.profilePic).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const files = new File([blob], fileName, { contentType });
        setImage(files);
      });
    }

    setData(handleData);
    setIsLoaded(true);
  }, []);

  const handleFile = (e) => {
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setImage(file[0]);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSetProfile = async () => {
    const updatedUser = { ...data };

    const url = await upload(image);
    if (url) {
      updatedUser.profilePic = url;
    }

    try {
      const res = await axios.put(
        SET_USER_INFO,
        { ...updatedUser },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      if (res.data.userNameError) {
        errorNotification();
      } else {
        updateProfileNotification();
        dispatch({
          type: "SET_USER",
          payload: {
            userInfo: {
              ...res.data,
            },
          },
        });
        navigate("/");
        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";

  return (
    isLoaded && (
      <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3 mt-36">
        <h2 className="text-3xl">Welocme to Fiverr Clone</h2>
        <h4 className="text-xl">Please complete your profile to get started</h4>
        <div className="flex flex-col items-center w-full gap-5">
          <div
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <label className={labelClassName} htmlFor="">
              Select a profile Picture
            </label>
            <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="profile"
                  className="w-full h-full bg-cover rounded-full"
                />
              ) : (
                <span className="text-6xl text-white">
                  {userInfo.email[0].toUpperCase()}
                </span>
              )}
              <div
                className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center transition-all duration-100  ${
                  imageHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="flex items-center justify-center w-full h-full relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-white absolute"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    onChange={handleFile}
                    className="opacity-0 w-full h-full rounded-full cursor-pointer"
                    multiple={true}
                    name="profileImage"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-[500px]">
            <div>
              <label className={labelClassName} htmlFor="userName">
                Please select a username
              </label>
              <input
                className={inputClassName}
                type="text"
                name="userName"
                id="userName"
                placeholder="Username"
                value={data.userName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="fullName">
                Please enter your full Name
              </label>
              <input
                className={inputClassName}
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                value={data.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-[500px]">
            <label className={labelClassName} htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={data.description}
              onChange={handleChange}
              className={inputClassName}
              placeholder="description"
            ></textarea>
          </div>
          <button
            className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={handleSetProfile}
          >
            Set Profile
          </button>
        </div>
      </div>
    )
  );
};

export default Profile;
