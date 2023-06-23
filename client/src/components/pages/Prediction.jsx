import React, { useEffect, useState } from "react";

import axios from "axios";
import { inWords, separate } from "indian-commerce-numbers";

const BACKEND = "http://127.0.0.1:8000/result/";

function Prediction() {
  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  const INIT = {
    area: "",
    baths: 0,
    beds: 0,
    bathrooms: 0,
    diningRoom: 0,
    distanceFromAirport: 1,
    drawingRoom: 0,
    electricityBackup: 1,
    flooring: 1,
    floors: 0,
    kidsPlayArea: 0,
    kitchens: 0,
    loungeOrSittingRoom: 0,
    studyRoom: 0,
    wasteDisposal: 1,
    pricePerSqYard: 0,
    flat: 0,
    house: 0,
    lowerPortion: 0,
    penthouse: 0,
    room: 0,
    upperPortion: 0,
    bahriaTownKarachi: 0,
    cantt: 0,
    clifton: 0,
    dhaDefence: 0,
    federalBArea: 0,
    gadapTown: 0,
    gulistanEJauhar: 0,
    gulshanEIqbalTown: 0,
    jamshedTown: 0,
    malir: 0,
    northNazimabad: 0,
    others: 0,
    scheme33: 0,
  };

  const [data, setData] = useState(INIT);

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const changeSecondary = (e) => {
    setData({
      ...data,
      [e.target.name]: parseInt(e.target.value) === 1 ? 0 : 1,
    });
  };

  const changeType = (e) => {
    let temp = {
      flat: 0,
      house: 0,
      lowerPortion: 0,
      penthouse: 0,
      room: 0,
      upperPortion: 0,
    };

    temp = {
      ...temp,
      [e.target.value]: 1,
    };

    setData({
      ...data,
      ...temp,
    });
  };

  const changeLocation = (e) => {
    let temp = {
      bahriaTownKarachi: 0,
      cantt: 0,
      clifton: 0,
      dhaDefence: 0,
      federalBArea: 0,
      gadapTown: 0,
      gulistanEJauhar: 0,
      gulshanEIqbalTown: 0,
      jamshedTown: 0,
      malir: 0,
      northNazimabad: 0,
      others: 0,
      scheme33: 0,
    };

    temp = {
      ...temp,
      [e.target.value]: 1,
    };

    setData({
      ...data,
      ...temp,
    });
  };

  const calculateRent = (predictedPrice) => {
    // Adjust the rent calculation based on your specific requirements
    const rentPercentage = 0.002; // 2% of the predicted price
    const rent = predictedPrice * rentPercentage;
    return rent;
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      // Convert to crores
      return (price / 10000000).toFixed(2) + " Cr";
    } else if (price >= 100000) {
      // Convert to lakhs
      return (price / 100000).toFixed(2) + " Lakh";
    } else {
      return price.toLocaleString() + " PKR";
    }
  };

  const setMessage = (text, color) => {
    let error = document.getElementById("error");
    error.innerHTML = text;
    error.classList.add("text-" + color);
    error.style.display = "block";
  };

  const resetMessage = () => {
    let error = document.getElementById("error");
    error.innerText = "";
    error.style.display = "none";
    error.classList.remove("text-danger");
    error.classList.remove("text-success");
  };

  const validate = () => {
    resetMessage();
    if (data.area !== "") {
      let temp = [
        "Flat",
        "House",
        "Lower Portion",
        "Penthouse",
        "Room",
        "Upper Portion",
      ];
      let count = 0;
      temp.map((one, i) => {
        if (data[camelize(one)] === 1) {
          count++;
        }
      });
      if (count > 0) {
        let temp = [
          "Bahria Town Karachi",
          "Cantt",
          "Clifton",
          "Dha Defence",
          "Federal B Area",
          "Gadap Town",
          "Gulistan e Jauhar",
          "Gulshan e Iqbal Town",
          "Jamshed Town",
          "Malir",
          "North Nazimabad",
          "Others",
          "Scheme 33",
        ];
        let count = 0;
        temp.map((one, i) => {
          if (data[camelize(one)] === 1) {
            count++;
          }
        });
        if (count > 0) {
          if (
            data.baths !== "0" &&
            data.beds !== "0" &&
            data.bathrooms !== "0" &&
            data.flooring !== "0" &&
            data.floors !== "0" &&
            data.kitchens !== "0" &&
            data.pricePerSqYard !== "0"
          ) {
            return true;
          } else {
            setMessage("Fill secondary inputs!", "danger");
          }
        } else {
          setMessage("Select location!", "danger");
        }
      } else {
        setMessage("Select type!", "danger");
      }
    } else {
      setMessage("Fill area!", "danger");
    }
  };

  const [result, setResult] = useState("");

  const predict = async () => {
    console.log("Data: ", data);
    if (validate()) {
      await axios
        .post(BACKEND, data)
        .then((responce) => {
          if (responce.data) {
            console.log(responce);
            setResult(responce.data?.result);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const loadDummy = () => {
    setData({
      area: "152",
      baths: "4",
      beds: "3",
      bathrooms: "4",
      diningRoom: 1,
      distanceFromAirport: 1,
      drawingRoom: 0,
      electricityBackup: 1,
      flooring: 1,
      floors: "1",
      kidsPlayArea: 1,
      kitchens: "1",
      loungeOrSittingRoom: 1,
      studyRoom: 1,
      wasteDisposal: 1,
      pricePerSqYard: "121710",
      flat: 0,
      house: 1,
      lowerPortion: 0,
      penthouse: 0,
      room: 0,
      upperPortion: 0,
      bahriaTownKarachi: 0,
      cantt: 0,
      clifton: 0,
      dhaDefence: 1,
      federalBArea: 0,
      gadapTown: 0,
      gulistanEJauhar: 0,
      gulshanEIqbalTown: 0,
      jamshedTown: 0,
      malir: 0,
      northNazimabad: 0,
      others: 0,
      scheme33: 0,
    });
  };

  return (
    <div className="bg-gray-50 pb-20 ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      <div className=" bg-white rounded-lg shadow darkk:border md:mt-14 w-[53rem] xl:p-0 darkk:bg-gray-800 darkk:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold  tracking-tight text-gray-900 md:text-2xl darkk:text-white">
            Price Predictor
            {/* cover name location,type,image,size */}
          </h1>
                <div className="col-lg-4 col-sm-12">
                  <input
                    type="number"
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    placeholder="Area (Sq Yards)"
                    value={data.area}
                    name="area"
                    onChange={changeData}
                  />
                </div>
                <div className="col-lg-4 col-sm-12">
                  <select
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    onChange={changeType}
                  >
                    <option selected disabled>
                      Select Type
                    </option>
                    {[
                      "Flat",
                      "House",
                      "Lower Portion",
                      "Penthouse",
                      "Room",
                      "Upper Portion",
                    ].map((one, i) => {
                      return (
                        <option
                          key={one}
                          value={camelize(one)}
                          selected={data[camelize(one)] === 1 ? true : false}
                        >
                          {one}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-4 col-sm-12">
                  <select
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    onChange={changeLocation}
                  >
                    <option selected disabled>
                      Select Location
                    </option>
                    {[
                      "Cantt",
                      "Clifton",
                      "Dha Defence",
                      "Federal B Area",
                      "Gadap Town",
                      "Gulistan e Jauhar",
                      "Gulshan e Iqbal Town",
                      "Jamshed Town",
                      "Malir",
                      "North Nazimabad",
                      "Others",
                      "Scheme 33",
                    ].map((one, i) => {
                      return (
                        <option
                          key={one}
                          value={camelize(one)}
                          selected={data[camelize(one)] === 1 ? true : false}
                        >
                          {one}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <br />
              <span className=" font-semibold text-muted p-6 space-y-4 md:space-y-6 sm:p-8">Secondary Inputs</span>
              <div className="row my-3 p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="col-lg-4 col-sm-12">
                  <label class="form-label">Baths</label>
                  <input
                    type="number"
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    placeholder="Baths"
                    value={data.baths}
                    name="baths"
                    onChange={changeData}
                  />
                </div>
                <div className="col-lg-4 col-sm-12">
                  <label class="form-label">Beds</label>
                  <input
                    type="number"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    placeholder="Beds"
                    value={data.beds}
                    name="beds"
                    onChange={changeData}
                  />
                </div>
                <div className="col-lg-4 col-sm-12">
                  <label class="form-label">Bathrooms</label>
                  <input
                    type="number"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    placeholder="Bathrooms"
                    value={data.bathrooms}
                    name="bathrooms"
                    onChange={changeData}
                  />
                </div>
             
              
                <div className="col-lg-4 col-sm-12 ">
                  <label class="form-label">Floors</label>
                  <input
                    type="number"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    placeholder="Floors"
                    value={data.floors}
                    name="floors"
                    onChange={changeData}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 ">
                  <label class="form-label">Kitchens</label>
                  <input
                    type="number"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    placeholder="Kitchens"
                    value={data.kitchens}
                    name="kitchens"
                    onChange={changeData}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 ">
                  <label class="form-label">Price Per Sq Yard</label>
                  <input
                    type="number"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 darkk:bg-gray-700 darkk:border-gray-600 darkk:placeholder-gray-400 darkk:text-white darkk:focus:ring-blue-500 darkk:focus:border-blue-500"
                    placeholder="Price Per Sq Yard"
                    value={data.pricePerSqYard}
                    name="pricePerSqYard"
                    onChange={changeData}
                  />
                </div>
              </div>
              <br />
              <span className="font-semibold text-muted p-6 space-y-4 md:space-y-6 sm:p-8">Optional Inputs</span>
              <div className="badges  flex flex-wrap gap-3 p-6  sm:p-8">
                {[
                  "dining room",
                  "distance from airport",
                  "drawing room",
                  "electricity backup",
                  "flooring",
                  "kids play area",
                  "lounge or sitting room",
                  "study room",
                  "waste disposal",
                ].map((one, i) => {
                  return (
                    <span
                      className={` badge rounded-pill text--white ${
                        data[camelize(one)] === 0
                          ? "text-white bg-[#122947] hover:bg-[#20426e] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          : "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      } px-3 py-2`}
                      role="button"
                      onClick={() => {
                        changeSecondary({
                          target: {
                            name: camelize(one),
                            value: data[camelize(one)],
                          },
                        });
                      }}
                    >
                      {one}
                    </span>
                  );
                })}
              </div>
              {result !== "" ? (
                <div className="mt-4 text-center">
                  <div className="text-gray-500 font-semibold uppercase tracking-wide">
                    Rent
                  </div>
                  <div className="text-4xl font-bold text-red-500 mt-2">
                    {Math.round(calculateRent(result)).toLocaleString()}{" "}
                    PKR/month
                  </div>
                  <div className="mt-6">
                    <div className="text-gray-500 font-semibold uppercase tracking-wide">
                      Predicted Price
                    </div>
                    <div className="flex space-x-3 items-end justify-center">
                      <div className="text-4xl font-bold text-blue-950 mt-2">
                        {separate(result)}
                      </div>
                      <div className="text-md text-gray-600">
                        ({formatPrice(result)})
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <br />
              <span
                id="error"
                className="my-3 d-block text-center"
                style={{ display: "none" }}
              ></span>
              <div className="w-100 text-center mt-4">
                {result !== "" ? (
                  <>
                    <button
                      onClick={() => {
                        setResult("");
                        // setData(INIT);
                      }}
                      className="text-white bg-gray-800 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              00 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-12"
                    >
                      Reset
                    </button>
                  </>
                ) : (
                  <div className="mb-12">
                    <button
                      onClick={predict}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      disabled={result !== "" ? true : false}
                    >
                      Predict Price
                    </button>
                    <button
                      onClick={loadDummy}
                      className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      disabled={result !== "" ? true : false}
                    >
                      Load Dummy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      
  );
}

export default Prediction;
