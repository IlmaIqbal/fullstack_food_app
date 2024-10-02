import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCart } from "../components";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [special, setSpecial] = useState(null);
  useEffect(() => {
    setSpecial(products?.filter((data) => data.product_category === "special"));
    console.log(special);
  }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {special &&
          special.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCart key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
