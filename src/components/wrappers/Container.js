import React from "react";

const Container = ({ children, className, fluid }) => {
  return (
    <div
      className={`${fluid ? `container-fluid px-4` : `container`} ${
        className ? ` ` + className : ``
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
