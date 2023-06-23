import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalItem } from "../../../constants";

const Header = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const goTo = useNavigate();
  const dropdownRef = useRef(null); // Reference to the dropdown element

  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDashboardClick = () => {
    setIsDropdownOpen(false);
    goTo("/dashboard");
  };

  const closeDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleLogout = () => {
    props.setIsLogin(false);
    localStorage.setItem("user", null);
    localStorage.setItem("login", false);
    navigate("/");
  };

  useEffect(() => {
    const user = getLocalItem("user");
    setUserData(user);
  }, []);

  const getUserName = () => {
    const localUser = getLocalItem("user");
    const user = JSON.parse(localUser);
    console.log(user.name);
    return user.name;
  };

  const getEmail = () => {
    const localUser = getLocalItem("user");
    const user = JSON.parse(localUser);
    console.log(user.email);
    return user.email;
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Close the dropdown if the clicked element is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  // Sample data for list items
  const nav = [
    { path: "/", text: "Home" },
    { path: "/about", text: "About" },
    { path: "/properties", text: "Property" },
    { path: "/contact", text: "Contact" },
    { path: "/prediction", text: "Prediction" },
  ];

  const drop = [
    { path: "/dashboard", text: "Dashboard" },
    { path: "/", text: "Signout" },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 ">
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">
         <a href="/" className="text-gray-900 hover:text-green-500"> RENTLY</a>
        </span>
        <ul className="flex ml-4 space-x-4">
          {nav.map((list, index) => (
            <li key={index}>
              <a
                href={list.path}
                className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded"
              >
                {list.text}
              </a>
            </li>
          ))}
        </ul>
        {props.isLogin ? (
          <>
            <div className="flex items-center md:order-2">
              <button
                type="button"
                className="flex mr-3 text-sm bg-green-500 rounded-full md:mr-0"
                id="dropdownInformationButton"
                data-dropdown-toggle="dropdownInformation"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="mr-20 mt-48 z-50 absolute right-0 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow darkk:bg-gray-700 darkk:divide-gray-600"
                  id="user-dropdown"
                  onBlur={closeDropdown}
                  tabIndex={-1}
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 darkk:text-white">
                      {getUserName()}
                    </span>
                    <span className="block text-sm text-gray-500 truncate darkk:text-gray-400">
                      {getEmail()}
                    </span>
                  </div>
                  <ul
                    className="py-2 px-3 space-y-4"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <p
                        onClick={handleDashboardClick}
                        className="cursor-pointer text-sm text-gray-700 hover:text-gray-700 px-1  rounded"
                      >
                        Dashboard
                      </p>
                    </li>

                    <button
                      type="button"
                      className="btn-sm text-slate-900 bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300  font-semibold rounded-lg  text-xs  text-center"
                      onClick={() => handleLogout()}
                    >
                      Log out
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="">
              <Link
                type="button"
                className="bg-green-500 text-slate-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                to="/login"
              >
                {" "}
                Login
              </Link>
              <Link
                type="button"
                className="bg-green-500 text-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                to="/signup"
              >
                {" "}
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
