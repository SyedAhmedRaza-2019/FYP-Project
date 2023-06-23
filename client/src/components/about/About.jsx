import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "./../images/about.jpg"

const About = () => {
  return (
    <>
      <section className="my-40">
        {/* <Back name="About Us" title="About Us - Who We Are?"  /> */}
        {/* <Back name="About Us" title="About Us - Whloo We Are?" /> */}
        <div className="container flex flex-col md:flex-row">
          <div className="left row ">
           
            <div className="div w-4/5 px-1"> <Heading
              title="Our Agency Story"
              subtitle="Check out our company story and work process"
             
            /></div> 
       
           
<br />
          <p className="ps-4">  <p className=" pe-40  ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p> <br /> <br />
            <p className="pe-40 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p> <br /><br />
            <button className="bg-green-500">More About Us</button></p>
           
           
          </div>
          <div className="right row">
            <img src="./immio.jpg" alt="" className="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

