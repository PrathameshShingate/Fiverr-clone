import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/gigs?cat=${service.category}`}>
      <div className="service-card w-[240px] h-[345px] text-white rounded-md relative cursor-pointer">
        <img
          src={service.img}
          alt=""
          className="h-full w-full object-cover object-center hover:opacity-90 transition-all duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="font-light block">{service.desc}</span>
          <span className="font-medium text-2xl">{service.title}</span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
