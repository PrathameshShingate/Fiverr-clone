import Slider from "infinite-react-carousel";

const ServicesSlider = ({ children, slidesToShow, arrowsScroll, title }) => {
  return (
    <div className="slider flex flex-col gap-6 items-center justify-center py-24">
      <h2 className="text-left max-w-[1440px] w-full px-8 text-[#404145] text-[32px] font-bold">
        {title}
      </h2>
      <Slider
        className="max-w-[1440px] w-full relative pr-6 2xl:pr-4"
        slidesToShow={slidesToShow}
        arrowsScroll={arrowsScroll}
      >
        {children}
      </Slider>
    </div>
  );
};

export default ServicesSlider;
