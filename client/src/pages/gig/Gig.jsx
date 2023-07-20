import { useParams } from "react-router-dom";
import { GET_GIG_DATA } from "../../utils/constants";
import axios from "axios";
import Details from "../../components/gigs/Details";
import Pricing from "../../components/gigs/Pricing";
import { useQuery } from "@tanstack/react-query";

const Gig = () => {
  const { gigId } = useParams();

  const getGig = async () => {
    return await axios.get(`${GET_GIG_DATA}/${gigId}`);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      getGig().then((res) => {
        return res.data;
      }),
  });

  return isLoading ? (
    "loading"
  ) : error ? (
    "Something went wrong!"
  ) : (
    <div className="grid grid-cols-3 max-w-[1440px] mx-auto px-8 gap-20 mt-36">
      <Details gigData={data} />
      <Pricing gigData={data} />
    </div>
  );
};

export default Gig;
