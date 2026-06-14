import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__section">
          <p className="footer__name">Kam Koding</p>
          <p className="footer__credit">Designed & Built by Kamarie Quinones</p>
        </div>

        <div className="footer__section">
          <ul className="footer__links">
            <li><a href="/" className="footer__link">About</a></li>
            <li><a href="/" className="footer__link">Contact</a></li>
            <li><a href="https://github.com/KamKoding" target="_blank" rel="noreferrer" className="footer__link">GitHub</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <p className="footer__tmdb--text">Powered by</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Tmdb-312x276-logo.png"
            alt="TMDB Logo"
            className="footer__tmdb--logo"
          />
        </div>
      </div>

      <p className="footer__bottom">© 2025 Kam Koding. All rights reserved.</p>
    </footer>
  );
};

export default Footer;