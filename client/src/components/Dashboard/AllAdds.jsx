import React from 'react'
import { list } from "../data/Data";
import { Link } from "react-router-dom";
const AllAdds = () => {
  return (
    <div >
       <div classNameName="content grid  gap-6  m-96">
       <h1 classNameName='text-center '>YOUR ADDS</h1>
      {list.map((val, index) => {
          const { cover, category, location, name, price, type,size } = val;
          return (
         
      <div className="max-w-full  p-5 flex rounded  overflow-hidden shadow-lg m-7">
      <div className="">
      <img className="w-72    border rounded-lg" src={cover} alt="Property Image"/>
      </div>

  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{category}</div>
    <p className="text-gray-700 text-base">{location}</p>
    <p className="text-gray-700 text-base mt-4">{name}</p>
  </div>
  <div className="px-6 py-4">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{type}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Size: {size}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700">{price}</span>
  </div>
  </div>
  )
 
      })} 
      </div>
    </div>
  )
}

export default AllAdds
