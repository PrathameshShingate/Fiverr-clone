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
    state: { isSeller, userInfo, userConversations },
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
    <div className="messages mt-36 max-w-[1440px] mx-auto px-8">
      {userConversations ? (
        <div className="container">
          <div className="title">
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          </div>
          <table>
            <tbody>
              <tr className="">
                <th className="text-[#404145]">
                  {isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="text-[#404145]">Last Message</th>
                <th className="text-[#404145]">Date</th>
                <th className="text-[#404145]">Action</th>
              </tr>
              {userConversations.map((c) => (
                <tr
                  className={
                    (isSeller ? !c.readBySeller : null) ||
                    (!isSeller ? !c.readByBuyer : null)
                      ? "active"
                      : "bg-[#fffcfc]"
                  }
                  key={c.id}
                >
                  <td>{isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <Link
                      to={`${
                        isSeller ? "/seller/orders" : "/buyer/orders"
                      }/message/${c.id}`}
                      className="link"
                    >
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((isSeller && !c.readBySeller) ||
                      (!isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Messages;
