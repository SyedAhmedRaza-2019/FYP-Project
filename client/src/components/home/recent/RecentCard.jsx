import React, { useEffect, useState } from "react";
import { list } from "../../data/Data";
import { Link } from "react-router-dom";
import { getLocalItem } from "../../../constants";

const RecentCard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties();
  }, []);

  // /userproperty/:id

  const getAllProperties = async () => {
    fetch(`http://localhost:5000/properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          setProperties(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {/* <div classNameName="content grid grid-cols-3 gap-4 mt-8">
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val;
          return (
            <Link to={`/property/${val.id}`} key={index}>
              <div classNameName="box shadow flex flex-col justify-center items-center p-4">
                <div classNameName="img">
                  <img src={cover} alt="" classNameName="w-full" />
                </div>
                <div classNameName="text text-center mt-4">
                  <div classNameName="category flex items-center">
                    <span
                      classNameName={`px-2 py-1 rounded font-semibold text-sm ${
                        category === "For Sale" ? "bg-green-200 text-green-600" : "bg-orange-200 text-orange-600"
                      }`}
                    >
                      {category}
                    </span>
                    <i classNameName="fa fa-heart ml-2"></i>
                  </div>
                  <h4 classNameName="text-lg font-medium">{name}</h4>
                  <p classNameName="text-gray-500">
                    <i classNameName="fa fa-location-dot"></i> {location}
                  </p>
                </div>
                <div classNameName="button flex justify-between items-center mt-4">
                  <div>
                    <button classNameName="btn2 ">{price}</button>{" "}
                    <label htmlFor="">/sqft</label>
                  </div>
                  <span classNameName="pl-4">{type}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>  */}

      <div className="content grid grid-cols-3 gap-3 m-16">
        {properties.length > 0 &&
          properties.map((val, index) => {
            const {
              image,
              title,
              short_address,
              price,
              property_type,
              size,
              _id,
            } = val;
            return (
              <Link to={`/property/${val._id}`} key={index}>
                <div className="max-w-sm rounded overflow-hidden bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-100 m-5">
                  <div className="h-56">
                    <img
                      className="w-full h-full object-cover p-2 "
                      src={image}
                      alt="Property Image"
                    />
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-gray-700">{property_type}</div>
                    <p className="text-gray-700 text-base">{short_address}</p>
                    <p className="text-gray-700 text-base mt-4">{title}</p>
                  </div>
                  <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Type:  {property_type}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      Size: {size}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700">
                     Price: {price}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default RecentCard;


