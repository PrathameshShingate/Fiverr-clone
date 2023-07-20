import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useContext, useState } from "react";
import Review from "../components/Review";
import { REVIEW_ROUTES } from "../utils/constants";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ModalContext } from "../context/ModalContext";

const Reviews = () => {
  const { gigId } = useParams();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [cookies, removeCookie] = useCookies();
  const {
    state: { userOrders },
  } = useContext(ModalContext);

  const checkIsGigOrdered = () => {
    const data = userOrders.find((order) => {
      return order.gigId === gigId;
    });
    if (data) return;
    return true;
  };

  const getReviews = async () => {
    return await axios.get(`${REVIEW_ROUTES}/${gigId}`);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      getReviews().then((res) => {
        return res.data;
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${REVIEW_ROUTES}/`,
      {
        gigId,
        desc: review,
        star: stars,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      }
    );
    refetch();
    setReview("");
  };

  return (
    <div className="reviews mt-12 mb-12">
      <h2 className="font-semibold text-2xl text-[#404145]">Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review, index) => (
            <Fragment key={index}>
              <Review review={review} />
              <hr className="h-1 my-12 border-[#ebe9e9]" />
            </Fragment>
          ))}
      {!checkIsGigOrdered() && (
        <div className="mt-5 flex flex-col gap-5">
          <h3>Add a review</h3>
          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="p-4 border rounded-md focus:outline-none focus:border-neutral-800"
              placeholder="write your opinion"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div className="flex justify-between">
              <select
                onChange={(e) => setStars(e.target.value)}
                name=""
                id=""
                className="w-52 p-4 self-end border rounded-md focus:outline-none focus:border-neutral-800"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button className="self-end font-medium w-24 border-none rounded-md p-4 text-white bg-[#1dbf73] cursor-pointer">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;
