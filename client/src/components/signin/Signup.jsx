import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
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
    email: "wayne@gmail.com",
    name: "wayne",
    cnic: "123421344",
    password: "wayne",
  };

  const [credentials, setCredentials] = useState(__init);

  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Credentials: ", credentials);

    fetch("http://localhost:5000/register", {
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
          alert(data.message);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("login", true);
          props.setIsLogin(true);
          nav("/");
        }
      })
      .catch((error) => {
        console.error("eror: ", error);
      });
  };

  return (
    <div className="bg-gray-50 darkk:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow darkk:border md:mt-4 sm:max-w-md xl:p-0 darkk:bg-gray-800 darkk:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-10 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darkk:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6 darkk:bg-gray-800" action="#">
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Your username
                </label>
                <input
                  type="username"
                  name="name"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Abdul Moiz"
                  required=""
                  value={credentials.name}
                  onChange={changeCredentials}
                />
              </div>
              <div>
                <label
                  for="cnic"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Your cnic
                </label>
                <input
                  type="cnic"
                  name="cnic"
                  id="cnic"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="41303-7575425-5"
                  required=""
                  value={credentials.cnic}
                  onChange={changeCredentials}
                />
              </div>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="moizrao7@gmail.com"
                  required=""
                  value={credentials.email}
                  onChange={changeCredentials}
                />
              </div>
              <div>
                <label
                  for="password"
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
                className="w-full bg-green-500   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={(e) => handleRegister(e)}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 darkk:text-gray-400">
                Already have an account?{" "}
                <Link to="/login">
                  <a
                    href="#"
                    className="font-medium  hover:underline dark:text-blue-700 hover:text-blue-800"
                  >
                    Login here
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
