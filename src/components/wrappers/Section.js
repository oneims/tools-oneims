import React from "react";

const Section = ({ children, className, id }) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

export default Section;

Section.defaultProps = {
  className: "BLOCK__default",
};
