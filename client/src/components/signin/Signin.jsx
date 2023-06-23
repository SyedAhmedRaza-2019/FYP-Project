import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../api";
import axios from "axios";
const Signin = (props) => {
  useEffect(() => {
    // console.log(props);

    const login = localStorage.getItem("login");
    // console.log(login);

    console.log(login);
    if (login == "true") {
      nav("/");
    }
  }, []);

  const nav = useNavigate();
  const __init = {
    email: "bruce@gmail.com",
    password: "bruce",
  };

  const [credentials, setCredentials] = useState(__init);

  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Credentials: ", credentials);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success == false) {
          alert("invalid password");
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("login", true);
          props.setIsLogin(true);
          nav("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <section className="bg-gray-50 darkk:bg-gray-900">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:m-28 sm:max-w-md xl:p-0 darkk:bg-gray-800 darkk:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-20 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl -mb-5">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-8 darkk:bg-gray-800"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={credentials.email}
                  onChange={changeCredentials}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  required=""
                  value={credentials.password}
                  onChange={changeCredentials}
                />
              </div>
              <button
                type="submit"
                onClick={(e) => handleLogin(e)}
                className="w-full bg-green-500  text-dark bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darkk:bg-primary-600 darkk:hover:bg-primary-700 darkk:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 darkk:text-gray-400">
                Don't have an account yet?{" "}
                <Link to="/signup">
                  <a className="font-medium dark:text-blue-700 hover:text-blue-800 hover:underline ">
                    Sign up
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
