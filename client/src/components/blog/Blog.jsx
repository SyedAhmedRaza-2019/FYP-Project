import React from "react";
import Back from "../common/Back";
import RecentCard from "../home/recent/RecentCard";
import img from "../images/about.jpg";
import Heading from "../common/Heading";

const Blog = () => {
  return (
    <>
      <section className="blog-out ">
        {/* <Back name="Blog" title="Blog Grid - Our Blogs" cover={img} /> */}
      <h2 className="text-5xl font-bold text-center px-20 pt-20">Properties</h2>
        <div className="container flex justify-center items-center flex-col">
          <RecentCard />
        </div>
      </section>
    </>
  );
};

export default Blog;
