import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PAYMENT_COMPLETED } from "../utils/constants";
import { useCookies } from "react-cookie";
import axios from "axios";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.put(
          `${PAYMENT_COMPLETED}`,
          { payment_intent },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );

        setTimeout(() => {
          navigate("/buyer/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="mt-36 font-semibold text-3xl h-[300px] w-full max-w-[1440px] flex justify-center text-center items-center mx-auto px-8">
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
