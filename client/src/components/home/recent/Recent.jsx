import React from "react";
import Heading from "../../common/Heading";
import RecentCard from "./RecentCard";
import { Link } from "react-router-dom";

const Recent = () => {
  return (
    <>
      <section className="recent py-10 flex justify-center items-center flex-col">
        <div className="container">
          <Heading
            title="Recent Property Listed"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            className="text-center"
          />
          <RecentCard />
        </div>
<Link to="/properties">
        <button className=" mt-10 bg-green-500 text-slate-900">Explore more</button></Link>
      </section>
    </>
  );
};

export default Recent;

