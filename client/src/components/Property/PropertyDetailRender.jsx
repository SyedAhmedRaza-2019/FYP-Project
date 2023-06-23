import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { list } from "../data/Data";
import { useEffect } from "react";
import ContactForm from "./ContactForm";

function PropertyDetailRender(props) {
  const property = props.property;

  return (
    <div className="  px-20 mb-12 ">
      {property ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">
           Title: {property.title}{property.id}
          </h2>
          <div className="flex space-x-20 my-16">
          <div className="img-cont w-4/6 ">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-min"
            />
          </div>
          <div className="p-8 rounded border shadow bg-neutral-50  w-96">
            <p className="py-4  font-semibold"> Price : {property.price}</p>
            <p className="py-4 font-semibold">Property Type : {property.property_type}</p>
            <p className="py-4 font-semibold">Size : {property.size}</p>
            <p className="py-4 font-semibold">Address : {property.complete_address}</p>
            </div>

            </div>
            <div>

            <div className="desc font-semibold">
            <p className="py-4 font-semibold">Address : {property.complete_address}</p>
            Description: 
            </div>
            <div dangerouslySetInnerHTML={{ __html: property.desc }}></div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default PropertyDetailRender;
