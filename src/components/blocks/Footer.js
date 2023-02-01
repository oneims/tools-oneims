import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="py-3 THEME__border-top-light">
        <div className="container text-center">
          <span className="THEME__font-size-0n8">
            ©{new Date().getFullYear()} OneIMS. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
