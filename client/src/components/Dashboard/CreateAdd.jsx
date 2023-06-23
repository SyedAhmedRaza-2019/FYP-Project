import React, { useEffect, useState } from "react";
import { getLocalItem } from "../../constants";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../Editor";

const CreateAdd = () => {
  const [title, setTitle] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const localUser = getLocalItem("user");
    const user = JSON.parse(localUser);
    console.log(user._id);
    setUserId(user._id);
  }, []);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the property data to the FormData object
    formData.append("title", title);
    formData.append("short_address", shortAddress);
    formData.append("complete_address", completeAddress);
    formData.append("desc", desc);
    formData.append("property_type", propertyType);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      // Send a POST request to the backend API to add the property
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Property added successfully!");
        // localStorage.setItem("user", JSON.stringify(response.user));
        // localStorage.setItem("login", true);
        // props.setIsLogin(true);
        nav("/");
      } else {
        // Display an error message if adding the property failed
        alert("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error(error);
      // Display an error message if there was an issue with the request
      alert("Failed to add property. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="bg-gray-50 pb-20 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className=" bg-white rounded-lg shadow darkk:border md:mt-14 w-[45rem] xl:p-0 darkk:bg-gray-800 darkk:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darkk:text-white">
              Add New Property
              {/* cover name location,type,image,size */}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6 darkk:bg-gray-800"
              action="#"
            >
              <div>
                <label
                  for="title"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="shortAddress"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Short Address
                </label>
                <input
                  type="text"
                  name="shortAddress"
                  id="shortAddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={shortAddress}
                  onChange={(e) => setShortAddress(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="completeAddress"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Compelete Address
                </label>
                <input
                  type="text"
                  name="completeAddress"
                  id="completeAddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={completeAddress}
                  onChange={(e) => setCompleteAddress(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="desc"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <QuillEditor desc={desc} setDesc={setDesc} />

              <div>
                <label
                  for="property_type"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Property Type
                </label>
                <input
                  type="text"
                  name="property_type"
                  id="property_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="size"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="image"
                  className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
                >
                  image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                  placeholder="Red Carpet Real Estate"
                  required=""
                  // value={image}
                  onChange={handleImageChange}
                />
              </div>
              <button
                type="submit"
                className="w-full  bg-green-500 text-slate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darkk:bg-primary-600 darkk:hover:bg-primary-700 darkk:focus:ring-primary-800"
              >
                Add Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdd;
