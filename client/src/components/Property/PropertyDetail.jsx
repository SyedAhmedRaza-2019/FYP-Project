import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { list } from "../data/Data";
import { useEffect } from "react";
import ContactForm from "./ContactForm";
import PropertyDetailRender from "./PropertyDetailRender";

function PropertyDetail() {
  const params = useParams();
  const [property, setproperty] = useState({});
  useEffect(() => {
    getPropertyDetail();
  }, []);

  const getPropertyDetail = async () => {
    fetch(`http://localhost:5000/property/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          setproperty(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col m-20">
      <PropertyDetailRender property={property} />

      <ContactForm propertyOwnerId={property.userId} />
    </div>
  );
  
}

export default PropertyDetail;
