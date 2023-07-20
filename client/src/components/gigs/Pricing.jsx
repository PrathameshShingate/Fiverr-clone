import { useContext, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { useParams, Link } from "react-router-dom";

const Pricing = ({ gigData }) => {
  const {
    state: { userInfo, userOrders },
  } = useContext(ModalContext);
  const { gigId } = useParams();

  const checkIsGigOrdered = () => {
    const data = userOrders.find((order) => {
      return order.gigId === gigId;
    });
    if (data) return;
    return true;
  };

  useEffect(() => {
    checkIsGigOrdered();
  }, []);

  return (
    <>
      {gigData && (
        <div className="sticky top-36 mb-10 h-max w-96">
          <div className="border p-10 flex flex-col gap-5">
            <div className="flex justify-between gap-1">
              <h4 className="text-md font-normal text-[#74767e]">
                {gigData.shortDesc}
              </h4>
              <h6 className="font-medium text-lg">{gigData.price}rs</h6>
            </div>
            <div>
              <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                    <path d="M9 4H7v5h5V7H9V4z"></path>
                  </svg>
                  <span>{gigData.deliveryTime} Days Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z"></path>
                    <path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z"></path>
                  </svg>
                  <span>{gigData.revisions} Revisions</span>
                </div>
              </div>
              <ul></ul>
            </div>
            <ul className="flex gap-1 flex-col">
              {gigData.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#1DBF73"
                  >
                    <path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z"></path>
                  </svg>
                  <span className="text-[#4f5156]">{feature}</span>
                </li>
              ))}
            </ul>
            {gigData.userId === userInfo._id ? (
              <Link
                className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded"
                to={`/seller/gigs/${gigData._id}`}
              >
                <span>Edit</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-2xl absolute right-4"
                  fill="white"
                >
                  <path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z"></path>
                </svg>
              </Link>
            ) : (
              checkIsGigOrdered() && (
                <Link
                  className="flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded"
                  to={`/pay/${gigData._id}`}
                >
                  <span>Continue</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-2xl absolute right-4"
                    fill="white"
                  >
                    <path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z"></path>
                  </svg>
                </Link>
              )
            )}
          </div>
          {gigData.userId !== userInfo._id && (
            <div className="flex items-center justify-center mt-5">
              <button className="flex justify-center gap-4 items-center w-5/6 py-1 border border-[#74767e] px-5 text-[#6c6d75] transition-all duration-300 text-lg rounded font-bold">
                Contact Me
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#74767e"
                >
                  <path d="M0.190662 1.2721L0.809349 0.653381C0.955787 0.506943 1.19322 0.506943 1.33969 0.653381L7.00001 6.30022L12.6603 0.653381C12.8068 0.506944 13.0442 0.506944 13.1907 0.653381L13.8094 1.2721C13.9558 1.41854 13.9558 1.65597 13.8094 1.80244L7.26519 8.34663C7.11875 8.49307 6.88132 8.49307 6.73485 8.34663L0.190662 1.80244C0.0441933 1.65597 0.0441933 1.41854 0.190662 1.2721Z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Pricing;
