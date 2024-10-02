import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { IoFastFood } from "../assets/icons";
import { statuses } from "../utils/styles";
import SliderCart from "./SliderCart";

const FilterSection = () => {
  const [category, setCategory] = useState("special");
  const products = useSelector((state) => state.products);
  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div
        className="section w-full flex items-center justify-between"
        id="menu"
      >
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Our Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-amber-500"></div>
        </div>
      </div>

      <div className="w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <FilterCart
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
      </div>

      <div className=" w-full flex items-center justify-evenly flex-wrap gap-4 mt-12">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => <SliderCart key={i} data={data} index={i} />)}
      </div>
    </motion.div>
  );
};
export const FilterCart = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      onClick={() => setCategory(data.category)}
      className={`ground w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${
        category === data.category ? " bg-amber-500" : " bg-primary"
      } hover:bg-amber-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary
  ${category === data.category ? " bg-primary" : " bg-amber-500"}`}
      >
        <IoFastFood
          className={`${
            category === data.category ? " text-amber-500" : " text-primary"
          } group-hover:text-amber-500`}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          category === data.category ? "text-primary" : " text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
