import React from "react";
import logo from "../assets/TMDB-logo-primary.svg";

const Nav = () => {
  return (
    <nav>
      <div className="nav__logo--wrapper">
        <h1 className="nav__logo--text text__color--red">KMDB</h1>
      </div>
      <ul className="nav__link--list" >
        <li className="nav__link">
          <a href="/" className="nav__link--anchor">
            About
          </a>
        </li>
        <li className="nav__link">
          <a href="/" className="nav__link--anchor">
            API Used
          </a>
        </li>
        <li className="nav__link">
          <a href="/" className="nav__link--anchor">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
