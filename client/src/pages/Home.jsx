import React from "react";
import Homebanner from "../components/home/Homebanner";
import Featured from "../components/home/Featured";
import Slider from "../components/Slider";
import ServiceCard from "../components/home/ServiceCard";
import ProjectCard from "../components/home/ProjectCard";
import { cards } from "../data";
import { projects } from "../data";

const Home = () => {
  return (
    <div className="home">
      <Homebanner />
      <Featured />
      <Slider title="Popular services" slidesToShow={5} arrowsScroll={5}>
        {cards.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </Slider>
      <div className="featured-video flex justify-center bg-[#f1fdf7]">
        <div className="max-w-[1440px] w-full px-8 py-24 flex gap-36">
          <div className="flex flex-col gap-6 flex-1">
            <h1 className="text-[#404145] text-[32px] font-bold">
              The best part? Everything.
            </h1>
            <div className="font-bold text-lg">
              <div className="flex pb-2 items-center gap-[10px] text-[#404145]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </div>
              <p className="text-[#62646a] font-medium">
                Find the right service for every price point. No hourly rates,
                just project-based pricing.
              </p>
            </div>
            <div className="font-bold text-lg">
              <div className="flex pb-2 items-center gap-[10px] text-[#404145]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </div>
              <p className="text-[#62646a] font-medium">
                Find the right service for every price point. No hourly rates,
                just project-based pricing.
              </p>
            </div>
            <div className="font-bold text-lg">
              <div className="flex pb-2 items-center gap-[10px] text-[#404145]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </div>
              <p className="text-[#62646a] font-medium">
                Find the right service for every price point. No hourly rates,
                just project-based pricing.
              </p>
            </div>
            <div className="font-bold text-lg">
              <div className="flex pb-2 items-center gap-[10px] text-[#404145]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </div>
              <p className="text-[#62646a] font-medium">
                Find the right service for every price point. No hourly rates,
                just project-based pricing.
              </p>
            </div>
          </div>
          <div className="flex-2 flex items-center">
            <img src="./videoImage.png" alt="" />
          </div>
        </div>
      </div>
      <div className="fiverr business flex justify-center bg-[#0d084d]">
        <div className="max-w-[1440px] w-full px-8 py-24 flex gap-24">
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex items-center gap-3">
              <svg
                width="219"
                height="27"
                viewBox="0 0 219 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#fff">
                  <path d="M81.6,13.1h-3.1c-2,0-3.1,1.5-3.1,4.1v9.3h-6V13.1h-2.5c-2,0-3.1,1.5-3.1,4.1v9.3h-6V8.1h6v2.8 c1-2.2,2.3-2.8,4.3-2.8h7.3v2.8c1-2.2,2.3-2.8,4.3-2.8h2L81.6,13.1z M56.4,18.7H44c0.3,2.1,1.6,3.2,3.7,3.2 c1.6,0,2.7-0.7,3.1-1.8l5.3,1.5c-1.3,3.2-4.5,5.1-8.4,5.1c-6.5,0-9.5-5.1-9.5-9.5c0-4.3,2.6-9.4,9.1-9.4c6.9,0,9.2,5.2,9.2,9.1 C56.5,17.8,56.5,18.3,56.4,18.7z M50.7,15.2c-0.1-1.6-1.3-3-3.3-3c-1.9,0-3,0.8-3.4,3H50.7z M27.8,26.5H33l6.6-18.3h-6l-3.2,10.7 L27.2,8.1h-6L27.8,26.5z M3.4,26.5h5.9V13.1H15v13.4h5.9V8.1H9.3V7c0-1.2,0.9-2,2.2-2H15V0h-4.4C6.3,0,3.4,2.7,3.4,6.6v1.5H0v5 h3.4L3.4,26.5z"></path>
                  <path d="M91.7,23.7v2.7h-3.5V0h3.5v10.8c1.1-1.8,3.3-3,5.8-3c5.6,0,8.7,4,8.7,9.4s-3.2,9.4-8.8,9.4 C95,26.7,92.8,25.5,91.7,23.7z M102.6,17.3c0-3.8-2.2-6.4-5.6-6.4c-3.4,0-5.6,2.5-5.6,6.4s2.2,6.4,5.6,6.4 C100.4,23.6,102.6,21.1,102.6,17.3z"></path>
                  <path d="M123.5,26.4H120v-3.2c-1,2.3-3.2,3.5-5.9,3.5c-4.1,0-6.8-3-6.8-7.3V8.1h3.5v10.6c0,2.9,1.7,4.9,4.3,4.9 c2.9,0,4.9-2.3,4.9-5.5V8.1h3.5L123.5,26.4z"></path>
                  <path d="M125,20.5h3.2c0.3,2.2,1.7,3.4,4.2,3.4c2.1,0,3.5-1.1,3.5-2.5c0-5-10.5-0.4-10.5-8.3c0-3.1,2.7-5.2,6.5-5.2 c4.1,0,6.9,2.3,7.1,5.7h-3.2c-0.3-2.1-2.3-2.9-3.9-2.9c-2,0-3.3,0.9-3.3,2.4c0,4.6,10.5-0.1,10.5,8.2c0,3.3-2.7,5.5-6.8,5.5 C128.1,26.7,125.2,24.3,125,20.5z"></path>
                  <path d="M144.5,8.1H141v18.3h3.5V8.1z"></path>
                  <path d="M147.1,8.1h3.5v3.2c1-2.3,3.2-3.5,5.9-3.5c4.1,0,6.8,3,6.8,7.3v11.3h-3.5V15.8c0-2.9-1.7-4.9-4.3-4.9 c-2.9,0-4.9,2.3-4.9,5.5v9.9H147L147.1,8.1z"></path>
                  <path d="M182.9,20.5h3.2c0.3,2.2,1.7,3.4,4.2,3.4c2.1,0,3.5-1.1,3.5-2.5c0-5-10.5-0.4-10.5-8.3 c0-3.1,2.7-5.2,6.5-5.2c4.1,0,6.9,2.3,7.1,5.7h-3.2c-0.3-2.1-2.3-2.9-3.9-2.9c-2,0-3.3,0.9-3.3,2.4c0,4.6,10.5-0.1,10.5,8.2 c0,3.3-2.7,5.5-6.8,5.5C186,26.7,183.2,24.3,182.9,20.5z"></path>
                  <path d="M178.7,20.5c-0.5,2.1-2.3,3.2-4.9,3.2c-3.2,0-5.4-2.4-5.7-5.8h14c0-0.3,0.1-0.9,0.1-1.4c0-4.6-3-8.7-8.7-8.7 c-5.6,0-8.8,4.2-8.8,9.3c0,5.1,3.5,9.6,9.2,9.6c4.1,0,7.2-2.1,8.2-5.3L178.7,20.5z M173.4,10.7c3,0,4.9,1.9,5.1,4.6h-10.4 C168.7,12.2,170.5,10.7,173.4,10.7z"></path>
                  <path d="M198.1,20.5h3.2c0.3,2.2,1.7,3.4,4.2,3.4c2.1,0,3.5-1.1,3.5-2.5c0-5-10.5-0.4-10.5-8.3 c0-3.1,2.7-5.2,6.5-5.2c4.1,0,6.9,2.3,7.1,5.7h-3.2c-0.3-2.1-2.3-2.9-3.9-2.9c-2,0-3.3,0.9-3.3,2.4c0,4.6,10.5-0.1,10.5,8.2 c0,3.3-2.7,5.5-6.8,5.5C201.2,26.7,198.3,24.3,198.1,20.5z"></path>
                  <path d="M142.7,0c-0.6,0-1.1,0.2-1.6,0.7c-0.4,0.4-0.7,1-0.7,1.6c0,0.6,0.2,1.1,0.7,1.6c0.5,0.4,1,0.7,1.6,0.7 c0.6,0,1.1-0.2,1.6-0.7c0.4-0.5,0.7-1,0.7-1.6c0-0.3-0.1-0.6-0.2-0.9s-0.3-0.5-0.5-0.8c-0.2-0.2-0.5-0.4-0.7-0.5 C143.4,0.1,143.1,0,142.7,0z"></path>
                  <path d="M218.3,24.4L218.3,24.4c0,0.6-0.2,1.2-0.7,1.6c-0.4,0.4-1,0.7-1.6,0.7c-0.6,0-1.2-0.2-1.6-0.7 c-0.4-0.4-0.7-1-0.7-1.6v0c0-0.6,0.2-1.2,0.7-1.6c0.4-0.4,1-0.7,1.6-0.7c0.6,0,1.2,0.2,1.6,0.7C218.1,23.2,218.3,23.8,218.3,24.4z"></path>
                </g>
              </svg>
              <span className="text-white font-bold text-xs rounded-full px-2 py-0.5 border-[#584AFF] bg-[#584AFF] border-x border-y">
                NEW
              </span>
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold pb-6">
                A solution built for <i className="font-normal">business</i>
              </h1>
              <p className="text-white text-lg font-medium">
                Upgrade to a curated experience to access vetted <br /> talent
                and exclusive tools
              </p>
            </div>
            <ul className="mb-4">
              <li className="font-medium text-base flex pb-3 items-center gap-[10px] text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </li>
              <li className="font-medium text-base flex pb-3 items-center gap-[10px] text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </li>
              <li className="font-medium text-base flex pb-3 items-center gap-[10px] text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </li>
              <li className="font-medium text-base flex pb-3 items-center gap-[10px] text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#62646a"
                    d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"
                  ></path>
                  <path
                    fill="#62646a"
                    d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                  ></path>
                </svg>
                Stick to your budget
              </li>
            </ul>
            <button className="py-3 px-6 w-fit rounded-md font-semibold text-white bg-[#1dbf73] hover:bg-[#1ba163] transition-all duration-200">
              Explore Fiverr Business
            </button>
          </div>
          <div className="w-[55%] flex items-center">
            <img src="./business.webp" alt="" />
          </div>
        </div>
      </div>
      <Slider
        title="Inspiring work made on Fiverr"
        slidesToShow={4}
        arrowsScroll={4}
      >
        {projects.map((project) => (
          <ProjectCard project={project} key={project} />
        ))}
      </Slider>
    </div>
  );
};

export default Home;
