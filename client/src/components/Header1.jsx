import React, { useRef, useState } from "react";
import { Link as LinkRoll } from "react-scroll";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
import { FaBars, FaTimes } from "react-icons/fa";

import "../assets/css/Nav.css";

const Header1 = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  // const home = useRef();
  // const menu = useRef();
  // const service = useRef();
  // const contact = useRef();

  // const scrollHandler = (eleRef) => {
  //   console.log(eleRef.current);
  //   window.scrollTo({ top: eleRef.current.offsetTo, behavior: "smooth" });
  // };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-6 py-2">
      <NavLink to={"/"} className="flex items-center justify-center gap-0">
        <img src={Logo} className="w-24" alt="" />
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          {/* <NavLink
            //onClick={() => scrollHandler(home)}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isActiveStyles
            }
          > */}
          <LinkRoll
            className="cursor-pointer text-textColor transition-all ease-in-out text-2xl hover:text-red-500"
            to={"hm"}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Home
          </LinkRoll>
          {/* </NavLink> */}

          <LinkRoll
            className="cursor-pointer text-textColor transition-all ease-in-out text-2xl hover:text-red-500"
            to={"menu"}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Menu
          </LinkRoll>

          <LinkRoll
            className="cursor-pointer text-textColor transition-all ease-in-out text-2xl hover:text-red-500"
            to={"ser"}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Services
          </LinkRoll>

          <LinkRoll
            className="cursor-pointer text-textColor transition-all ease-in-out text-2xl hover:text-red-500"
            to={"cont"}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}

            // onClick={closeMenu}
          >
            Contact Us
          </LinkRoll>
        </ul>

        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-textColor" />
          {cart?.length > 0 && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                >
                  {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                    <Link
                      className="hover:text-red-500 text-xl text-textColor"
                      to={"/dashboard/home"}
                    >
                      Dashboard
                    </Link>
                  )}

                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>

                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />

                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className=" group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                  >
                    <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                    <p className="text-textColor text-xl group-hover:text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header1;
