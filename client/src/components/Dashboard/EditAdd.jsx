import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuillEditor from "../Editor";

const EditAdd = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    short_address: "",
    complete_address: "",
    desc: "",
    property_type: "",
    size: "",
    price: "",
  });
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDesc = (e) => {
    setFormData({ ...formData, desc: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          nav("/");
        }
        // Handle the response from the backend
        //console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  useEffect(() => {
    const getbyId = () => {
      fetch(`http://localhost:5000/property/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          const { desc, ...data2 } = data.data;

          setContent(desc);
          console.log(desc, data2);
          setFormData(data2);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    };
    getbyId();
  }, []);

  return (
    <div className="bg-gray-50 pb-20 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className=" bg-white rounded-lg shadow darkk:border md:mt-14 w-[45rem] xl:p-0 darkk:bg-gray-800 darkk:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darkk:text-white">
      Update Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="short_address"
          >
            Short Address:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
            type="text"
            id="short_address"
            name="short_address"
            value={formData.short_address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="complete_address"
          >
            Complete Address:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
            type="text"
            id="complete_address"
            name="complete_address"
            value={formData.complete_address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="desc"
          >
            Description:
          </label>
          {/* <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500" 
            id="desc"
            name="desc"
            value={desc}
            onChange={handleInputChange}
          ></input> */}
          <QuillEditor desc={content} setDesc={setContent} />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="property_type"
          >
            Property Type:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
            type="text"
            id="property_type"
            name="property_type"
            value={formData.property_type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="size"
          >
            Size:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 darkk:text-white"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Update Property
        </button>
      </form>
    </div></div></div></div>
  );
};

export default EditAdd;
