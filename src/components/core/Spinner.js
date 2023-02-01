import React from "react";

const Spinner = (props) => {
  return (
    <>
      <div
        className={`MODULE__spinner ${props.button ? `MODULE__spinner-button ms-3` : ``} ${
          props.white ? `MODULE__spinner-white` : ``
        } ${props.xs ? `MODULE__spinner-xs` : ``}`}
      >
        <div className="showbox">
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                className="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth={`${props.button ? `4` : `2`}`}
                strokeMiterlimit="10"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
