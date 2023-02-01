import React from "react";
import Link from "next/link";
import Spinner from "@/components/core/Spinner";

const Button = ({
  wrapperClassName,
  className,
  variant,
  children,
  type,
  destination,
  pageRefresh,
  isLoading,
  onClick,
}) => {
  return (
    <>
      {destination ? (
        <div className={`MODULE__button ${wrapperClassName}`}>
          {pageRefresh ? (
            <a href={destination}>
              <button type={type} className={`THEME__button THEME__button-${variant} ${className}`}>
                {children}
              </button>
            </a>
          ) : (
            <Link href={destination}>
              <button type={type} className={`THEME__button THEME__button-${variant} ${className}`}>
                {children}
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className={`MODULE__button ${wrapperClassName}`}>
          <button
            onClick={onClick}
            type={type}
            className={`THEME__button THEME__button-${variant} ${className} ${
              isLoading &&
              "THEME__opacity-70 pe-none d-flex align-items-center justify-content-center"
            }`}
          >
            {children}
            {isLoading && <Spinner button white={variant !== `transparent`} />}
          </button>
        </div>
      )}
    </>
  );
};

export default Button;

Button.defaultProps = {
  variant: "primary",
  type: "button",
  children: "Button Text",
  type: "button",
};
