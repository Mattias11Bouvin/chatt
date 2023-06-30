import React from "react";
import Header from "./Header";
import "./LandingPage.css";
import Footer from "./Footer";
import Section from "./Section";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Section />
      <Footer />
    </div>
  );
};

export default LandingPage;
