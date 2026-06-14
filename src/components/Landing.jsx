import React from "react";
import SearchBar from "./SearchBar";

const Landing = () => {
  return (
    <section id="header">
      <div className="container">
        <div className="row">
          <div className="header__welcome--wrapper">
            <h1 className="header__welcome--text">
              Welcome to <span className="text__color--red">KMDB</span>
            </h1>
            <p className="header__welcome--para">Search for your favorite movies!</p>
          </div>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Landing;
