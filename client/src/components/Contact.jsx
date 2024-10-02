import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7222i9m",
        "template_npnhlxo",
        form.current,
        "ZzkAOb5tO-OpFcdJN"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message send");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="section w-full flex items-center justify-between" id="cont">
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="text-2xl text-headingColor font-bold">
          Contact Us
          <div className="w-40 h-1 rounded-md bg-amber-500"></div>
        </p>
        <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
          <div className=" border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="user_name"
                placeHolder="Enter Your Name"
                className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 gap-y-3 mb-8"
              />
              <input
                type="email"
                name="user_email"
                placeHolder="Enter Your Email"
                className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 gap-y-6 mb-8"
              />{" "}
              <textarea
                type="text"
                placeHolder="   Enter Your Message"
                className="w-full h-370 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 gap-3 mb-6"
                name="message"
              />{" "}
              <motion.button
                type="submit"
                className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
              >
                Send
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  //stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
      />
    </>
  );
};

export default Contact;
