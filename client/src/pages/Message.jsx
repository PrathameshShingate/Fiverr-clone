import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ModalContext } from "../context/ModalContext";
import { MESSAGE_ROUTES } from "../utils/constants";
import axios from "axios";

const Message = () => {
  const { id } = useParams();
  const [cookies, removeCookie] = useCookies();

  const {
    state: { userInfo },
  } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const getMessages = async () => {
    return await axios.get(`${MESSAGE_ROUTES}/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      getMessages().then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (message) => {
      return await axios.post(MESSAGE_ROUTES, message, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 mb-24 mt-36">
      <div className="h-[80vh]">
        <div className="max-h-[80vh] flex flex-col justify-center items-center">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col">
            <div className="mt-8">
              <div className="space-y-4 h-[50vh] overflow-y-auto">
                <div className="message">
                  {isLoading ? (
                    "loading"
                  ) : error ? (
                    "error"
                  ) : (
                    <div className="messages">
                      {data.map((m) => (
                        <div
                          className={
                            m.userId === userInfo._id ? "owner item" : "item"
                          }
                          key={m._id}
                        >
                          <img
                            src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                            className="w-8 h-8"
                          />
                          <p>{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <form onSubmit={handleSubmit} className="mt-8 flex w-full">
                <input
                  type="text"
                  className="rounded-full py-2 px-4 mr-2 w-full"
                  placeholder="Type a message..."
                  name="message"
                />
                <button
                  type="submit"
                  className="bg-[#1DBF73] text-white rounded-full px-4 py-2"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1933/1933005.png"
                    alt=""
                    className="h-6 w-6"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
