import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import {
  GET_SELLER_DASHBOARD_DATA,
  UPDATE_SELLER_OR_BUYER,
} from "../../utils/constants";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Seller() {
  const {
    dispatch,
    state: { userInfo, isSeller },
  } = useContext(ModalContext);
  const [cookies] = useCookies();

  const getDashBoardData = async () => {
    return await axios.get(GET_SELLER_DASHBOARD_DATA, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["dashboard_data"],
    queryFn: () =>
      getDashBoardData().then((res) => {
        return res.data;
      }),
  });

  const handleModeSwitch = async () => {
    if (isSeller) {
      dispatch({ type: "SWITCH_MODE" });
    }

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
  };

  return isLoading ? (
    "loading"
  ) : error ? (
    "Something went wrong!"
  ) : (
    <div className="flex min-h-[80vh] my-10 px-32 p-36 gap-5">
      <div>
        <div className="shadow-md h-full p-8 flex flex-col gap-5 min-w-96 w-96 hover:shadow-xl transition-all duration-300">
          <div className="flex gap-5 justify-center flex-col items-center">
            <div>
              {userInfo?.profilePic ? (
                <img
                  src={userInfo.profilePic}
                  alt="Profile"
                  className="rounded-full h-32 w-32"
                />
              ) : (
                <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                  <span className="text-5xl text-white">
                    {userInfo.email.split("")[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#62646a] text-lg font-medium">
                {userInfo.username}
              </span>
              <span className="font-bold text-md">{userInfo.fullName}</span>
            </div>
          </div>
          <div className="border-t text-[#404145] py-5 text-base text-center">
            <p>{userInfo.description}</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 gap-10 w-full h-full">
          <Link to="gigs">
            <div className="shadow-md h-full p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-medium text-[#62646a]">Total Gigs</h2>
              <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                {data.gigs.length}
              </h3>
            </div>
          </Link>
          <Link to="/buyer/orders" onClick={handleModeSwitch}>
            <div className="shadow-md h-full p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-medium text-[#62646a]">
                Total Orders
              </h2>
              <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                {data.orders.length}
              </h3>
            </div>
          </Link>
          <Link to="orders/messages">
            <div className="shadow-md h-full p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-medium text-[#62646a]">
                Seller Conversations
              </h2>
              <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                {data.sellerConversations.length}
              </h3>
            </div>
          </Link>
          <Link to="/buyer/orders/messages" onClick={handleModeSwitch}>
            <div className="shadow-md h-full p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-medium text-[#62646a]">
                Buyer Conversations
              </h2>
              <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                {data.buyerConversations.length}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Seller;
