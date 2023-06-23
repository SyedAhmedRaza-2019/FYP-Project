import React, { useState } from "react";
import { getLocalItem } from "../../constants";

function ContactForm(props) {
  const [status, setIsStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyOwnerId: props.propertyOwnerId,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here

    fetch(`http://localhost:5000/message/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        propertyOwnerId: props.propertyOwnerId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          setIsStatus(data.msg);
        } else {
          setIsStatus(data.msg);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(formData);
    // Reset the form fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="border ms-10    border-slate-300   p-6 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-50">
      {status !== null && (
        <div
          className="flex justify-center p-4 mb-4 items-start text-sm text-green-800 rounded-lg bg-green-50 "
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>{status}</div>
        </div>
      )}
      <h2 className="owner-name font-semibold">Query Form</h2>
      <form onSubmit={handleSubmit} className="dark:bg-neutral-50 flex">
        <div className="form-group  pe-10">
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Karan Kishore"
            value={formData.name}
            onChange={handleChange}
            className="border w-32 border-gray-300 ps-4 py-2 mt-2 rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="form-group  pe-10">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border w-36 border-gray-300 ps-4 py-2 mt-2 rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="form-group  pe-10">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="024546565"
            value={formData.phone}
            onChange={handleChange}
            className="w-28 border-gray-900 ps-4 py-2 mt-2 rounded-md focus:outline-none "
          />
        </div>
        <div className="form-group pe-10">
          <label htmlFor="message" className="block mb-2  text-sm font-medium">
            Your message
          </label>
          <input
            id="message"
            rows="4"
            name="message"
            className="block   p-6 w-full text-sm text-gray-900 rounded-lg dark:bg-neutral-50 border-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What do you want to ask..."
            value={formData.message}
            onChange={handleChange}
          ></input>
        </div>
        <button
          type="submit"
          className="text-xs font-semibold bg-green-500 hover:border-green-500 text-slate-950 px-4 py-2 mt-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
