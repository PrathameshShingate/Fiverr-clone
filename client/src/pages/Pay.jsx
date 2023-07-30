import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import { PAYMENT_INTENT } from "../utils/constants";

const stripePromise = loadStripe(
  "pk_test_51NIDClSFamaPox3seezsGiZLCqwk7OMwviU28DhC4gGK00wzGLdEFCNt6nLdlfN3HisoqIrCPBfHYCSMG9tQmpCN00G5eKwlJq"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies();
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `${PAYMENT_INTENT}/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    !clientSecret && makeRequest();
  }, [clientSecret]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="mt-36 max-w-[1440px] mx-auto px-8">
      <h2 className="text-center mx-auto pt-4 pb-10 text-[#404145] font-semibold text-3xl">
        Complete payment to purchase this gig
      </h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
