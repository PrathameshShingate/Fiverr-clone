import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment";
import { useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import { CONVERSATION_ROUTES } from "../utils/constants";
import { useCookies } from "react-cookie";
import axios from "axios";

const Messages = () => {
  const [cookies, removeCookie] = useCookies();

  const {
    dispatch,
    state: { isSeller, userConversations },
  } = useContext(ModalContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(CONVERSATION_ROUTES, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });

        dispatch({
          type: "USER_CONVERSATIONS",
          payload: { userConversations: res.data },
        });
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, [isSeller]);

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axios.put(
        `${CONVERSATION_ROUTES}/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="min-h-[80vh] mt-36 max-w-[1440px] mx-auto px-8">
      {userConversations ? (
        <div className="">
          <h3 className="m-5 text-2xl font-semibold text-[#404145]">
            All your Orders
          </h3>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-[#62646a] uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {isSeller ? "Buyer" : "Seller"}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last message
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userConversations.map((c) => {
                  return (
                    <tr
                      className={
                        (isSeller ? !c.readBySeller : null) ||
                        (!isSeller ? !c.readByBuyer : null)
                          ? "bg-[#24de870f] text-[#404145] text-base"
                          : "text-base text-[#62646a]"
                      }
                      key={c.id}
                    >
                      <th scope="row" className="px-6 py-4 font-medium">
                        {isSeller ? c.buyerId : c.sellerId}
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium">
                        <Link
                          to={`${
                            isSeller ? "/seller/orders" : "/buyer/orders"
                          }/message/${c.id}`}
                          className="link"
                        >
                          {c?.lastMessage?.substring(0, 100)}...
                        </Link>
                      </th>
                      <td className="px-6 py-4 font-medium">
                        {moment(c.updatedAt).fromNow()}
                      </td>
                      <td className="px-6 py-4">
                        {(isSeller && !c.readBySeller) ||
                        (!isSeller && !c.readByBuyer) ? (
                          <button
                            onClick={() => handleRead(c.id)}
                            className="font-semibold text-[#1dbf73] hover:underline hover:cursor-pointer"
                          >
                            Mark as Read
                          </button>
                        ) : (
                          <span className="text-[#62646a] font-medium">
                            Read
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Messages;
