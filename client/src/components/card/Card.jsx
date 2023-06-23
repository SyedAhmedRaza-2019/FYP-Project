import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Card = (data) => {
    const {
        image,
        title,
        short_address,
        price,
        property_type,
        size,
        _id,
      } = data.data;

      const nav = useNavigate()

      const handleDelete = () => {
        fetch(`http://localhost:5000/delete/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: _id }), // Pass _id as JSON in the request body
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success === true) {
              nav('/')
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

  return (
    <div className="max-w-full  p-5 my-16 flex rounded  overflow-hidden shadow-lg " >
                  <div className="">
                    <img
                      className="w-72    border rounded-lg"
                      src={image}
                      alt="Property Image"
                    />
                  </div>

                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      For {property_type}
                    </div>

                    <p className="text-gray-700 text-base">{short_address}</p>
                    <p className="text-gray-700 text-base mt-4">{title}</p>
                  </div>
                  <div className="px-6 py-4 ">
                    <div className="flex justify-end -mt-6 mb-3">
                      <Link to={`/editadd/${_id}`}>
                        <i className="fa-solid fa-pen-to-square pe-4 text-blue-500 hover:text-blue-700 " />
                      </Link>
                    
                      <i className="fa-solid fa-trash pe-4 text-red-500 hover:text-red-700 cursor-pointer" onClick={handleDelete} />
                    </div>
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
  )
}

export default Card