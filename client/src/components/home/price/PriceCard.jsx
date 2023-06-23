import React from "react";
import { price } from "../../data/Data";

const PriceCard = () => {
  return (
    <>
      <div className="content flex mt-8">
        {price.map((item, index) => (
          <div className="box shadow" key={index}>
            <div className="topbtn">
              <button className="btn3">{item.best}</button>
            </div>
            <h3 className="text-xl">{item.plan}</h3>
            <h1 className="text-5xl">
              <span className="text-2xl font-semibold">$</span>
              {item.price}
            </h1>
            <p>{item.ptext}</p>

            <ul>
              {item.list.map((val, index) => {
                const { icon, text, change } = val;
                return (
                  <li key={index} className="flex items-center">
                    <label
                      className={`w-8 h-8 rounded-full mr-4 ${
                        change === "color" ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"
                      }`}
                    >
                      {icon}
                    </label>
                    <p>{text}</p>
                  </li>
                );
              })}
            </ul>
            <button
              className={`btn5 w-full ${
                item.plan === "Standard" ? "bg-green-500 text-white" : "bg-white text-green-500"
              }`}
            >
              Start {item.plan}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PriceCard;
