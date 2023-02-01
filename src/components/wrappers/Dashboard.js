import React from "react";
import Header from "@/components/blocks/Header";
import Main from "@/components/wrappers/Main";
import Footer from "@/components/blocks/Footer";

const Dashboard = ({ children, segmentView }) => {
  return (
    <>
      {segmentView ? (
        <div className="BLOCK__segment-layout">
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      ) : (
        <>
          <Header />
          <Main style={{ minHeight: "100vh" }}>{children}</Main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Dashboard;
