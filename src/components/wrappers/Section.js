import React from "react";

const Section = ({ children, className }) => {
  return <section className={className}>{children}</section>;
};

export default Section;

Section.defaultProps = {
  className: "BLOCK__default",
};
