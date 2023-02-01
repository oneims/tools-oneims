import React from "react";
import Container from "@/components/wrappers/Container";

const Header = () => {
  return (
    <>
      <header className="BLOCK__app-header py-3 THEME__bg-app-dark">
        <Container fluid>
          <div className="BLOCK__app-header__wrapper">
            <div className="BLOCK__app-header__logo-wrapper">
              <a href={`/`}>
                <img src="/white.svg" alt="OneIMS Logo Inverted" />
              </a>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
