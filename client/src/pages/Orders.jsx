import { useContext, useEffect, useState } from "react";
import { CONVERSATION_ROUTES, GET_USER_GIGS_ROUTE } from "../utils/constants";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ModalContext } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";

function Orders() {
  const {
    state: { userOrders, isSeller },
  } = useContext(ModalContext);

  const [cookies] = useCookies();
  const [orders, setSellerOrders] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const {
          data: { gigs },
        } = await axios.get(GET_USER_GIGS_ROUTE, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setSellerOrders(gigs);
      } catch (err) {
        console.log(err);
      }
    };
    isSeller ? getUserGigs() : setSellerOrders(userOrders);
  }, [isSeller, userOrders]);

  const createConversation = async (sellerId) => {
    const res = await axios.post(
      CONVERSATION_ROUTES,
      {
        to: sellerId,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      }
    );
    navigate(`/buyer/orders/message/${res.data.id}`);
  };

  return (
    orders && (
      <div className="min-h-[80vh] mt-36 max-w-[1440px] mx-auto px-8">
        <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Date
                </th>
                {!isSeller && (
                  <th scope="col" className="px-6 py-3">
                    Send Message
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={order._id}
                  >
                    <th scope="row" className="px-6 py-4 ">
                      {order._id}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {order.title}
                    </th>
                    <td className="px-6 py-4">{order.category}</td>
                    <td className="px-6 py-4">{order.price}</td>
                    <td className="px-6 py-4">{order.deliveryTime}</td>
                    <td className="px-6 py-4">
                      {order.createdAt.split("T")[0]}
                    </td>
                    {!isSeller && (
                      <td
                        className="px-6 py-4 font-medium text-blue-600  hover:underline hover:cursor-pointer"
                        onClick={() => createConversation(order.sellerId)}
                      >
                        send
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default Orders;
