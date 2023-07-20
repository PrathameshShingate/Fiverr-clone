import React from "react";

const Featured = () => {
  return (
    <div className="trusted-by flex justify-center items-center gap-12 bg-[#fafafa] py-5">
      <span className="text-[#b5b6ba] font-semibold">Trusted by:</span>
      <div className="flex justify-center items-center gap-14">
        <img src="./trusted1.png" alt="" />
        <img src="./trusted2.png" alt="" />
        <img src="./trusted3.png" alt="" />
        <img src="./trusted4.png" alt="" />
        <img src="./trusted5.png" alt="" />
      </div>
    </div>
  );
};

export default Featured;
