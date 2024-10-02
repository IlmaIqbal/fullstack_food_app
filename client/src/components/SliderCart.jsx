import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { IoBasket } from "../assets/icons";
import { buttonClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemToCart, getAllCartItems } from "../api";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";

// Component for a slider item in the cart
const SliderCart = ({ data, index }) => {
  const user = useSelector((state) => state.user); // Retrieve user information from the state
  const dispatch = useDispatch(); // Retrieve the dispatch function from Redux

  // Function to handle adding an item to the cart
  const sendToCart = () => {
    dispatch(alertSuccess("Added to the Cart")); // Dispatch an action to show a success alert

    // Add the new item to the cart and update the cart items
    addNewItemToCart(user?.user_id, data).then((res) => {
      // Use optional chaining to access user_id
      // Fetch all cart items for the user and update the cart state
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items)); // Dispatch an action to update the cart items
      });

      // Set an interval to dispatch a null alert every 3 seconds
      setInterval(() => {
        dispatch(alertNULL()); // Dispatch an action to show a null alert
      }, 3000);
    });
  };

  return (
    <div
      className=" bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center 
    justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3"
    >
      <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      <div className=" relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-amber-500 flex items-center justify-center gap-1">
          <span className=" text-amber-500">Rs. </span>{" "}
          {parseFloat(data.product_price).toFixed(2)}
        </p>
        <motion.div
          {...buttonClick}
          onClick={sendToCart}
          className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCart;
