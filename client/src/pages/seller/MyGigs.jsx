import { useEffect, useState } from "react";
import { DELETE_GIG_ROUTE, GET_USER_GIGS_ROUTE } from "../../utils/constants";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [cookies] = useCookies();

  const deleteNotification = () => {
    toast.success("Gig deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

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
        setGigs(gigs);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  const deleteUserGig = async (id) => {
    const res = await axios.delete(`${DELETE_GIG_ROUTE}/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    if (res.data) {
      deleteNotification();
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
          setGigs(gigs);
        } catch (err) {
          console.log(err);
        }
      };
      getUserGigs();
    }
  };

  return (
    <div className="min-h-[80vh] my-10 max-w-[1440px] mx-auto px-8 mt-36">
      <h3 className="m-5 text-2xl font-semibold">All your Gigs</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {gigs.map((gig) => {
              return (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={gig._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {gig.title}
                  </th>
                  <td className="px-6 py-4">{gig.category}</td>
                  <td className="px-6 py-4">{gig.price}</td>
                  <td className="px-6 py-4">{gig.deliveryTime}</td>
                  <td className="">
                    <Link
                      to={`/seller/gigs/${gig._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td
                    onClick={() => deleteUserGig(gig._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
