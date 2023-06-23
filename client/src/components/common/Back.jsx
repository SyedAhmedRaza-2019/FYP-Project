import React from "react"
const Back = ({ name, title, props }) => {
  // Check if the `cover` prop is missing or invalid
  if (!props || !props.image) {
    return null; // Return null or provide a fallback UI when the prop is missing or invalid
  }

  return (
    <div className="back bg-slate-950">
      <div className="container">
        <span>{name}</span>
        <h1>{title}</h1>
      </div>
      <img src={props.image} alt="Description" />
    </div>
  );
};

export default Back;

